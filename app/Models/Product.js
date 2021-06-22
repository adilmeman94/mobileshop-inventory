'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  categories () {
    return this.belongsTo('App/Models/Category')
  }

  stores () {
    return this.referMany('App/Models/Store', '_id', 'stockByStore[*].storeId')
  }

  // stores () {
  //   return this.referMany('App/Models/Store', '_id', stockByStore.forEach(function(storId){"_id";"storId"}))
  // }

  store_products () {
    return this.hasMany('App/Models/StoreProduct', '_id', 'stockByStore[*].storeId')
  }

}

module.exports = Product
