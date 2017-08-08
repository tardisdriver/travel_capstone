const express = require('express');
const mongoose = require('mongoose');

const { DATABASE_URL, PORT } = require('./config');
const { Trip } = require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.get('/trips', (req, res) => {
    Trip
        .find()
        .exec()
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
    const requiredFields = ['destination', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];

        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Trip
        .create({
            destination: req.body.destination,
            budget: req.body.budget,
            costs: req.body.costs
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