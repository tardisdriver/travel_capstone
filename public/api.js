const localObj = 'localObj';

const retrieveFromLocal = () => {
    const data = localStorage.getItem(localObj);
    if (data) {
        return JSON.parse(localStorage.getItem(localObj));
    } else {
        return [];
    }
}

//if username specified, retrieve trips from server and save locally, otherwise just use local storage
const getTrips = (user) => {
    if (user) {
        return $.ajax({
            type: 'GET',
            url: `http://localhost:8080/itineraries/${username}`
        }).then(trips => {
            var itinerary = new Itinerary(trips, user);
            itinerary.saveToLocal();
            return itinerary;
        });
    } else {
        return Promise.resolve(new Itinerary(retrieveFromLocal()));
    }
}

class Itinerary {
    constructor(trips, username) {
        this.trips = trips
        this.username = username
    }

    addTrip(trip) {
        this.trips.push(trip);
        return this.saveTrips();
    }

    editTrip(updatedTrip, itemIndex) {
        this.trips[itemIndex] = updatedTrip;
        return this.saveTrips();
    }

    deleteTrip(itemIndex) {
        this.trips.splice(itemIndex, 1);
        return this.saveTrips();
    }

    saveTrips() {
        this.saveToLocal();
        if (this.username) {
            //save to API
            return $.ajax({
                type: 'PUT',
                url: `http://localhost:8080/itineraries/${this.username}`,
                data: this.trips
            });
        }
        return Promise.resolve();
    }

    saveToLocal() {
        localStorage.setItem('localObj', JSON.stringify(this.trips));
    }
}
