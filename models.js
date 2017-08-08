const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    destination: { type: String },
    budget: { type: Number },
    costs: {
        airfare: Number,
        lodging: Number
    },
});

tripSchema.methods.apiRepr = function () {
    return {
        destination: this.destination,
        budget: this.budget,
        costs: {
            airfare: this.airfare,
            lodging: this.lodging
        }
    };
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };
