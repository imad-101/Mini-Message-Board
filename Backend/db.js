const { Pool } = require("pg");
const messagepool = new Pool({
  user: "postgres",
  password: "imad17",
  host: "localhost",
  port: 5432,
  database: "message_board",
});
const userpool = new Pool({
  user: "postgres",
  password: "imad17",
  host: "localhost",
  port: 5432,
  database: "login",
});
module.exports = { messagepool, userpool };
