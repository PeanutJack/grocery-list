const express = require('express');
const app = express();
const port = 3000;
const { db, Users } = require('../database/index.js');

app.use(express.static('public'));
app.use(express.json());


app.get('/users', (req, res, next) => {
  Users.find()
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next)
});

app.post('/users', (req, res, next) => {
  Users.create(req.body)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

app.listen(port, () => console.log(`Grocery List listen on port ${port}`));