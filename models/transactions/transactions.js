const mysql = require('mysql');
const pool = require('../connectionPool');

class Trasnsactions {
  static save(data) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const sql = `INSERT INTO transactions(mpesa_id,amount,phone_no,items) 
      VALUES(${data.mpesaId},${data.amount},${data.phone},${data.items})`;
      connection.query(sql, (error) => {
        connection.release();
        if (error) throw error;
      });
    });
  }
}

export default Trasnsactions;
