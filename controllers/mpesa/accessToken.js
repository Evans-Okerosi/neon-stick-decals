const axios = require('axios');

const CONSUMER_KEY = 'VpZSVrnkKeLyyNehXUU5Prdt9zEEBWan';
const COMSUMER_SECRET = 'aYOCXfQmecZoo9nd';
const auth = `Basic ${Buffer.from(
  `${CONSUMER_KEY}:${COMSUMER_SECRET}`
).toString('base64')}`;

module.exports = function getToken(callback) {
  axios
    .get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: auth
        }
      }
    )
    .then((res) => {
      console.log(res.data)
      callback(null, res.data);
    })
    .catch(err => {
      console.log('this is the error' + err)
      callback(err)
    });
};
