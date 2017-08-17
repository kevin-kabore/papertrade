'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var StockSchema = new Schema({
  symbol: String,
  current: Number,
  open: Number,
  close: Number,
  purchase: Number,
  selling: Number
})


module.exports = mongoose.model('Stock', StockSchema)
