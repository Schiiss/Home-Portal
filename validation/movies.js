const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMoviesInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.genre = !isEmpty(data.genre) ? data.genre : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Movie title field is required";
  }

  if (validator.isEmpty(data.genre)) {
    errors.genre = "Movie genre field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
