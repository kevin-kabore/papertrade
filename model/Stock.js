'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var StockSchema = new Schema({
  quantity: {type: Number, required: false},
  date: {type: String, required: true},
  symbol: {type: String, required: true},
  open: {type: Number, required: true},
  high: {type: Number, required: true},
  low: {type: Number, required: true},
  close: {type: Number, required: true},
  volume: {type: Number, required: true}
})


module.exports = mongoose.model('Stock', StockSchema)
