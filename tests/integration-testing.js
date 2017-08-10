const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { Trip } = require('../models');
const { TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);

function seedTripData() {
    console.info('seeding trip data');
    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generateTripData());
    }
    return Trip.insertMany(seedData);
}

function generateTripData() {
    return {
        destination: faker.address.country(),
        budget: faker.random.number(),
        costs:
        {
            airfare: faker.random.number(),
            lodging: faker.random.number()
        }

    }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Travel Buddy API', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
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

    describe('GET endpoint', function () {

        it('should return all existing trips', function () {

            let tri;
            return chai.request(app)
                .get('/trips')
                .then(function (_tri) {
                    tri = _tri;
                    tri.should.have.status(200);
                });
        });
    });

    describe('POST endpoint', function () {

        it('should add a new trip', function () {
            const newTrip = generateTripData();
            console.log(`this is the new trip: Going to ${newTrip.destination} on a budget of ${newTrip.budget}, airfare cost of ${newTrip.costs.airfare}, and lodging cost of ${newTrip.costs.lodging}`);

            return chai.request(app)
                .post('/trips')
                .send(newTrip)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.should.be.a('object');
                });
        });
    });

    describe('PUT endpoint', function () {

        it('should edit the appropriate entry with updated data and return 201', function () {
            const updatedData = {
                destination: "Lake Titicaca",
                budget: "6000"
            };

            return Trip
                .findOne()
                .then(function (trip) {
                    updatedData.id = trip.id;
                    return chai.request(app)
                        .put(`/trips/${trip.id}`)
                        .send(updatedData);
                })
                .then(function (res) {
                    res.should.have.status(201);
                });
        });
    });

    describe('DELETE endpoint', function () {
        it('should delete a trip by ID and return 204', function () {
            let trip;

            return Trip
                .findOne()
                .then(function (_trip) {
                    console.log(_trip);
                    trip = _trip;
                    return chai.request(app).delete(`/trips/${trip._id}`);
                })
                .then(function (res) {
                    res.should.have.status(204);
                });
        });
    });
});