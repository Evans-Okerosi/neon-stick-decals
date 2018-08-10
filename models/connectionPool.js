const mysql = require("mysql")
//Load environment variables


const pool = mysql.createPool({
    connectionLimit: 130,
    queueLimit: 5,
    host: process.env.HOST,
    user:'root',
    password: process.env.DBPASSWORD,
    database: process.env.DB
})

module.exports = pool