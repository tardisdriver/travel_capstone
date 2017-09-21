const localObj = 'localObj';

const retrieveFromLocal = () => {
    const data = localStorage.getItem(localObj);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function saveTrips(trips) {
    saveToLocal(trips);
    if (username) {
        $.ajax({
            type: 'PUT',
            url: `/itineraries/${username}`,
            data: JSON.stringify(trips),
            contentType: 'application/json'
        });
    }
}

function saveToLocal(trips) {
    localStorage.setItem(localObj, JSON.stringify(trips));
}

//if username specified, retrieve trips from server and save locally, otherwise just use local storage
const getTrips = (username) => {
    if (username) {
        const ajaxOptions = {
            type: 'GET',
            url: `/itineraries/${username}`
        }
        return $.ajax(ajaxOptions)
            .then(res => res.trips)

    } else {
        return Promise.resolve(retrieveFromLocal());
    }
}


