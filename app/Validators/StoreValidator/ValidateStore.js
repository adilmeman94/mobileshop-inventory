"use strict";

class ValidateStore {

  get validateAll () {
    return true
  }

  get rules() {


    return {
      storeName : `required|string|max:50`,
      storeAddress : "required|string|max:100",
      storeManagerName : "required|string|max:30",
      storeMobile : "required|array|max:5",
      storeStatus : "required|boolean",
      storeLogo : "string|max:5mb"
    };

  }
  // get messages() {
  //   return {
  //     "storeName.unique": "store is already registered",
  //   };
  // }

}

module.exports = ValidateStore;
