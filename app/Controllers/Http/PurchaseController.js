'use strict'

const Purchase = use("App/Models/Purchase");
const { validateAll } = use("Validator");


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * Resourceful controller for interacting with purchases
 */
class PurchaseController {
  async createPurchase({ request, response }) {
    try {
      // const purchase = await Purchase.create(request.all());
      const purchase = new Purchase();
      purchase.sellerName = request.input('sellerName');
      purchase.sellerContact = request.input('sellerContact');
      purchase.purchaseDescription = request.input('purchaseDescription');
      purchase.billAmount = request.input('billAmount');
      purchase.paidAmount = request.input('paidAmount');
      purchase.billImage= request.input('billImage');
      await purchase.save();
      return response.status(201).json({
        message: `purchaseRecord of  ${purchase.sellerName} is Created Successfully`,
        data: purchase,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listPurchase({ request, response }) {
    try {
      const purchase = await Purchase.all()
      return purchase;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async purchaseById({ request,  response, params }) {
    try {

      const id = params.id;
      const purchase = await Purchase.findOrFail(id);
      return purchase;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `purchaseRecord is not exist`,
      });
    }
  }

  async editPurchase({ request,  response, params }) {
    try {

      const id = params.id;
      const purchase = await Purchase.findBy("_id", id);
      if (!purchase) {
        return response.status(400).send({
          status: "error",
          message: `purchaseRecord is not exist`,
        });
      }

      const {  sellerName , sellerContact, purchaseDescription , billAmount, paidAmount, billImage} = request.all();

      purchase.sellerName = sellerName;
      purchase.sellerContact = sellerContact;
      purchase.purchaseDescription = purchaseDescription;
      purchase.billAmount = billAmount;
      purchase.paidAmount = paidAmount;
      purchase.billImage= billImage;
      await purchase.save();
      return response.status(200).send(purchase);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `purchaseRecord is not exist`,
      });
    }
  }

  async deletePurchase({ request, response, params }) {
    try {

      const id = params.id;
      const purchase = await Purchase.findBy("_id", id);
      await purchase.delete();
      return response.status(201).json({
        message: `purchaseRecord of ${purchase.sellerName} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `purchaseRecord is not exist`,
      });
    }
  }
}

module.exports = PurchaseController
