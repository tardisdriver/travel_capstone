const localObj = 'localObj';

const retrieveFromLocal = () => {
    const data = localStorage.getItem(localObj);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function saveTrips(trips, username) {
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

//function that checks username in the DB
//  do a .find(_username_) on DB
//      do GET where username equals entry

function checkUsername(username) {
    console.log('checkUsername Ran');
    return $.ajax({
        type: 'GET',
        url: `/itineraries/${username}`
    })
        .then(function (res) {
            if (res.trips.length === 0) {
                var exists = false;
            } else {
                exists = true;
            }
            console.log(exists);
            return exists;
        })
}




// on create user

// if username exists, display error message


