class ValidateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      firstName: "required|alpha|max:50",
      lastName: "required|alpha|max:50",
      email: "required|email",
    };
  }
}

module.exports = ValidateUser;
