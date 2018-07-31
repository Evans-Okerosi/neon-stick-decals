const express = require('express');
const validator = require('validator');
const user = require('../../models/user/user');

const router = express.Router();

router.post('/signup', (req, res) => {
  // validate the form

  const validForm = () => {
    let { email, userName, name, password, dateOfBirth, gender } = req.data;
    // remove spaces from both ends of string
    email = email.toLowerCase().trim()
    userName = userName.toLowerCase().trim();
    name = name.trim().toLowerCase().trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    gender = gender.toLowerCase().trim();

    if (!validator.isEmail(email)) return false;
    if (!validator.toDate(dateOfBirth)) return false;

    // Ensure input is alphanumeric. N/B date is not included.
    const alphanumeric = [email, userName, password, gender, name].filter(
      // return true for each element that is not alphanumeric
      text => !validator.isAlphanumeric(text)
    );
    if (alphanumeric.length !== 0) return false;

    return { email, name, password, dateOfBirth, gender };
  };

  if (!validForm) {
    return res.status(400).json({
      success: false,
      message: 'check the form for errors and try again.'
    });
  }
  const newUser = new user({validForm});
  try {
    newUser.save();
    // on success
    res.status(200).json({
        sucess:true,
        message: 'user registration successful'
    })

  } catch (error) {
    if (error.name === 'InvalidCredentialsError') {
      return res.status(409).json({
        success: false,
        message: 'email or username already taken',
        name:"EmailTaken"
      });
    }
    return res.status(500).json({
      success: false,
      message: ' could not process the form'
    });
  }

});

module.exports = router;
