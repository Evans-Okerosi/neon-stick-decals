const mysql = require("mysql");
const colors = require('colors/safe')
module.exports = {
  addOrder: function(skinURL, deviceSpecs, userId, transactionId) {
    const sql = `INSERT INTO orders (url,device_specs,user_id,transaction_id)
        VALUES(${mysql.escape(skinURL)}, ${mysql.escape(
      deviceSpecs
    )}, ${mysql.escape(userId)}, ${mysql.escape(transactionId)}`;
  },
  setOrderCompletion: function(orderNumber, bool) {
    if (bool === true) {
      const sql = `INSERT INTO order(completion) VALUE(${mysql.escape(
        bool
      )}) WHERE order_no = ${orderNumber} `;
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(colors.blue("order status changed"));
      });
    }
  },
  getOrderDetails: function(orderNumber) {
    const sql = `SELECT order_no,url,device_specs,user_id,order_date,processed_by,transaction_id 
        FROM orders WHERE order_no=${mysql.escape(orderNumber)}`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      return result;
    });
  }
};
