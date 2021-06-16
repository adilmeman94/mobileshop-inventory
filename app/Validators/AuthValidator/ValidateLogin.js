class ValidateUser {


  get validateAll () {
    return true
  }

  get rules() {
    return {

      email: "required|email",
      password: "required|min:6|max:18",
    };

  }

}

module.exports = ValidateUser;
