const chai = require('chai');
const chaiHttp = require('chai-http');
//const mongoose = require('mongoose');
process.env.PORT=9999;

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Trips', function() {
	before(function() {
    	return runServer();
  		});

	after(function() {
    	return closeServer();
 		 });

	it('should return trip data on GET', function() {
		return chai.request(app)
		.get('/trips')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.length.should.be.at.least(1);

		const expectedKeys = ['destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost'];
      		res.body.forEach(function(item) {
       		item.should.be.a('object');
        	item.should.include.keys(expectedKeys);
         });
		});
	});
});