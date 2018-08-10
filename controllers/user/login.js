const express = require('express');
//const validator = require('validator');
const passport = require('passport');
const validator = require('validator');

const router = express.Router();

router.post('/', (req, res, next) => {
  const validationResult = () => {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) return null;
    return {
      email: email.trim(),
      password: password.trim()
    };
  };
  
  if (!validationResult()) {
    return res.status(400).json({
      success: false,
      message: 'Check form for errors',
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'the form could not be processed'
      });
    }
    return res.json({
      success: true,
      message: 'you have successfully loged in.',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
