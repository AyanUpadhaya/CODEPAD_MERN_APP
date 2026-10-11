const fs = require("node:fs");
const path = require("node:path");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

const apiDirectory = path.resolve(__dirname, "..");
const migrationsDirectory = path.join(apiDirectory, "migrations");
dotenv.config({ path: path.join(apiDirectory, ".env") });

const migrationPattern = /^\d{3,}_[a-z0-9_-]+\.sql$/;

async function main() {
  const [command, filename] = process.argv.slice(2);
  const baseline = command === "--baseline";

  if (command && !baseline) {
    throw new Error(
      "Usage: npm run migrate [-- --baseline <migration-file.sql>]"
    );
  }

  if (baseline && !filename) {
    throw new Error(
      "Provide the migration filename to record as already applied."
    );
  }

  const migrations = fs
    .readdirSync(migrationsDirectory)
    .filter((entry) => migrationPattern.test(entry))
    .sort();

  if (baseline && !migrations.includes(filename)) {
    throw new Error(`Migration file not found: ${filename}`);
  }

  const requiredEnvironment = [
    "MYSQL_HOST",
    "MYSQL_PORT",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DATABASE",
  ];
  const missingEnvironment = requiredEnvironment.filter(
    (key) => !process.env[key]
  );
  if (missingEnvironment.length) {
    throw new Error(
      `Missing database configuration: ${missingEnvironment.join(", ")}`
    );
  }

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
  });

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename VARCHAR(255) NOT NULL PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB
    `);

    if (baseline) {
      const [alreadyApplied] = await connection.execute(
        "SELECT filename FROM schema_migrations WHERE filename = ?",
        [filename]
      );
      if (alreadyApplied.length) {
        console.log(`Already recorded: ${filename}`);
        return;
      }

      await connection.execute(
        "INSERT INTO schema_migrations (filename) VALUES (?)",
        [filename]
      );
      console.log(`Recorded as already applied: ${filename}`);
      return;
    }

    const [appliedRows] = await connection.query(
      "SELECT filename FROM schema_migrations"
    );
    const applied = new Set(appliedRows.map((row) => row.filename));
    let ranCount = 0;

    for (const migration of migrations) {
      if (applied.has(migration)) {
        continue;
      }

      const sql = fs.readFileSync(
        path.join(migrationsDirectory, migration),
        "utf8"
      );
      if (!sql.trim()) {
        throw new Error(`Migration file is empty: ${migration}`);
      }

      console.log(`Applying ${migration}`);
      await connection.query(sql);
      await connection.execute(
        "INSERT INTO schema_migrations (filename) VALUES (?)",
        [migration]
      );
      ranCount += 1;
    }

    console.log(
      ranCount
        ? `Applied ${ranCount} migration(s).`
        : "Database schema is up to date."
    );
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(`Migration failed: ${error.message}`);
  process.exitCode = 1;
});
