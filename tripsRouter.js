const express = require('express');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Trips} = require('./models');
const app = express();

Trips.create('Paris, France', "12345", "123", "123", "123", "123", "123", "123");
Trips.create('Brussels, Belgium', "23456", "234", "234", "234", "234","234", "234");

app.get('/trips', (req, res) => {
	res.json(Trips.get());
});


module.exports = app;