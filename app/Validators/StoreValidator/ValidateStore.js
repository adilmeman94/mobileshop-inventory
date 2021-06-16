"use strict";

class ValidateStore {

  get validateAll () {
    return true
  }

  get rules() {
    return {
      storeName : "required|string|min:5|max:15|unique:stores,storeName",
      storeAddress : "required|string|min:3|max:100",
      storeManagerName : "required|string|min:3|max:30",
      storeMobile : "required|array",
      storeStatus : "required|boolean",
      storeLogo : "string|max:5mb"
    };

  }
  get messages() {
    return {
      "storeName.unique": "store is already registered",
    };
  }

}

module.exports = ValidateStore;
