const express = require('express');
//const validator = require('validator');
const passport = require('passport');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const validationResult = {
    success: true
  };
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
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
