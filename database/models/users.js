const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  list: [{ name: String, price: Number, size: Number, measurement: String}]
}));