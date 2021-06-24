"use strict";

class ValidatePurchase {

  get validateAll () {
    return true
  }

  get rules() {
    return {
      sellerName : "required|string|max:30",
      sellerContact : "required|array|max:5",
      purchaseDescription : "required|string|max:250",
      billAmount : "required|number|max:10",
      paidAmount : "required|number|max:10",
      billImage : "required|max:5mb",
    };

  }
}

module.exports = ValidatePurchase;
