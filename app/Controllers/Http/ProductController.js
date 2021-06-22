"use strict";

const Products = use("App/Models/Product");
const Store = use("App/Models/Store");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  async createProducts({ request, response }) {
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
    try {
      const productExists = await Products.findBy("productName", productName);
      if (productExists) {
        return response.status(400).send({
          status: "error",
          message: `product was already registered, create with another name`,
        });
      }
      const product = new Products();
      product.productName = productName;
      product.productImage = productImage;
      product.brandName = brandName;
      product.productPrice = productPrice;
      product.discountPrice = discountPrice;
      product.stockByStore = stockByStore;
      product.category_id = category_id;
      product.subCategory_id = subCategory_id;
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
      // const filters = request.query;
      // const filteredProducts = Products.filter()
      // const categories = await Category.query().where("parent_id", parent_id).fetch();


       const { category_id, subCategory_id, productName ,store_id}= request.get();

        const products = Products.query()
        if (productName) {
          products.where('productName', productName)
        }
        if (category_id) {
          products.where('category_id', category_id)
        }
        if (subCategory_id) {
          products.where('subCategory_id', subCategory_id)
        }
        if (store_id) {
          products.where();
         }

        //  const products1 = await products.with('categories').with('stores').with("store_products").fetch()

      const products1= await products.with("categories").with("store_products", query=>{
        query.where({store_id: 'stockByStore[*].storeId'})
      }).fetch();
      const productList = products1.toJSON();

      for (const element of productList) {
        const stores1 = []
        for (const item of element.stockByStore) {
          let store = await Store.findBy("_id", item.storeId);
           stores1.push({store, stock: item.stock});
           element.stores1 = stores1
        }
      }
      return productList;
    } catch (error) {
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async productById({ request, response, params }) {
    const id = params.id;
    const product = await Products.findBy("_id", id);
    if (!product) {
      return response.status(400).send({
        status: "error",
        message: `product is not exist`,
      });
    }
    const product1 = product.toJSON();
    const stores = [];
    for (const item of product1.stockByStore) {
      let store = await Store.findBy("_id", item.storeId);
      stores.push(store);
    }
    product.stores = stores;
    return product;
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
