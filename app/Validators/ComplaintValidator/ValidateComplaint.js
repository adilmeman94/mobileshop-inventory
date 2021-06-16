"use strict";

class ValidateComplaint {

  get validateAll () {
    return true
  }

  get rules() {
    return {
      complaintDate : "required|string|max:15",
      customerName : "required|string|min:3|max:30",
      customerMobile : "required|number|min:10|max:12",
      issueDetail : "required|string||min:10|max:150",
      complaintStatus : "required|boolean"
    };

  }

}

module.exports = ValidateComplaint;
