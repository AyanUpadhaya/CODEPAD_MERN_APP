-- Run once against an existing database before deploying the slug-aware API.
-- Existing rows receive a title-derived slug with their ID appended to ensure
-- existing duplicate titles cannot prevent the migration.

ALTER TABLE `publiccodeposts`
  ADD COLUMN `slug` VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NULL;

UPDATE `publiccodeposts`
SET `slug` = CONCAT(
  COALESCE(
    NULLIF(
      LEFT(
        TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(`title`), '[^a-z0-9]+', '-')),
        220
      ),
      ''
    ),
    'post'
  ),
  '-',
  `id`
);

ALTER TABLE `publiccodeposts`
  MODIFY COLUMN `slug` VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  ADD UNIQUE KEY `uq_publiccodeposts_slug` (`slug`);
