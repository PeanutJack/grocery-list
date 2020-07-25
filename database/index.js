const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/groceries',  {});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => {
  console.log('Connected to MongoDB');
  db.close();
});

const Users = require('./models/users.js');

module.exports = { db, Users };