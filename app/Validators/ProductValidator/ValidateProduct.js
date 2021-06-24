"use strict";

class ValidateComplaint {

  get validateAll () {
    return true
  }

  get rules() {



    return {

        productName : `required|string|max:30`,
        productImage : "required|string|max:5mb",
        brandName : "required|string|max:20",
        productPrice : "required|number|max:10",
        discountPercentage : "required|number|max:10",
        finalPrice : "required|number|max:10",
        stockByStore : "required|array",
        category_id: "required|string|max:100",
        subCategory_id : "required|string|max:100"

    };

  }



}

module.exports = ValidateComplaint;
