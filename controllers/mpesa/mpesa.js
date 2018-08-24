const moment = require('moment');
const axios = require('axios');
const accessToken = require('./accessToken');
const generatePassword = require('./Password');

function mpesa(phone, callback) {
  accessToken((err, res) => {
    const timeStamp = moment().format('YYYYMMDDHHmmss');

    const resData = Object.values(res);
    const token = resData[0];
    console.log(token);
   
    if (err) throw err;
    generatePassword(token, timeStamp, (passErr, password) => {
      if(passErr) console.log(err)
      axios
        .get(
          'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              BusinessShortCode: 174379,
              Password: password,
              Timestamp: timeStamp,
              TransactionType: 'CustomerPayBillOnline',
              Amount: 1,
              PartyA: phone,
              PartyB: 174379,
              PhoneNumber: phone,
              CallBackURL: 'https://dull-crab-58.localtunnel.me/buy/response',
              AccountReference: phone,
              TransactionDesc: ' test case'
            }
          }
        )
        .then((response) => {
          console.log(response);
          callback(null, response.data);
        })
        .catch((error) => {
          console.log(error);
          return callback(error);
        });
    });
  });
}

module.exports = mpesa;
