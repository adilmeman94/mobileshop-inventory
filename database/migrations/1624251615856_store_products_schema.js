'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreProductsSchema extends Schema {
  up () {
    this.create('store_products', (table) => {
      table.increments()
      table.integer('storeId').unsigned().references('_id').inTable('stores')
      table.integer('productId').unsigned().references('_id').inTable('products')
      table.array('storeBystock').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('store_products')
  }
}

module.exports = StoreProductsSchema
