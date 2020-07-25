const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { db, Users } = require('../database/index.js');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CREATE routes

app.post('/users', (req, res, next) => {
  Users.create(req.body)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

// READ routes

app.get('/users', (req, res, next) => {
  Users.find()
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

app.get('/users/:_id', (req, res, next) => {
  Users.find(req.params)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

// UPDATE routes

app.put('/users/:_id', (req, res, next) => {
  Users.updateOne(req.params, req.body)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

// DELETE routes

app.delete('/users/:_id', (req, res, next) => {
  Users.deleteOne(req.params)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch(next);
});

app.listen(port, () => console.log(`Grocery List listen on port ${port}`));