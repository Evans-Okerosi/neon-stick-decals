const mysql = require('mysql');
const bcrypt = require('bcrypt');
const pool = require('../connectionPool');

class user {
  constructor(info) {
    /**
     * the constructor is used to create a new user
     */
    if (typeof info !== 'object') throw new TypeError(`is not an object `);
    if (info.password === '' || info.userName === '' || info.email === '') {
      throw new Error('password, userName and email cannot be empty!');
    }
    this.userName = info.userName;
    this.name = info.name;
    this.password = info.password;
    this.email = info.email;
    this.gender = info.gender;
    this.date = info.date;
    this.hash = null;
  }
  save() {
    //TODO: add support for id
    /**
     * save the new user to database
     * throw error if the user name, id or email is already in use
     * the operation is successful if no error is returned.
     */ // generate hash
    if (this.username) {
      this.findUserName(this.userName, (err, usr) => {
        if (err) throw err;
        if (usr) {
          const error = new Error('user exists');
          error.name = 'EmailIsTakenError';
          throw error;
        }
      });
    }
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (error, hash) => {
      if (error) throw error;
      pool.getConnection((conErr, connection) => {
        if (conErr) throw conErr;

        const sql = `INSERT INTO users(user_name,name,email,password,gender,date_of_birth)
        VALUES(${mysql.escape(this.userName)},${mysql.escape(
          this.name
        )},${mysql.escape(this.email)}, ${mysql.escape(hash)},${mysql.escape(this.gender)},${this.date})`;

        // the result parameter is ignored in the callback bellow since its value is not used.
        connection.query(sql, (err) => {
          connection.release();
          if (err) throw err;
        });
      });
    });
  }

  static compareHash(email, password, callback) {
    if (!email || email === '') {
      const error = new Error('Email cannot be empty!');
      error.name = 'InvalidCredentialsError';
      return callback(error);
    }

    if (!password || password === '') {
      const error = new Error('password cannot be empty!');
      error.name = 'InvalidCredentialsError';
      return callback(error);
    }
    /**
     * Obtain hash from database
     */
    pool.getConnection((error, connection) => {
      if (error) return callback(error);
      const sql = `SELECT password from users WHERE email = '${email}'`;
      connection.query(sql, (err, result) => {
        const parsedResult = JSON.parse(JSON.stringify(result))
        connection.release();
        if (err) return callback(err);
        // hash
        const hash = parsedResult[0].password;
        bcrypt.compare(password, hash, (hashErr, res) => {
          if (err) return callback(hashErr);

          return callback(null, res);
        });
      });
    });
  }
  static findUser(email, callback) {
    pool.getConnection((error, connection) => {
      if (error) return callback(error);
      const sql = `SELECT * FROM users WHERE email=${mysql.escape(email)} `;

      connection.query(sql, (err, userData) => {
        connection.release();
        if (err) return callback(err);

        if (user.length > 0) {
          return callback(null, userData);
        }
        return callback(null, null);
      });
    });
  }
  static findUserName(name, callback) {
    pool.getConnection((error, connection) => {
      if (error) return callback(error);
      const sql = `SELECT * FROM users WHERE user_name=${mysql.escape(name)} `;
      connection.query(sql, (err, userData) => {
        connection.release();
        if (err) return callback(err);

        if (user > 0) {
          return callback(null, userData);
        }
        return callback(null, null);
      });
    });
  }
}
module.exports = user;
