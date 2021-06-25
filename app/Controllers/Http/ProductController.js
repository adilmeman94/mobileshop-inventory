"use strict";

const Products = use("App/Models/Product");
const StoreProduct = use("App/Models/StoreProduct");
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
      discountPercentage,
      finalPrice,
      stockByStore,
      category_id,
      subCategory_id,
    } = request.all();
    try {
      const productExists = await Products.findBy("productName", productName);
      if (productExists) {
        return response.status(400).send({
          status: "error",
          message: `product was already exist, create with another name`,
        });
      }
      const product = new Products();
      product.productName = productName;
      product.productImage = productImage;
      product.brandName = brandName;
      product.productPrice = productPrice;
      product.discountPercentage = discountPercentage;
      product.finalPrice = finalPrice;
      // product.stockByStore = stockByStore;
      product.category_id = category_id;
      product.subCategory_id = subCategory_id;
      await product.save();

      // const stockByStore = request.input('stockByStore')
      for (const item of stockByStore) {
        const storeProduct = new StoreProduct();
        storeProduct.productId = String(product._id);
        storeProduct.storeId = item.storeId;
        storeProduct.stock = item.stock;
        await storeProduct.save();
      }

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
      const { category_id, subCategory_id, productName, store_id } =
        request.get();
      const page = request.get().page || 1;
      const limit = request.get().limit || 10;

      /* logic of products list when search from Product model */
      // const products = Products.query();
      // if (productName) {
      //   products.where("productName",  productName);
      // }
      // if (category_id) {
      //   products.where("category_id", category_id);
      // }
      // if (subCategory_id) {
      //   products.where("subCategory_id", subCategory_id);
      // }
      // // const products1 = await products.with("store_products", query => {query.where("IdStock.storeId", store_id)}).paginate(page, limit);
      // const products1= await products.with("categories").paginate(page, limit)
      // const productList = products1.toJSON();
      // for (const element of productList.data) {
      //   const stores1 = [];
      //   for (const item of element.stockByStore) {
      //     let store = await Store.findBy("_id", item.storeId);
      //     stores1.push({ store, stock: item.stock });
      //     element.stores1 = stores1;
      //   }
      // }

      /* logic of products list when search from Product model */
      const storeProduct = StoreProduct.query();
      if (store_id) {
        storeProduct.where("storeId", store_id);
      }
      let queryObject = {};
      if (productName) {
        queryObject.productName = productName;
      }
      if (category_id) {
        queryObject.category_id = category_id;
      }
      if (subCategory_id) {
        queryObject.subCategory_id = subCategory_id;
      }
      const storeproducts1 = await storeProduct
        .with("products", (query) => {
          query.where(queryObject);
        })
        .paginate(page, limit);
      const productList = storeproducts1.toJSON();
      return productList.data;
    } catch (error) {
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async productById({ request, response, params }) {
    const id = params.id;
    const storeProduct = await StoreProduct.findBy("_id", id);
    const product = await storeProduct.products().fetch();
    if (!product) {
      return response.status(400).send({
        status: "error",
        message: `product is not exist`,
      });
    }
    // const product1 = product.toJSON();
    // const stores = [];
    // for (const item of product1.stockByStore) {
    //   let store = await Store.findBy("_id", item.storeId);
    //   stores.push(store);
    // }
    // product.stores = stores;
    return { storeProduct, product };
  }

  async editProduct({ request, response, params }) {
    try {
      const id = params.id;
      const storeProduct = await StoreProduct.findBy("_id", id);
      const product = await storeProduct.products().fetch();
      // const product = await Products.findBy("_id", id);
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
        discountPercentage,
        finalPrice,
        stockByStore,
        category_id,
        subCategory_id,
      } = request.all();

      product.productName = productName;
      product.productImage = productImage;
      product.brandName = brandName;
      product.productPrice = productPrice;
      product.discountPercentage = discountPercentage;
      product.finalPrice = finalPrice;
      // product.stockByStore = stockByStore;
      product.category_id = category_id;
      product.subCategory_id = subCategory_id;
      await product.save();

      for (const item of stockByStore) {
        storeProduct.productId = storeProduct.productId;
        storeProduct.storeId = item.storeId;
        storeProduct.stock = item.stock;
        await storeProduct.save();
      }
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
      const storeProduct = await StoreProduct.findBy("_id", id);
      const product = await storeProduct.products().fetch();
      if (!product) {
        return response.status(400).send({
          status: "error",
          message: `product is not exist`,
        });
      }
      await product.delete();

      return response.status(201).json({
        message: `product ${product.productName} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = ProductController;
