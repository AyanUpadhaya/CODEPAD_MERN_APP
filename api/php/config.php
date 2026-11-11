<?php

declare(strict_types=1);

$localConfigPath = __DIR__ . '/config.local.php';
$localConfig = is_file($localConfigPath) ? require $localConfigPath : [];
$localConfig = is_array($localConfig) ? $localConfig : [];

$config = [
    'host' => getenv('MYSQL_HOST') ?: ($localConfig['host'] ?? ''),
    'port' => getenv('MYSQL_PORT') ?: ($localConfig['port'] ?? '3306'),
    'database' => getenv('MYSQL_DATABASE') ?: ($localConfig['database'] ?? ''),
    'username' => getenv('MYSQL_USER') ?: ($localConfig['username'] ?? ''),
    'password' => getenv('MYSQL_PASSWORD') ?: ($localConfig['password'] ?? ''),
];

foreach (['host', 'database', 'username'] as $requiredKey) {
    if ($config[$requiredKey] === '') {
        throw new RuntimeException("Missing database configuration: {$requiredKey}");
    }
}

$dsn = sprintf(
    'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
    $config['host'],
    $config['port'],
    $config['database']
);

$pdo = new PDO($dsn, $config['username'], $config['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
]);

return $pdo;
