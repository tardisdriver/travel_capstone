const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tripSchema = mongoose.Schema({
    date: { type: Date },
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
        date: this.date,
        destination: this.destination,
        budget: this.budget,
        costs: this.costs
    };
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = { Trip };
