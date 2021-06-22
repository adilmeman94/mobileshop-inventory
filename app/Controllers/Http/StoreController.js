'use strict'

const Store = use('App/Models/Store')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  async createStore({ request, response }) {
    const { storeName, storeAddress, storeManagerName, storeMobile, storeStatus, storeLogo} = request.all();
    try {
      const storeExists = await Store.findBy("storeName", storeName);
      if (storeExists) {
        return response.status(400).send({
          status: "error",
          message: `store was already registered, create with another name`,
        });
      }

      const store = new Store()
      store.storeName = storeName;
      store.storeAddress = storeAddress;
      store.storeManagerName = storeManagerName;
      store.storeMobile = storeMobile;
      store.storeStatus = storeStatus;
      store.storeLogo = storeLogo;
      await store.save()

      // const store = await Store.create(request.all());
      return response.status(201).json({
        message: `store ${store.storeName} is Created Successfully`,
        data: store,
      });
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listStore({ request, response }) {
    try {
      const store = await Store.all()
      return store;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async storeById({ request,  response, params }) {
    try {

      const id = params.id;
      const store = await Store.findOrFail(id);
      return store;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `store is not exist`,
      });
    }
  }

  async editStore({ request,  response, params }) {
    try {

      const id = params.id;
      const store = await Store.findBy("_id", id);
      if (!store) {
        return response.status(400).send({
          status: "error",
          message: `store is not exist`,
        });
      }

      const { storeName, storeAddress, storeManagerName, storeMobile, storeStatus, storeLogo} = request.all();

      store.storeName = storeName;
      store.storeAddress = storeAddress;
      store.storeManagerName = storeManagerName;
      store.storeMobile = storeMobile;
      store.storeStatus = storeStatus;
      store.storeLogo = storeLogo;
      await store.save();
      return response.status(200).send(store);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteStore({ request, response, params }) {
    try {

      const id = params.id;
      const store = await Store.findBy("_id", id);
      await store.delete();
      return response.status(201).json({
        message: `store ${store.storeName} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `store is not exist`,
      });
    }
  }
}

module.exports = StoreController
