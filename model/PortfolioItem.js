var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioItemSchema = new Schema({
  quantity: Number,
  purchasePrice: Number

})

module.exports = mongoose.model('PotfolioItem', PortfolioItemSchema);
