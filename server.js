
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const morgan = require('morgan');

const {Trips} = require('./models');
const tripsRouter = require('./tripsRouter');
const{DATABASE_URL, PORT} = require('./config');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
//app.use('/', tripsRouter);


mongoose.Promise = global.Promise;

app.get('/trips', (req, res) => {
  Trips
    .find()
    .exec()
    .then(trips => {
      res.json(
        {
          trips: trips.map(trip => trip.apiRepr())
          
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
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
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
