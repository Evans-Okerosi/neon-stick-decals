const bcrypt = require("bcrypt");
const pool = require("./connectionPool");
class salt {
    /**
     * Generate a new salt using bcrypt algorithim.
     */
  constructor(saltRounds = 10) {
      /**
       * N/B statement above is not an assignment.Its ES6 parameter default value.
       * if !saltRound set the default value to 10. saltRounds is the number of iterations for bcrypt.
       * More iterations make a stronger hash but more expensive
       */
    bcrypt.genSalt(saltRounds, (error, salt) => {
      pool.getConnection((error, connection) => {
        if (error) throw error;
        const sql = `INSERT INTO salts_table(salt) VALUES(${salt})`;
        connection.query(sql, (error, result) => {
          connection.release();
          if (error) throw error;
          this.salt = salt;
        });
      });
    });
  }
  get value() {
    //### Set the initial salt
    pool.getConnection((error, connection) => {
      if (error) throw error;
      const sql = "SELECT salt FROM salts_table";
      connection.query(sql, (error, result) => {
        connection.release();
        if (error) throw error;
        return (this.salt = { ...result });
      });
    });
  }
  
}
