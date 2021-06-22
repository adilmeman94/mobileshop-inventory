"use strict";

const Category = use("App/Models/Category");
const Products = use("App/Models/Product");
const Sell = use("App/Models/Sell");
const Complaint = use("App/Models/Complaint");

class DashboardController {
  async categoryCount({ request, response }) {
    try {
      const { parent_id } = request.get();
      const count = await Category.query()
        .where("parent_id", parent_id)
        .count();
      return count;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async productsCount({ request, response }) {
    try {
      const count = await Products.count();
      return count;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async sellCount({ request, response }) {
    try {
      const count = await Sell.count();
      return count;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async complaintCount({ request, response }) {
    try {
      const { complaintStatus = "true"} = request.get();
      const count = []
      const object = {}
      //  if (complaintStatus){
        const count1 = await Complaint.query()
          .where("complaintStatus", complaintStatus)
          .count();
          console.log(count1)
          object.Resolved = count1
          count.push(object)
      //  }


      // if ({complaintStatus = "false"}) {
      //   const count2 = await Complaint.query()
      //     .where("complaintStatus", complaintStatus)
      //     .count();
      //     console.log(count2)
      //     object.Pending = count2
      //     count.push(object)
      // }
      return  count ;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = DashboardController;
