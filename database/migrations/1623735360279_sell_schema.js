'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellSchema extends Schema {
  up () {
    this.create('sells', (table) => {
      table.increments()
      table.string('sellDate').notNullable()
      table.string('customerName').notNullable()
      table.string('customerMobile').notNullable()
      table.object('productDetail').notNullable()
      table.string('billAmount').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sells')
  }
}

module.exports = SellSchema
