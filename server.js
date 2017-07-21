
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//const tripsRouter = require('./tripsRouter');
const{DATABASE_URL, PORT} = require('./config');
const {Trip} = require('./models');

//const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
//app.use('/', tripsRouter);


mongoose.Promise = global.Promise;

app.get('/trips', (req, res) => {
  Trip
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

app.get('/trips/:id', (req, res) => {
  console.log("test", req.params.id);
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => res.json(trip.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Uh-oh, something is wrong here'});
    });
});

app.post('/trips', (req, res) => {
  const requiredFields = ['destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost'];
  for (let i=0; i<requiredFields.length; i++) {
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
      airfareCost: req.body.airfareCost,
      lodgingCost: req.body.lodgingCost,
      foodCost: req.body.foodCost,
      entertainmentCost: req.body.entertainmentCost,
      carRentalCost: req.body.carRentalCost,
      miscCost: req.body.miscCost
    })

    .then(tripPost => res.status(201).json(tripPost.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Something went awry with the post!'});
    });
});

app.delete('/trips/:id', (req, res) => {
  Trip
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'successful delete'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong with the delete!'});
    });
});

app.delete('/:id', (req, res) => {
  Trip
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      console.log(`Deleted trip with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.put('/trips/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id must match'
    });
  }

  const updated = {};
  const updateableFields = ['destination', 'budget', 'lodgingCost', 'airfareCost', 'foodCost', 'carRentalCost', 'entertainmentCost', 'miscCost'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Trip
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedTrip => res.status(201).json(updatedTrip.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong with the update'}));
});


app.use('*', function(req, res) {
  res.status(404).json({message: 'Oops, Not Found'});
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
