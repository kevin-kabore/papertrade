var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioItemSchema = new Schema({
  quantity: Number,
  purchasePrice: Number,
  sellingPrice: Number,


})

module.exports = mongoose.model('PotfolioItem', PortfolioItemSchema);
