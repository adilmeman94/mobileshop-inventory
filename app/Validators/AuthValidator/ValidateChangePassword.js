"use strict";

class ValidateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      oldPassword: "required|min:6|max:18",
      newPassword: "required|min:6|max:18",
      confirmPassword: "required|min:6|max:18",
    };
  }
}

module.exports = ValidateUser;
