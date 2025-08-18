const { Pool } = require('pg');

// This configuration allows the database connection to be flexible.
// It will use the DATABASE_URL environment variable if it is available (which it is in Docker),
// otherwise, it will fall back to other PG* environment variables or local defaults.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;