
const fs = require('fs');
const crypto = require('crypto');
const constants = require('constants');


const shortcode = 601319;
module.exports = function generatePassword(token, timestamp, callback) {
  const bufferToEncrypt = Buffer.from(shortcode + token + timestamp);
  fs.readFile(
    './cert.cer',
    (err, data) => {
      const en = Buffer.from(data)
      if (err) callback(err);
      const encrypted = crypto.publicEncrypt(
        bufferToEncrypt,
        {
          key: en,
          padding: constants.RSA_PKCS1_PADDING
        }
        
      );
      return callback(null, encrypted.toString('base64'));
    }
  );
};
