const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
process.env.PORT=9999;

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {Trips} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedTripData() {
  console.info('seeding trip data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateTripData());
  }

  return Trips.insertMany(seedData);
 }

 function generateDestination() {
  const destinations = [
    'Niagra Falls', 'Kenyan Safari', 'Albequerque', 'Frankfurt, Germany', 'Sydney, Australia'];
  return destinations[Math.floor(Math.random() * destinations.length)];
}

function generateTripData() {
  return {
  	destination: generateDestination(),
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
    	return runServer();
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
				return Trips.count();
			})
			//.then(function(count) {
				//tri.body.trips.shouldhave.length.of(count);
			//});
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

				return Trips.findById(triTrip.id);

			})
				.then(function(trips) {
					

					triTrip.id.should.equal(trips.id);
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

		/*const expectedKeys = ['destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost'];
      		res.body.forEach(function(item) {
       		item.should.be.a('object');
        	item.should.include.keys(expectedKeys);

         	});*/
			});
		});
	