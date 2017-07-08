const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {Trips} = require('./models');
const app = express();



mongoose.Promise = global.Promise;

app.get('/trips', (req, res) => {
  Trips
    .find()
    .exec()
    .then(trips => {
      res.json(
        {
          trips: trips.map(trip => trip.apiRepr())
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

//Trips.create('Paris, France', "12345", "123", "123", "123", "123", "123", "123");
//Trips.create('Brussels, Belgium', "23456", "234", "234", "234", "234","234", "234");

//app.get('/trips', (req, res) => {
//	res.json(Trips.get());
//});


module.exports = app;