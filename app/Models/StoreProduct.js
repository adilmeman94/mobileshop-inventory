'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
//   stores() {
//     return this.hasOne('App/Models/Store')
//   }

  products() {
    return this.hasMany('App/Models/Product', "productId", '_id')
  }
 }

module.exports = StoreProduct
