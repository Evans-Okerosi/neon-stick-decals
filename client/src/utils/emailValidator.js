import validator from 'validator'
function validate(email) {
    /**
     * validate email
     * stack overflow question:
     * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     */ 
  
  let isValid = validator.isEmail(email)
  if (isValid) {
    return true;
  }
  return false;
}
export default validate