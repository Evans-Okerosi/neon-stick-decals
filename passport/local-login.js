const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require("passport-local").Strategy;
const User = require("../models/user/user");
const settings = require("../config/settings");
/**
 * Return passport local strategy object.
 */

module.exports = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: false
  },
  (email, password, done) => {
    const userData = {
      // remove white spaces before and after strings
      email: email.trim(),
      password: password.trim()
    };
    /**
     * find user by email address
     */
    return User.findUser(userData.email, (err, user) => {
      const [userInfo] = user
      const parsedInfo = JSON.parse(JSON.stringify(userInfo))
      if (err) {
        return done(err);
      }

      if (!user) {
        const error = new Error("incorrect username");
        error.name = "IncorrectDredentialsError";

        return done(error);
      }

      // check if the hashed user password is equal to the one in the database
      return User.compareHash(parsedInfo.email,password, (passwordErr, isMatch) => {
        if (passwordErr) {
          return done(passwordErr);
        }

        if (!isMatch) {
          const error = new Error("incorrect password");
          error.name = "incorrectCredentialsError";

          return done(error);
        }

        const payload = {
          sub: user._id
        };

        // create token string

        const token = jwt.sign(payload, settings.secret);
        const data = {
          name: user.name
        };

        return done(null, token, data);
      });
    });
  }
);
