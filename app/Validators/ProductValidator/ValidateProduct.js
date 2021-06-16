"use strict";

class ValidateComplaint {

  get validateAll () {
    return true
  }

  get rules() {
    return {

        productName : "required|string|min:4|max:30|unique:products,productName",
        productImage : "required|string|max:5mb",
        brandName : "required|string|min:4|max:20",
        productPrice : "required|number|min:1|max:10",
        discountPrice : "required|number|min:1|max:10",
        stockByStore : "required|array",
        category_id: "required|string|min:4|max:100",
        subCategory_id : "required|string|min:4|max:100"

    };

  }

  get messages() {
    return {
      "productName.unique": "product is already registered",
    };
  }

}

module.exports = ValidateComplaint;
