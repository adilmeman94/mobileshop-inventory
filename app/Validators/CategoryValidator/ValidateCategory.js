"use strict";

class ValidateCategory {
  get validateAll() {
    return true;
  }

  get rules() {

    return {
      name: `required|max:30`,
      description: "max:50",
      icon: "max:30",
      parent_id: "max:30",
    };
  }


}

module.exports = ValidateCategory;
