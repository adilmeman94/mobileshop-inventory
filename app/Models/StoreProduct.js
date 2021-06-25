'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
  stores() {
    return this.hasMany('App/Models/Store', "storeId", '_id')
  }

  products() {
    return this.hasMany('App/Models/Product', "productId", '_id')
  }
 }

module.exports = StoreProduct
