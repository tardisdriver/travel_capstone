const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { DATABASE_URL, PORT } = require('./config'); // {DATABASE: db, PORT: port}
const { Trip } = require('./models');
const { Itinerary } = require('/models');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

function findTrips() {
    return Trip
        .find()
        .then(trips => {
            return { trips: trips.map(trip => trip.apiRepr()) }
        }
        )
}

app.get('/trips', (req, res) => {
    findTrips()
        .then(data => res.json(data))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went wrong getting your trips' })
        });
});



app.post('/trips', (req, res) => {
    Trip
        .create({
            date: req.body.date,
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
});

app.put('/trips/:username', (req, res) => {
    Itinerary
        .findOneAndUpdate(
        { username: req.params.username },
        req.body,
        {
            upsert: True
        })
        .then(() => {
            console.log('Updated trips');
            res.status(204);
        })
        .catch(() => {
            console.error('There was an error updating your trips');
            res.status(500);
        })
});

app.delete('/trips/:id', (req, res) => {
    Trip
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted blog post with id \`${req.params.id}\``);
            res.status(204).end();
        });
});


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