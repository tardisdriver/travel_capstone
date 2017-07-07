const uuid = require('uuid');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const Trips = {
  create: function(destination, budget, lodgingCost, airfareCost, foodCost, carRentalCost, entertainmentCost, miscCost ) {
    const trip = {
      id: uuid.v4(),
      destination: destination,
      budget: budget,
      lodgingCost: lodgingCost,
      airfareCost: airfareCost,
      foodCost: foodCost,
      carRentalCost: carRentalCost,
      entertainmentCost: entertainmentCost,
      miscCost:  miscCost
    };
    this.trips.push(trip);
    return trip;
  },
  get: function(id=null) {
  	if (id !== null) {
      return this.trips.find(post => trip.id === id);
    }
    return this.trips.sort();
  } 
 };

function createTripsModel() {
  const storage = Object.create(Trips);
  storage.trips = [];
  return storage;
}


module.exports = {Trips: createTripsModel()};