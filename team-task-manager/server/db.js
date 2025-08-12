const { Pool } = require('pg');

// Use the DATABASE_URL environment variable from docker-compose.yml
// This is the standard way to connect in a containerized environment.
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
