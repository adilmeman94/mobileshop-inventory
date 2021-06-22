"use strict";
const { validations } = use("Validator");

class ValidateSell {

  get validateAll () {
    return true
  }

  get rules() {
    return {

      sellDate : "required|string",
      customerName : "required|string|max:30",
      customerMobile : "required|number|min:10|max:12",
      productDetail : "required|array|max:20",
      // productDetail: "subset:productId, productPrice, productQty, productTotalPrice ",
      // productDetail: [
      //   validations.subset(['productId', 'productPrice', 'productQty', 'productTotalPrice' ])],
      billAmount : "required|number|max:10"


    };

  }



}

module.exports = ValidateSell;
