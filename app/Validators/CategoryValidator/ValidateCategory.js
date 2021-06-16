"use strict";

class ValidateCategory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required|min:3|max:30|unique:categories,name",
      description: "max:50",
      icon: "max:30",
      parent_id: "max:30",
    };
  }

  get messages() {
    return {
      "name.unique": "category is already registered",
    };
  }
}

module.exports = ValidateCategory;
