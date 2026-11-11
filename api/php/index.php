<?php

declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

function respondJson(int $status, $data): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function readRequestBody(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $rawBody = file_get_contents('php://input');
        if ($rawBody === false || trim($rawBody) === '') {
            return [];
        }

        $body = json_decode($rawBody, true);
        if (!is_array($body)) {
            respondJson(400, ['message' => 'Invalid JSON body.']);
        }
        return $body;
    }

    return $_POST;
}

function publicPost(array $row): array
{
    unset($row['secret']);
    if (isset($row['id'])) {
        $row['id'] = (int) $row['id'];
    }
    if (isset($row['timestamp'])) {
        $row['timestamp'] = (int) $row['timestamp'];
    }
    return $row;
}

function makeSlug(string $title): string
{
    $normalized = $title;
    if (class_exists('Normalizer')) {
        $result = Normalizer::normalize($normalized, Normalizer::FORM_KD);
        if ($result !== false) {
            $normalized = $result;
        }
    }

    if (function_exists('iconv')) {
        $ascii = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $normalized);
        if ($ascii !== false) {
            $normalized = $ascii;
        }
    }

    $slug = strtolower($normalized);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    $slug = trim($slug, '-');
    $slug = substr($slug, 0, 255);
    $slug = rtrim($slug, '-');

    if ($slug === '') {
        return 'post';
    }
    if (preg_match('/^\d+$/', $slug)) {
        return 'post-' . substr($slug, 0, 250);
    }
    return $slug;
}

function findPostById(PDO $pdo, string $postId): ?array
{
    $statement = $pdo->prepare(
        'SELECT id, title, slug, about, language, code, timestamp, name, email
         FROM publiccodeposts WHERE id = ?'
    );
    $statement->execute([$postId]);
    $post = $statement->fetch();
    return $post === false ? null : publicPost($post);
}

function isDuplicateEntry(PDOException $error): bool
{
    return isset($error->errorInfo[1]) && (int) $error->errorInfo[1] === 1062;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$basePath = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/index.php'));
$basePath = rtrim($basePath, '/');
if ($basePath !== '' && ($path === $basePath || strpos($path, $basePath . '/') === 0)) {
    $path = substr($path, strlen($basePath));
}
$path = '/' . trim($path, '/');

if ($path === '/' && $method === 'GET') {
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Webserver is running';
    exit;
}

$body = in_array($method, ['POST', 'PUT', 'DELETE'], true) ? readRequestBody() : [];

try {
    $pdo = require __DIR__ . '/config.php';

    if ($path === '/posts' && $method === 'GET') {
        $statement = $pdo->query(
            'SELECT id, title, slug, about, language, code, timestamp, name, email
             FROM publiccodeposts'
        );
        respondJson(200, array_map('publicPost', $statement->fetchAll()));
    }

    if ($path === '/posts/add' && $method === 'POST') {
        $title = $body['title'] ?? null;
        if (!is_string($title) || trim($title) === '') {
            respondJson(400, ['message' => 'A title is required.']);
        }

        $secret = bin2hex(random_bytes(16));
        $statement = $pdo->prepare(
            'INSERT INTO publiccodeposts
             (title, slug, about, language, code, timestamp, name, email, secret)
             VALUES (?, ?, ?, LOWER(?), ?, ?, ?, ?, ?)'
        );
        $statement->execute([
            trim($title),
            makeSlug($title),
            $body['about'] ?? null,
            $body['language'] ?? null,
            $body['code'] ?? null,
            time(),
            $body['name'] ?? null,
            $body['email'] ?? null,
            $secret,
        ]);

        $post = $pdo->prepare('SELECT * FROM publiccodeposts WHERE id = ?');
        $post->execute([$pdo->lastInsertId()]);
        $created = $post->fetch();
        if ($created === false) {
            throw new RuntimeException('The created post could not be retrieved.');
        }
        $created['id'] = (int) $created['id'];
        $created['timestamp'] = (int) $created['timestamp'];
        respondJson(201, [
            'message' => 'Post created successfully.',
            'data' => $created,
        ]);
    }

    if (preg_match('~^/posts/slug/([^/]+)$~', $path, $matches) && $method === 'GET') {
        $statement = $pdo->prepare(
            'SELECT id, title, slug, about, language, code, timestamp, name, email
             FROM publiccodeposts WHERE slug = ?'
        );
        $statement->execute([rawurldecode($matches[1])]);
        $post = $statement->fetch();
        if ($post === false) {
            respondJson(404, ['message' => 'Post not found']);
        }
        respondJson(200, publicPost($post));
    }

    if (preg_match('~^/posts/([^/]+)$~', $path, $matches)) {
        $postId = $matches[1];

        if ($method === 'GET') {
            $post = findPostById($pdo, $postId);
            if ($post === null) {
                respondJson(404, ['message' => 'Post not found']);
            }
            respondJson(200, $post);
        }

        if ($method === 'PUT') {
            $existingPost = findPostById($pdo, $postId);
            if ($existingPost === null) {
                respondJson(404, ['message' => 'Post not found!']);
            }

            $allowedFields = ['title', 'about', 'language', 'code', 'name', 'email'];
            $updates = [];
            foreach ($allowedFields as $field) {
                if (array_key_exists($field, $body)) {
                    $updates[$field] = $body[$field];
                }
            }
            if (isset($updates['title']) && is_string($updates['title'])) {
                $updates['title'] = trim($updates['title']);
                $updates['slug'] = makeSlug($updates['title']);
            }
            if (!$updates) {
                respondJson(400, ['message' => 'Invalid secret or no changes were made.']);
            }

            $setClauses = [];
            $values = [];
            foreach ($updates as $column => $value) {
                $setClauses[] = "`{$column}` = ?";
                $values[] = $value;
            }
            $values[] = $postId;
            $values[] = $body['secret'] ?? null;

            try {
                $statement = $pdo->prepare(
                    'UPDATE publiccodeposts SET ' . implode(', ', $setClauses) .
                    ' WHERE id = ? AND secret = ?'
                );
                $statement->execute($values);
            } catch (PDOException $error) {
                if (isDuplicateEntry($error)) {
                    respondJson(409, ['message' => 'Title already exists.']);
                }
                throw $error;
            }

            if ($statement->rowCount() === 0) {
                respondJson(400, ['message' => 'Invalid secret or no changes were made.']);
            }
            respondJson(200, [
                'message' => 'Post updated successfully.',
                'data' => findPostById($pdo, $postId),
            ]);
        }

        if ($method === 'DELETE') {
            $statement = $pdo->prepare(
                'DELETE FROM publiccodeposts WHERE id = ? AND secret = ?'
            );
            $statement->execute([$postId, $body['secret'] ?? null]);
            if ($statement->rowCount() === 0) {
                respondJson(404, ['message' => 'Post not found or invalid secret.']);
            }
            respondJson(200, ['message' => 'Post deleted successfully.']);
        }
    }

    respondJson(404, ['message' => 'Not Found']);
} catch (PDOException $error) {
    if (isDuplicateEntry($error)) {
        respondJson(409, ['message' => 'Title already exists.']);
    }
    error_log($error->__toString());
    respondJson(500, ['message' => 'Internal Server Error']);
} catch (Throwable $error) {
    error_log($error->__toString());
    respondJson(500, ['message' => 'Internal Server Error']);
}
