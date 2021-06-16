"use strict";

const Products = use("App/Models/Product");
const { validateAll } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  async createProducts({ request, response }) {
    try {
      const product = new Products();
      product.productName = request.input("productName");
      product.productImage = request.input("productImage");
      product.brandName = request.input("brandName");
      product.productPrice = request.input("productPrice");
      product.discountPrice = request.input("discountPrice");
      product.stockByStore = request.input("stockByStore");
      product.category_id = request.input("category_id");
      product.subCategory_id = request.input("subCategory_id");
      await product.save();
      // const product = await Products.create(request.all());
      return response.status(201).json({
        message: `product ${product.productName} is Created Successfully`,
        data: product,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listProducts({ request, response }) {
    try {
      const products = await Products.with("categories").with("stores").fetch();
      return products;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async productById({ request, response, params }) {
    try {
      const id = params.id;
      const product = await Products.findOrFail(id);
      return product;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `product is not exist`,
      });
    }
  }

  async editProduct({ request, response, params }) {
    try {
      const id = params.id;
      const product = await Products.findBy("_id", id);
      if (!product) {
        return response.status(400).send({
          status: "error",
          message: `product is not exist`,
        });
      }

      const {
        productName,
        productImage,
        brandName,
        productPrice,
        discountPrice,
        stockByStore,
        category_id,
        subCategory_id,
      } = request.all();

      product.productName = productName;
      product.productImage = productImage;
      product.brandName = brandName;
      product.productPrice = productPrice;
      product.discountPrice = discountPrice;
      product.stockByStore = stockByStore;
      product.category_id = category_id;
      product.subCategory_id = subCategory_id;

      await product.save();
      return response.status(200).send(product);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `product is not exist`,
      });
    }
  }

  async deleteProduct({ request, response, params }) {
    try {
      const id = params.id;
      const product = await Products.findBy("_id", id);
      await product.delete();
      return response.status(201).json({
        message: `product ${product.productName} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `product is not exist`,
      });
    }
  }
}

module.exports = ProductController;
