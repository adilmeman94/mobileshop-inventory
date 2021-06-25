"use strict";

const Sell = use("App/Models/Sell");
const Products = use("App/Models/Product");
const StoreProduct = use("App/Models/StoreProduct");
const Store = use("App/Models/Store");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with sells
 */
class SellController {
  async createSell({ request, response }) {
    try {
      const {
        sellDate,
        customerName,
        customerMobile,
        productDetail,
        billAmount,
        storeId,
      } = request.all();

      const sell = new Sell();
      sell.sellDate = sellDate;
      sell.customerName = customerName;
      sell.customerMobile = customerMobile;
      sell.productDetail = productDetail;
      sell.billAmount = billAmount;
      sell.storeId = storeId;
      await sell.save();

      /* logic for stock decrement when stock is maintained by Product model*/

      // for (const element of productDetail) {
      //   const product = await Products.findBy("_id", element.productId);
      //   const product1 = product.toJSON();
      //   for (const item of product1.stockByStore) {
      //     if (storeId === item.storeId) {
      //       item.stock = item.stock - element.productQty;
      //       await product.save();
      //     }
      //   }
      // }

      /* logic for stock decrement when stock is maintained by storeProduct model*/

       for (const element of productDetail) {
      const storeproduct = await StoreProduct.where({"productId" : element.productId, "storeId": storeId}).first();
      storeproduct.stock = storeproduct.stock - element.productQty
      await storeproduct.save();
      }

      /* logic for stock decrement when stock is maintained by storeProduct model with loop of IdStock*/

      // for (const element of productDetail) {
      //   const storeproduct = await StoreProduct.findBy("productId", element.productId)
      //   const storeproduct1 = storeproduct.toJSON();
      //   for (const item of storeproduct1.IdStock){
      //     if (storeId === item.storeId) {
      //       item.stock = item.stock - element.productQty;
      //       await storeproduct.save();
      //     }
      //   }
      // }

      return response.status(201).json({
        message: `sellRecord of  ${sell.customerName} is Created Successfully`,
        data: sell,
      });
    } catch (error) {
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listSell({ request, response }) {
    try {
      const sell = await Sell.all();
      return sell;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async sellById({ request, response, params }) {
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

  async editSell({ request, response, params }) {
    try {
      const id = params.id;
      const sell = await Sell.findBy("_id", id);
      if (!sell) {
        return response.status(400).send({
          status: "error",
          message: `sellRecord is not exist`,
        });
      }

      const {
        sellDate,
        customerName,
        customerMobile,
        productDetail,
        billAmount,
        storeId,
      } = request.all();

      sell.sellDate = sellDate;
      sell.customerName = customerName;
      sell.customerMobile = customerMobile;
      sell.productDetail = productDetail;
      sell.billAmount = billAmount;
      sell.storeId = storeId;

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
        message: `sellRecord of ${sell.customerName} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `sellRecord is not exist`,
      });
    }
  }

  async createInvoice({ request, response, params }) {
    try {
      const id = params.id;
      const sell = await Sell.findBy("_id", id);
      if (!sell) {
        return response.status(400).send({
          status: "error",
          message: `sellRecord is not exist`,
        });
      }
      const sell1 = sell.toJSON();
      // const sell2 = sell.with("products").fetch();
      const products = [];
      const stores = [];
      for (const item of sell.productDetail) {
        let product = await Products.findBy("_id", item.productId);
        products.push(product);
      }
      sell1.products = products;
      const store = await Store.findBy("_id", sell.storeId);
      stores.push(store);
      sell1.stores = stores;
      return sell1;
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = SellController;
