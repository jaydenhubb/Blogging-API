const handleErrors = (err) => {
  let errors = { general: "", email: "", password: "", firstName:""};

  if (err.message === "All fields must be filled") {
    errors.general = "All fields must be filled";
  }
  if (err.message === "Please enter a valid email") {
    errors.email = "Please enter a valid email";
  }
  if (err.message === "Password not strong enough, try again!") {
    errors.password =
      "minimum of 8 characters: must contain at least 1 special character, one uppercase & 1 number";
  }
  if (err.message === "This Email has already been used") {
    errors.email = "This Email has already been used";
  }
  if (err.message === "This name has already been used") {
    errors.firstName = "This name has already been used";
  }
  if (err.message === "incorrect password") {
    errors.password = "wrong password, try again";
  }
  if (err.message === "incorrect Email") {
    errors.email = "incorrect Email, try again";
  }
  return errors;
};
module.exports = handleErrors