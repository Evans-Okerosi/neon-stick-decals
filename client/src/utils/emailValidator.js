function validate(email) {
    /**
     * validate email
     * stack overflow question:
     * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     */ 
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = regex.test(String(email).toLowerCase);
  if (isValid) {
    return true;
  }
  return false;
}
export default validate