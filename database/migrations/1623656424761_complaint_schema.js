'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up () {
    this.create('complaints', (table) => {
      table.increments()
      table.string('complaintDate').notNullable()
      table.string('customerName').notNullable()
      table.string('customerMobileNo').notNullable()
      table.string('issueDeatil').notNullable()
      table.string('compalintStatus').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('complaints')
  }
}

module.exports = ComplaintSchema
