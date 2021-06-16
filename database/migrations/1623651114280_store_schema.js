'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.string('storeName').notNullable()
      table.string('storeAddress').notNullable()
      table.string('storeManagerName').notNullable()
      table.string('storeMobile').notNullable()
      table.string('storeStatus').notNullable()
      table.string('storeLogo').nulllable()
      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
