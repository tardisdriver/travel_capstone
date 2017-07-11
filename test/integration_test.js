const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {Trip} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedTripData() {
  console.info('seeding trip data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateTripData());
  }

  return Trip.insertMany(seedData);
 }

function generateTripData() {
  return {
  	destination: faker.address.country(),
  	budget: faker.random.number(),
    lodgingCost: faker.random.number(),
    airfareCost: faker.random.number(),
    foodCost: faker.random.number(),
    carRentalCost: faker.random.number(),
    entertainmentCost: faker.random.number(),
    miscCost: faker.random.number()
    }
  }


function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}


describe('Trips API resource', function() {
	before(function() {
    	return runServer(TEST_DATABASE_URL);
  		});

	beforeEach(function() {
		return seedTripData();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
    	return closeServer();
 		 });

	
	describe('GET endpoint', function() {
	
		it('should return trip data on GET', function() {

			let tri;
			return chai.request(app)
			.get('/trips')
			.then(function(_tri) {
				tri = _tri;
				tri.should.have.status(200);
				tri.should.be.json;
				tri.body.trips.should.have.length.of.at.least(1);
				return Trip.count();
			})
			.then(function(count) {
				tri.body.trips.should.have.length.of(count);
			});
		});

	it('should return trips with correct fields', function() {
		let triTrip;
		return chai.request(app)
			.get('/trips')
			.then(function(tri) {
				tri.should.have.status(200);
				tri.should.be.json;
				tri.body.trips.should.be.a('array');
				tri.body.trips.should.have.length.of.at.least(1);

				tri.body.trips.forEach(function(trips) {
					trips.should.be.a('object');
					trips.should.include.keys(
						'id', 'destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost');
				});
				triTrip = tri.body.trips[0];
				return Trip.findById(triTrip.id);
			})
				.then(function(trips) {
					triTrip.id.should.equal(trips._id.toString());
					triTrip.destination.should.equal(trips.destination);
					triTrip.budget.should.equal(trips.budget);
					triTrip.lodgingCost.should.equal(trips.lodgingCost);
					triTrip.airfareCost.should.equal(trips.airfareCost);
					triTrip.foodCost.should.equal(trips.foodCost);
					triTrip.carRentalCost.should.equal(trips.carRentalCost);
					triTrip.entertainmentCost.should.equal(trips.entertainmentCost);
					triTrip.miscCost.should.equal(trips.miscCost);
					});
				});

	});

	describe('POST endpoint', function() {
		it('should add a new trip', function() {
			const newTrip = generateTripData();
			return chai.request(app)
				.post('/trips')
				.send(newTrip)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost');
				});
				res.body.id.should.not.be.null;
				res.body.desination.should.equal(newTrip.destination);
				res.body.budget.should.equal(newTrip.budget);
				res.body.lodgingCost.should.equal(newTrip.lodgingCost);
				res.body.airfareCost.should.equal(newTrip.airfareCost);
				res.body.foodCost.should.equal(newTrip.foodCost);
				res.body.carRentalCost.should.equal(newTrip.carRentalCost);
				res.body.entertainmentCost.should.equal(newTrip.entertainmentCost);
				res.body.miscCost.should.equal(newTrip.miscCost);

				});
		});

	describe('DELETE endpoint', function() {
    it('should delete a trip by ID', function() {
      let tripdata;

      return Trip
        .findOne()
        .exec()
        .then(function(tripdata) {
          return chai.request(app).delete(`/trips/${tripdata.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
        })
        .then(function(tripdata) {
          should.not.exist(tripdata);
        });
    });
  });

	describe('PUT endpoint', function() {
		it('should update fields sent over', function() {
			const updateData = {
				destination: 'ABC123',
				budget: '12345'
			};

			return Trip
				.findOne()
				.exec()
				.then(function(tripdata) {
					updateData.id = tripdata.id;
					return chai.request(app)
						.put(`/trips/${tripdata.id}`)
						.send(updateData);
				})
				.then(function(res) {
					res.should.have.status(201);
					return Trip.findById(updateData.id).exec();
				})
				.then(function(tripdata){
					tripdata.destination.should.equal(updateData.destination);
					tripdata.budget.should.equal(updateData.budget);
				});
		});
	});
	});

	