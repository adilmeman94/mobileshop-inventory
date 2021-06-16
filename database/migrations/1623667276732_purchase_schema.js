'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseSchema extends Schema {
  up () {
    this.create('purchases', (table) => {
      table.increments()
      table.string('purchaseDate').notNullable()
      table.string('sellerName').notNullable()
      table.string('sellerContact').notNullable()
      table.string('purchaseDescription').notNullable()
      table.string('billAmount').notNullable()
      table.string('paidInput').notNullable()
      table.string('billImage').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('purchases')
  }
}

module.exports = PurchaseSchema
