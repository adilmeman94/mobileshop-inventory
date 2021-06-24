'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('productName').notNullable()
      table.string('productImage').nullable()
      table.string('brandName').notNullable()
      table.string('productPrice').notNullable()
      table.string('discountPrice').notNullable()
      table.string('finalPrice').notNullable()
      table.json('stockByStore').notNullable()
      table.string('category_id').unsigned().references('_id').inTable('categories')
      table.string('stockByStore[*].storeId').unsigned().references('_id').inTable('stores')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
