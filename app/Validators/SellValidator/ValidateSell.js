"use strict";

class ValidateSell {

  get validateAll () {
    return true
  }

  get rules() {
    return {
      customerName : "required|string|max:30",
      customerMobile : "required|number|min:10|max:12",
      productDetail : "required|array|max:20",
      billAmount : "required|number|max:10",
      storeId : "required|string|max:100"
    };
  }
}

module.exports = ValidateSell;
