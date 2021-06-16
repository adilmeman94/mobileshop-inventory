'use strict'

const Sell = use("App/Models/Sell");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * Resourceful controller for interacting with sells
 */
class SellController {
  async createSell({ request, response }) {
    try {
    const {  sellDate, customerName, customerMobile, productDetail, billAmount} = request.all();

    let sell = new Sell();
    sell.sellDate = sellDate;
    sell.customerName = customerName;
    sell.customerMobile = customerMobile;
    sell.productDetail = productDetail;
    sell.billAmount = billAmount;

    // if(!typeof productDetail === "array" && productdetail == null) {
    //   return response.status(201).json({
    //     message: `productDetail must be as object and not null`,
    //   });
    // }

    if (!sell.productDetail.productId && sell.productDetail.productQuantity && sell.productDetail.productprice) {
      return response.status(201).json({
        message: `productId, productQuantity and productDetail not be null`,
      });
    }


      // const sell = await Sell.create(request.all());
      return response.status(201).json({
        message: `sellRecord of  ${sell.customerName} is Created Successfully`,
        data: sell,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listSell({ request, response }) {
    try {
      const sell = await Sell.all()
      return sell;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async sellById({ request,  response, params }) {
    try {

      const id = params.id;
      const sell = await Sell.findOrFail(id);
      return sell;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `sellRecord is not exist`,
      });
    }
  }

  async editSell({ request,  response, params }) {
    try {

      const id = params.id;
      const sell = await Sell.findBy("_id", id);
      if (!sell) {
        return response.status(400).send({
          status: "error",
          message: `sellRecord is not exist`,
        });
      }

      const {  sellDate, customerName, customerMobile, productDetail, billAmount} = request.all();

      sell.sellDate = sellDate;
      sell.customerName = customerName;
      sell.customerMobile = customerMobile;
      sell.productDetail = productDetail;
      sell.billAmount = billAmount;


      await sell.save();
      return response.status(200).send(sell);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `sellRecord is not exist`,
      });
    }
  }

  async deleteSell({ request, response, params }) {
    try {

      const id = params.id;
      const sell = await Sell.findBy("_id", id);
      await sell.delete();
      return response.status(201).json({
        message: `sellRecord of ${sell.Name} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `sellRecord is not exist`,
      });
    }
  }
}

module.exports = SellController
