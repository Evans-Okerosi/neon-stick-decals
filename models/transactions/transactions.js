const mysql = require("mysql");
const colors = require('colors/safe')

module.exports = {
  addTransaction: function(userId, amount, mpesaTransactionId) {
    const sql = `INSERT INTO transactions(user_id,amount,mpesa_transaction_id)
        VALUES(${mysql.escape(userId)},${mysql.escape(amount)},${mysql.escape(
      mpesaTransactionId
    )} `;

    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("transaction added successfully");
    });
  }
};
