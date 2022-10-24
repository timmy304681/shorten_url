require('dotenv').config()
const mysql = require('mysql2/promise')
const {
  DB_HOST_WRITE,
  DB_USERNAME_WRITE,
  DB_PASSWORD_WRITE,
  DB_DATABASE_WRITE,
  DB_HOST_READ1,
  DB_USERNAME_READ1,
  DB_PASSWORD_READ1,
  DB_DATABASE_READ1,
  DB_HOST_READ2,
  DB_USERNAME_READ2,
  DB_PASSWORD_READ2,
  DB_DATABASE_READ2,
  DB_HOST_READ3,
  DB_USERNAME_READ3,
  DB_PASSWORD_READ3,
  DB_DATABASE_READ3,
} = process.env

// create write connection
const dbWrite = mysql.createPool({
  host: DB_HOST_WRITE,
  user: DB_USERNAME_WRITE,
  password: DB_PASSWORD_WRITE,
  database: DB_DATABASE_WRITE
})

// create read connection
const dbRead1 = mysql.createPool({
  host: DB_HOST_READ1,
  user: DB_USERNAME_READ1,
  password: DB_PASSWORD_READ1,
  database: DB_DATABASE_READ1
})

const dbRead2 = mysql.createPool({
  host: DB_HOST_READ2,
  user: DB_USERNAME_READ2,
  password: DB_PASSWORD_READ2,
  database: DB_DATABASE_READ2
})

const dbRead3 = mysql.createPool({
  host: DB_HOST_READ3,
  user: DB_USERNAME_READ3,
  password: DB_PASSWORD_READ3,
  database: DB_DATABASE_READ3
})

module.exports = { mysql, dbWrite, dbRead1, dbRead2, dbRead3}
