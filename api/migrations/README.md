# Database migrations

The API reads `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and
`MYSQL_DATABASE` from `api/.env`. The migration runner uses the existing
`mysql2` dependency and records successfully applied filenames in the
`schema_migrations` table.

## First-time setup for an existing database

The slug migration (`001_add_post_slug.sql`) was applied to the current Aiven
database before migration tracking existed. Record that fact once so the runner
does not apply it a second time:

```powershell
cd api
npm run migrate -- --baseline 001_add_post_slug.sql
```

`--baseline` only records a migration; it does not execute the SQL. Only use it
when you have independently verified that migration is already applied.

## Applying future migrations

1. Back up the database and test the change against a staging database first.
2. Add a new, numbered SQL file, for example
   `api/migrations/002_add_post_search_index.sql`.
3. Do not edit a migration after it has been applied to any shared database.
   Add a new migration to correct or change the schema instead.
4. Review the SQL, then run the pending migrations from the API directory:

   ```powershell
   cd api
   npm run migrate
   ```

5. Check the command output and verify the resulting schema/application behavior.
   The runner skips filenames already recorded in `schema_migrations`.

MySQL schema changes can implicitly commit, so a failed migration may have
partially changed the schema without being recorded as complete. Inspect the
database and resolve the partial change before rerunning; do not just rerun an
`ALTER TABLE` blindly.
