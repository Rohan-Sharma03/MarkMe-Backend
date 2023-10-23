// dbService.js
// PostgreSQL database connection and query execution logic
// Example using 'pg' package
const { Pool } = require("pg");

const pool = new Pool({
  // user: process.env.PG_USER,
  // host: process.env.PG_HOST,
  // database: process.env.PG_DATABASE,
  // password: process.env.PG_PASSWORD,
  // port: process.env.PG_PORT,

  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1234",
  port: 5432,
});
// console.log(process.env.PG_PORT);
const dbService = {
  async query(query, values) {
    const client = await pool.connect();
    // console.log(client);
    try {
      const result = await client.query(query, values);
      console.log("result", result);
      return result.rows;
    } finally {
      client.release();
    }
  },
};

module.exports = dbService;
