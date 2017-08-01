const savedTrips = require('./mock-model');

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

module.exports = { getTrips, saveTrips, editTrip };