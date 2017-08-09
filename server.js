const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { DATABASE_URL, PORT } = require('./config');
const { Trip } = require('./models');

const app = express();
app.use(bodyParser.json());



app.get('/trips', (req, res) => {
    Trip
        .find()
        .then(trips => {
            res.json(
                {
                    usertrips: trips.map(trip => trip.apiRepr())
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong getting your trips' })
        });
});

app.post('/trips', (req, res) => {
    Trip
        .create({
            destination: req.body.destination,
            budget: req.body.budget,
            costs: {
                airfare: req.body.costs.airfare,
                lodging: req.body.costs.lodging
            }
        })
        .then(tripPost => res.status(201).json(tripPost.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong adding your trip' });
        });
})


function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err))
};

module.exports = { runServer, app, closeServer };