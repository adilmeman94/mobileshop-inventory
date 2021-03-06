'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sell extends Model {

  products() {
    return this.hasMany('App/Models/Product')
  }
  stores(){
    return this.hasOne('App/Models/Store')
  }

}

module.exports = Sell
