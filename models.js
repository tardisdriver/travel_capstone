const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tripSchema = mongoose.Schema({
    destination: { type: String },
    budget: { type: Number },
    costs:
    {
        airfare: Number,
        lodging: Number
    }
});

tripSchema.methods.apiRepr = function () {
    return {
        id: this.id,
        destination: this.destination,
        budget: this.budget,
        costs: this.costs
    };
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };
