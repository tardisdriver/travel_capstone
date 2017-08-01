const savedTrips = require('./mock-model');

//purpose of this const??
const localObj = 'localObj';

const retrieveFromLocal = () => {
    return JSON.parse(localStorage.getItem('localObj'));
}

const saveToLocal = (obj) => {
    localStorage.setItem('localObj', JSON.stringify(obj));
}

const getTrips = () => {
    return Promise.resolve(retrieveFromLocal());
}

const saveTrips = (obj) => {
    saveToLocal(obj);
    return Promise.resolve(retrieveFromLocal);
}

const editTrip = (destination, budget, airfare, lodging, index) => {
    const retrieve = retrieveFromLocal();
    for (let property in destination) {
        if (retrieve.destination[index].hasOwnProperty(property)) {
            retrieve.destination[index][property] = destination[property];
        }
    };
    saveToLocal(retrieve);
    return Promise.resolve(retrieve.destination);
}

const removeTrip = () => {
    localStorage.removeItem('localObj');
}

const createDemo = () => {
    const obj = {
        destination: trip[0].destination,
        budget: trip[0].budget,
        //do I need the getter function here?
        airfare: trip[0].costs.airfare,
        lodging: trip[0].conts.lodging
    };
    saveTrips(obj);
    return obj;
}

module.exports = { getTrips, saveTrips, editTrip };