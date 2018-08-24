const express = require('express');
const mpesa = require('../mpesa/mpesa');


const Router = express.Router();
Router.post('/', (req, res) => {
  const phone = 254720277856;
  mpesa(phone, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'sorry we could not complete'
      });
    }
    console.log(result);
  });
});

Router.post('/response', (req) => {
  console.log(req.body);
});

module.exports = Router;
