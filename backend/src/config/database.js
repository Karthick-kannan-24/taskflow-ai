const { Pool } = require("pg");

const env = require("./env");

const pool = new Pool({
  connectionString: env.DATABASE_URL,

  max: 20,

  idleTimeoutMillis: 30_000,

  connectionTimeoutMillis: 5_000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error", error);
});

const query = (text, params) => {
  return pool.query(text, params);
};

const closeDatabase = async () => {
  await pool.end();
};

module.exports = {
  pool,
  query,
  closeDatabase,
};
