const mysql = require("mysql")
//Load environment variables
require("dotenv").load()

var pool = mysql.createPool({
    connectionLimit: 130,
    queueLimit: 5,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DBPASSWORD,
    database: process.env.DB
})

module.exports = pool