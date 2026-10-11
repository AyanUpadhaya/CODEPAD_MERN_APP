-- Import this file into the MySQL database configured in MYSQL_DATABASE.
-- The API currently uses only the publiccodeposts table.

CREATE TABLE IF NOT EXISTS `publiccodeposts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `about` TEXT NOT NULL,
  `language` VARCHAR(100) NOT NULL,
  `code` LONGTEXT NOT NULL,
  `timestamp` BIGINT UNSIGNED NOT NULL COMMENT 'Unix timestamp in seconds',
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `secret` CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_publiccodeposts_slug` (`slug`),
  KEY `idx_publiccodeposts_email` (`email`(191))
) ENGINE=InnoDB
  DEFAULT CHARACTER SET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
