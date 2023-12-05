// dbService.js : PostgreSQL database connection and query execution logic
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "markme",
  password: "1234",
  port: 5432,
});
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
