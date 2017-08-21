'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var StockSchema = new Schema({
  quantity: {type: Number, required: true},
  date: {type: String, required: true},
  symbol: {type: String, required: true},
  open: {type: Number, required: true},
  purchasePrice: {type: Number},
  profit: {type: Number}
})


module.exports = mongoose.model('Stock', StockSchema)
