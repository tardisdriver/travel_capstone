const mongoose = require('mongoose');



const tripSchema = mongoose.Schema({
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


const Trip = mongoose.model('Trip', tripSchema);


module.exports = {Trip};