const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tripSchema = mongoose.Schema({
  date: { type: String },
  destination: { type: String },
  budget: { type: Number },
  costs:
    [
      {
        name: String,
        value: Number,
      },
    ],
});

const itinerarySchema = mongoose.Schema({
  username: { type: String },
  trips: [tripSchema]
});

const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

module.exports = { Trip, Itinerary };

