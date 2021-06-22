'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {

  products () {
    return this.belongsToMany('App/Models/Product').pivotTable('store_products')
  }
}

module.exports = Store
