const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Book title field is required";
  }

  if (validator.isEmpty(data.author)) {
    errors.author = "Book author field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
