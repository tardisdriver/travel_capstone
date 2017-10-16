const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { DATABASE_URL, PORT } = require('./config'); // {DATABASE: db, PORT: port}
const { Itinerary } = require('./models');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

function findItinerary(username) {
  return Itinerary
    .findOne({ username: username })
    .then((itinerary) => {
      if (itinerary) {
        return { trips: itinerary.trips };
      }
      return { trips: [] };
    });
}

app.get('/itineraries/:username', (req, res) => {

  findItinerary(req.params.username)
    .then(data => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong getting your trips' });
    });
});

app.put('/itineraries/:username', (req, res) => {
  Itinerary
    .findOneAndUpdate(
    { username: req.params.username },
    { trips: req.body },
    { upsert: true },
  )
    .then(() => {
      console.log('Updated trips');
      res.status(204).json({ message: 'Trips updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong updating your trips' });
    });
});

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', (err) => {
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
      server.close((err) => {
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
}

module.exports = { runServer, app, closeServer };
