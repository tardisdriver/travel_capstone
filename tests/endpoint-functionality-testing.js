const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = require('chai').expect;

const should = chai.should();

const { Itinerary } = require('../models');
const { TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);

function seedTrip() {
    const seededTrip = {
        username: 'TestGuy',
        trips: [{
            date: '05/14/2020',
            destination: 'Narnia',
            budget: 7000,
            costs: [
                {
                    name: 'airfare',
                    value: 1300
                },
                {
                    name: 'lodging',
                    value: 1352
                }
            ]
        }
        ]
    }
    return Itinerary.create(seededTrip);
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Endpoint Testing', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    })

    describe('Reading user trips functionality', function () {
        it('should return users trips', function () {
            return seedTrip()
                .then(() => {
                    return chai.request(app)
                        .get('/itineraries/TestGuy')
                        .then(function (res) {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                        });
                });
        });

    });
    describe('Updating trips functionality', function () {
        it('should update trip info', function () {
            const updatedTrip = {
                username: 'TestGuy',
                trips: [{
                    date: '05/14/2020',
                    destination: 'Narnia',
                    budget: 99999,
                    costs: [
                        {
                            name: 'airfare',
                            value: 1300
                        },
                        {
                            name: 'lodging',
                            value: 1352
                        }
                    ]
                }
                ]
            };

            return seedTrip()
                .then(function (trip) {
                    console.log(trip);
                    updatedTripUsername = trip.username;
                    return chai.request(app)
                        .put(`/itineraries/${updatedTripUsername}`)
                        .send(updatedTrip)
                })
                .then(function (res) {
                    res.should.have.status(204);

                })
        });
    });
});




    // function readJSON(filename, callback){
    //     fs.readFile(filename, 'utf8', function (err, res){
    //       if (err) return callback(err);
    //       try {
    //         res = JSON.parse(res);
    //       } catch (ex) {
    //         return callback(ex);
    //       }
    //       callback(null, res);
    //     });
    //   }

    //   function readJSON(filename){
    //     return readFile(filename, 'utf8').then(function (res){
    //       return JSON.parse(res)
    //     })
    //   }

    //   Tank.create({
    //       size: 'small'
    //   })
    //   .then(function(res){
    //       return 
    //   }