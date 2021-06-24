function validateEmail(email) {
  var regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(email);
}

export default validateEmail;