const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.interests = !isEmpty(data.interests) ? data.interests : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (validator.isEmpty(data.interests)) {
    errors.interests = "Interests is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
