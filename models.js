const mongoose = require('mongoose');
const uuid = require('uuid');

/*function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}*/

const tripSchema = mongoose.Schema({
	  //id: uuid.v4(),
      destination: {type: String},
      budget: {type: String},
      lodgingCost: {type: String},
      airfareCost: {type: String},
      foodCost: {type: String},
      carRentalCost: {type: String},
      entertainmentCost: {type: String},
      miscCost:  {type: String}
});

tripSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		destination: this.destination,
		budget: this.budget,
		lodgingCost: this.lodgingCost,
		airfareCost: this.airfareCost,
		foodCost: this.foodCost,
		carRentalCost: this.carRentalCost,
		entertainmentCost: this.entertainmentCost,
		miscCost: this.miscCost
	};
}


const Trips = mongoose.model('Trips', tripSchema);
/*const Trips = {
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
}*/


module.exports = {Trips};