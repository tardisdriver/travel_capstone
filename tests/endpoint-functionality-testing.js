const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = require('chai').expect;

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

describe('Endpoint Testing', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function () {
        console.log('seeding trip data');
        return seedTripData();
    });
    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    })

    describe('GET endpoint', function () {


        it('should return trips and have a length equal to the trip count', function () {

            return chai.request(app)

                .get('/trips')
                .then(function (tri) {
                    expect(tri.body.trips).to.exist;
                    expect(tri.body.trips).to.have.length.of.at.least(1);
                    return Trip.count().then(function (count) {
                        expect(tri.body.trips).to.have.length.of(count);
                    });
                });
        });

    });
});