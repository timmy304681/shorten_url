require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');
// password in app.js
const options = {
  host: process.env.DB_HOST_WRITE,
  user: process.env.DB_USERNAME_WRITE,
  port: process.env.DATABASE_PORT,
  password: process.env.DB_PASSWORD_WRITE,
  database: process.env.DB_DATABASE_WRITE,
};

const db = mysql.createPool(options);

// create a new promise to use async/ await function
const pool = db.promise();

module.exports = pool;
