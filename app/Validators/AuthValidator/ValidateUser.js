"use strict";

class ValidateUser {


  get validateAll () {
    return true
  }

  get rules() {
    return {
      firstName: "required|alpha|max:50",
      lastName: "required|alpha|max:50",
      email: "required|email|unique:users,email",
      password: "required|min:6|max:18",
    };

  }

}

module.exports = ValidateUser;
