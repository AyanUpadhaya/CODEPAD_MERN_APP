# PHP API for cPanel

This directory is a dependency-free PHP/PDO replica of the Express posts API.
It supports the same routes:

- `GET /` — health response
- `GET /posts`
- `POST /posts/add`
- `GET /posts/slug/{slug}`
- `GET /posts/{postId}`
- `PUT /posts/{postId}`
- `DELETE /posts/{postId}`

The API uses the existing `publiccodeposts` table and does not use the
`articles` table. It returns JSON for API responses, allows cross-origin
requests, and supports the JSON `DELETE` body used by the frontend.

## Database setup

The database must already contain the `publiccodeposts` table, including its
unique `slug` column. If needed, import `../schema.sql` in cPanel's
phpMyAdmin. If the table already exists but has no `slug` column, back up the
database and apply `../migrations/001_add_post_slug.sql` once.

## cPanel deployment

1. Upload the contents of this directory into the API directory under your
   cPanel document root (for example, `public_html/api/`). Keep `.htaccess`
   enabled so routes are forwarded to `index.php`.
2. Provide `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USER`, and
   `MYSQL_PASSWORD` as PHP environment variables if your hosting setup allows
   it. Environment variables take precedence over the local file.
3. Otherwise, copy `config.local.php.example` to `config.local.php` on the
   server and enter the MySQL connection details there. Do not upload or commit
   the example as a live config, and keep `config.local.php` private. It is
   excluded from Git.
4. Point the frontend's `VITE_BASE_URL` to the URL where this PHP API is
   deployed, then test `GET /` and the post endpoints.

The PHP installation needs the PDO MySQL extension and Apache `mod_rewrite`
for clean routes. If `mod_rewrite` is unavailable, the host must enable it or
the API URLs will need to include `index.php`.
