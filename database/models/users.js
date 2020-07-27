const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  name: String,
  krogerLocation: String,
  list: [{
    name: String,
    price: Number,
    size: Number,
    measurement: String,
    productId: String
  }]
}));