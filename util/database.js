const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "schooldb",
  password: ""
});

module.exports = pool.promise();
