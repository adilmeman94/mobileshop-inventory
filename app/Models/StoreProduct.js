'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreProduct extends Model {
  stores() {
    return this.hasOne('App/Models/Store')
  }

  products() {
    return this.hasOne('App/Models/Product')
  }
}

module.exports = StoreProduct
