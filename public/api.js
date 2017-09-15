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
const getTrips = (username) => {
    if (username) {
        return $.ajax({
            type: 'GET',
            url: `/itineraries/${username}`
        }).then(trips => {
            let itinerary = makeItinerary(trips, username);
            itinerary.saveItineraryLocally();
            return itinerary;
        });
    } else {
        return Promise.resolve(makeItinerary(retrieveFromLocal()));
    }
}

const makeItinerary = function (trips, username) {
    function addTrip(trip) {
        trips.push(trip);
        return saveTrips();
    }

    function getTrip(index) {
        return trips[index]
    }

    function editTrip(updatedTrip, itemIndex) {
        trips[itemIndex] = updatedTrip;
        return saveTrips();
    }

    function deleteTrip(itemIndex) {
        trips.splice(itemIndex, 1);
        return saveTrips();
    }

    function saveTrips() {
        saveToLocal();
        if (username) {
            //save to API
            return $.ajax({
                type: 'PUT',
                url: `/itineraries/${username}`,
                data: JSON.stringify(trips),
                contentType: 'application/json'
            });
        }
        return Promise.resolve();
    }

    function saveToLocal() {
        localStorage.setItem('localObj', JSON.stringify(trips));
    }

    return {
        addTrip: addTrip,
        editTrip: editTrip,
        deleteTrip: deleteTrip,
        saveItinerary: saveTrips,
        saveItineraryLocally: saveToLocal,
        getTrip: getTrip,
        trips: trips
    }
}
