const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { Trip } = require('../models');
const { app, runServer, closeServer } = require('../config');

chai.use(chaiHttp);

function seedTripData() {
    console.info('seeding trip data');
    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generateTripData());
    }
    return
}

function generateTripData() {
    return {
        destination: faker.address.country,
        budget: faker.random.number,
        costs: {
            airfare: faker.random.number,
            lodging: faker.random.number
        }
    }
}

function tearDownDb() {
    console.warn('Deleting Database');
    return mongoose.connection.dropDatabase();
}

describe('Travel Buddy API', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    beforeEach(function () {
        return seedTripData();
    });
    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    })
})

//GET TEST

describe('GET endpoint', function () {
    it('should return all trips', function () {
        let tri;
        return chai.request(app)
            .get('/trips')
            .then(function (_tri) {
                tri = _tri;
                tri.should.have.status(200);
                tri.body.trips.should.have.length.of.at.least(1);
                return Trip.count();
            })
            .then(function (count) {
                tri.body.trips.should.have.length.of(count);
            });
    });
});

describe('POST endpoint', function () {
    it('should add a trip when a new one is submitted', function () {
        const newTrip = generateTripData();
        console.log(`this is the new Trip: Going to ${newTrip.destination}, with a budget of ${newTrip.budget}`);

        return chai.request(app)
            .post('/trips')
            .send(newTrip)
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
            });
    });
});


describe('PUT endpoint', function () {
    it('should update appropriate fields when edited', function () {
        const updateData = {
            destination: "Lake Titicaca",
            budget: "3300"
        };

        return Trip
            .findOne()
            .exec()
            .then(function (trip) {
                updateData.id = trip.id;
                return chai.request(app)
                    .put(`/trips/${trip.id}`)
                    .send(updateData);
            })
            .then(function (res) {
                res.should.have.status(201);
                return Trip.findById(updateData.id).exec();
            });
    });
});

describe('DELETE endpoint', function () {
    it('should remove a trip according to that trips id', function () {
        let trip;

        return Trip
            .findOne()
            .exec()
            .then(function (_trip) {
                trip = _trip;
                return chai.request(app).delete(`/trips/${trip.id}`);
            })
            .then(function (res) {
                res.should.have.status(204);
                return Trip.findById(trip.id).exec();
            });
    });
});


