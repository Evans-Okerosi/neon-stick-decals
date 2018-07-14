"use strict";

const mysql = require("mysql");
const colors = require("colors/safe");
const pool = require("../connectionPool");
const bcrypt = require("bcrypt");

class user {
  constructor(info) {
    /**
     * the constructor is used to create a new user
     */
    if ("object" !== typeof info) throw new TypeError(`is not an object `);
    if (info.password === "" || info.userName === "" || info.email === "") {
      throw new Error("password, userName and email cannot be empty!");
    }
    this.userName = info.userName;
    this.firstName = info.firstName;
    this.lastName = info.lastName;
    this.password = info.password;
    this.email = info.email;
    this.phoneNumber = info.phoneNumber;
    this.gender = info.gender
    this.dateOfBirth = info.dateOfBirth
  }
  save() {
    //TODO: add support for id
    /**
     * save the new user to database
     * throw error if the user name, id or email is already in use
     * the operation is successful if no error is returned.
     */
    if(this.username){
      if (this.findUserName(this.userName)) {
        let error = Error("User Name already exists!")
        error.name = "InvalidCredentialsError"
        throw error
      }
    }
    if (this.finduser(this.email)) {
      let error = new Error("Email already exists!");
      error.name="InvalidCredentialsError"
      throw error
    }
    pool.getConnection((error, connection) => {
      if (error) throw error;

      const sql = `INSERT INTO users(user_name,firstname,lastname,email,password,phone)
      VALUES(${mysql.escape(this.userName)},${mysql.escape(
        this.firstName
      )},${mysql.escape(this.lastName)},${mysql.escape(
        this.email
        //obtain generated hash
      )}, ${mysql.escape(this.generateHash((error,hash)=>{
        if(error) throw error

        return hash
      }))}
       ${mysql.escape(this.phone)})`;

      connection.query(sql, (err, result) => {
        connection.release();
        if (err) throw err;
      });
    });
  }
  findUserName(name, callback) {
    pool.getConnection((error, connection) => {
      if (error) return callback(error)
      const sql = `SELECT * FROM users WHERE user_name=${mysql.escape(
        name
      )} `;
      connection.query(sql, (error, user) => {
        connection.release();
        if (error) return callback(error)

        if (result > 0) {
          return callback(null, user)
        } else {
          return callbacck(null, null)
        }
      });
    });
  }
  findUser(email, callback) {
    pool.getConnection((error, connection) => {
      if (error) return callback(error);
      const sql = `SELECT * FROM users WHERE email=${mysql.escape(email)} `;

      connection.query(sql, (error, user) => {
        connection.release();
        if (error) return callback(error);

        if (result > 0) {
          return callback(null, user);
        } else {
          return callback(null, null);
        }
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
    bcrypt.hash(this.password, salt, saltRounds, (error, hash) => {
      if (error) return callback(error);

      return callback(null, hash);
    });
  }
  compareHash(email, password, callback) {
    if (!email || email === "") {
      let error = new Error("Email cannot be empty!");
      error.name = "InvalidCredentialsError";
      return callback(error)
    }

    if (!password || password === "") {
      let error = new Error("password cannot be empty!");
      error.name = "InvalidCredentialsError";
      return callback(error) 
    }
    /**
     * Obtain hash from database
     */
    pool.getConnection((error, connection) => {
      if (error) return callback(error);
      let sql = `SELECT * from users WHERE email = ${email}`;
      connection.query(sql, (error, result) => {
        connection.release();
        if (error) return callback(error);
        //hash
        let hash = result.password;
        bcrypt.compare(password, hash, (err, res) => {
          if (err) return callback(err);

          return callback(null, res);
        });
      });
    });
  }
}
module.exports = { user };
