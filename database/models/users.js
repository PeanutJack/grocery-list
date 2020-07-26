const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  name: String,
  krogerLocation: Number,
  list: [{ name: String, price: Number, size: Number, measurement: String}]
}));