"use strict";

const Category = use("App/Models/Category");
const Products = use("App/Models/Product");
const Sell = use("App/Models/Sell");
const Complaint = use("App/Models/Complaint");
const Purchase = use("App/Models/Purchase");
const moment = require("moment");

class DashboardController {
  // async categoryCount({ request, response }) {
  //   try {
  //     const noOfDay = request.get().noOfDay || 30;
  //     const { parent_id } = request.get();
  //     const count = await Category.query()
  //       .where("parent_id", parent_id)
  //       .count();
  //     return count;

  //   } catch (error) {
  //     console.log(error.message);
  //     response.status(403).json({
  //       status: "error",
  //       message: error.message,
  //     });
  //   }
  // }

  async productsCount({ request, response }) {
    try {
      // const productDetail = [];
      const object = {};
      const count = await Products.count();
      object.count = count;
      const products = await Products.all();
      const totalProducts = products.toJSON();
      const totalProductAmount = totalProducts.reduce(
        (sum, value) => sum + value.finalPrice,
        0
      );
      object.totalProductAmount = totalProductAmount;
      // productDetail.push(object)
      return object;
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
      const noOfDay = request.get().noOfDay || 30;
      // const sellDetail = [];
      const object = {};

      const count = await Sell.where({
        created_at: {
          $gte: moment().subtract(noOfDay, "days").format("YYYY-MM-DD"),
        },
      }).count();
      object.count = count;
      const sell = await Sell.where({
        created_at: {
          $gte: moment().subtract(noOfDay, "days").format("YYYY-MM-DD"),
        },
      }).fetch();
      const totalSell = sell.toJSON();
      const totalSellAmount = totalSell.reduce(
        (sum, value) => sum + value.billAmount,
        0
      );
      object.totalSellAmount = totalSellAmount;
      // sellDetail.push(object);
      return object;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async purchaseCount({ request, response }) {
    try {
      const noOfDay = request.get().noOfDay || 30;
      // const purchaseDetail = [];
      const object = {};

      const count = await Purchase.where({
        created_at: {
          $gte: moment().subtract(noOfDay, "days").format("YYYY-MM-DD"),
        },
      }).count();
      object.count = count;
      const purchase = await Purchase.where({
        created_at: {
          $gte: moment().subtract(noOfDay, "days").format("YYYY-MM-DD"),
        },
      }).fetch();
      const totalPurchase = purchase.toJSON();
      const totalPurchaseAmount = totalPurchase.reduce(
        (sum, value) => sum + value.billAmount,
        0
      );
      const totalPaidAmount = totalPurchase.reduce(
        (sum, value) => sum + value.paidAmount,
        0
      );

      object.totalPurchaseAmount = totalPurchaseAmount;
      object.totalPaidAmount = totalPaidAmount;
      // purchaseDetail.push(object);
      return object;
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
      const noOfDay = request.get().noOfDay || 30;
      // const count = [];
      const object = {};

      const count1 = await Complaint.query()
        .where("complaintStatus", "true")
        .where({
          created_at: {
            $gte: moment().subtract(noOfDay, "days").format("YYYY-MM-DD"),
          },
        })
        .count();
      object.Resolved = count1;

      const count2 = await Complaint.query()
        .where("complaintStatus", "false")
        .count();
      object.Pending = count2;
      // count.push(object);
      return object;
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
