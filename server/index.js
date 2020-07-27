const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { db, Users } = require('../database/index.js');
const config = require('../config.js');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get/Refresh Kroger tokens (auto-refresh TODO)

var krogerLocationToken;
var krogerProductToken;

axios.post('https://api.kroger.com/v1/connect/oauth2/token', 'grant_type=client_credentials', {
  headers: config.KROGER
})
  .then((results) => {
    console.log('Successfully got location token');
    krogerLocationToken = results.data.access_token;
  })
  .catch((err) => {
    console.log('Error getting location token');
  });

axios.post('https://api.kroger.com/v1/connect/oauth2/token', 'grant_type=client_credentials&scope=product.compact', {
  headers: config.KROGER
})
  .then((results) => {
    krogerProductToken = results.data.access_token;
    console.log('Successfully got product token');
  })
  .catch((err) => {
    console.log('Error getting product token');
  });

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

app.get('/kroger/location/:zip/:range', (req, res, next) => {
  console.log('zip lookup recieved at: ', req.params.zip);
  axios.get(`https://api.kroger.com/v1/locations/?filter.zipCode.near=${req.params.zip}&filter.limit=100&filter.radiusInMiles=${req.params.range}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${krogerLocationToken}`
    }
  })
    .then(({ data }) => {
      res.end(JSON.stringify(data));
    })
    .catch(next);
});

app.get('/kroger/product/:locationId/:item', (req, res, next) => {
  var { item, locationId } = req.params;
  console.log(`'product lookup recieved for: ${item} at ${locationId}`);
  axios.get(`https://api.kroger.com/v1/products/?filter.term=${item}&filter.locationId=${locationId}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${krogerProductToken}`
    }
  })
    .then(({ data }) => {
      res.end(JSON.stringify(data));
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