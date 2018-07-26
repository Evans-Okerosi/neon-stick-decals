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
    this.dateOfBirth = info.dateOfBirth;
  }
  save() {
    //TODO: add support for id
    /**
     * save the new user to database
     * throw error if the user name, id or email is already in use
     * the operation is successful if no error is returned.
     */
    if (this.username) {
      if (this.findUserName(this.userName)) {
        const error = Error('User Name already exists!');
        error.name = 'TakenUserNameError';
        throw error;
      }
    }
    if (this.finduser(this.email)) {
      const error = new Error('Email already exists!');
      error.name = 'TakenEmailError';
      throw error;
    }
    pool.getConnection((error, connection) => {
      if (error) throw error;

      const sql = `INSERT INTO users(user_name,name,email,password)
      VALUES(${mysql.escape(this.userName)},${mysql.escape(
        this.name
      )},${mysql.escape(this.email)}, ${mysql.escape(
        this.generateHash(10,(err, hash) => {
          if (err) throw err;
          return hash;
        })
      )}`;

      // the result parameter is ignored in the callback bellow since its value is not used.
      connection.query(sql, (err) => {
        connection.release();
        if (err) throw err;
      });
    });
  }

  generateHash(saltRounds = 10, callback) {
    //TODO: something
    /**
     * generate hash from password and salt
     * if u call this method without instatianting user it will generate an error.
     * the hashing function is only availabe when crating new users
     */
    bcrypt.hash(this.password, saltRounds, (error, hash) => {
      if (error) return callback(error);

      return callback(null, hash);
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
      const sql = `SELECT * from users WHERE email = ${email}`;
      connection.query(sql, (err, result) => {
        connection.release();
        if (err) return callback(err);
        //hash
        const hash = result.password;
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

        if (user > 0) {
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
module.exports = { user };
