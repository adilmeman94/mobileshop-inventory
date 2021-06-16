"use strict";

class ValidateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email",
    };
  }
}

module.exports = ValidateUser;
