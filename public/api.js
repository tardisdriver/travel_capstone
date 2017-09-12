const localObj = 'localObj';

const retrieveFromLocal = () => {
    const data = localStorage.getItem(localObj);
    const demoTrips = [
        {
            date: "2019/11/23",
            destination: "Greece",
            budget: 4000,
            costs:
            [
                { name: "airfare", value: 1000 },
                { name: "lodging", value: 900 }
            ],

        },
        {
            date: "2018/04/23",
            destination: "Australia",
            budget: 5000,
            costs:
            [
                { name: "airfare", value: 1300 },
                { name: "lodging", value: 1000 }
            ],
        }
    ];
    if (data) {
        return JSON.parse(localStorage.getItem(localObj));
    } else {
        return demoTrips;
    }
}

const saveToLocal = (obj) => {
    console.log('saveToLocal ran');
    localStorage.setItem('localObj', JSON.stringify(obj));
}


function saveTrips(trips) {
    if (username) {
        //save to API
        $.ajax({
            type: 'PUT',
            url: `http://localhost:8080/itineraries/${username}`,
            data: trips
        });
    } else {
        //save to Local
        itemIndex = parseInt(itemIndex);
        return getTrips()
            .then((currentTrips) => {
                currentTrips[itemIndex] = updatedTrip;
                return saveTrips(currentTrips);
            });
    }
}

const addTrip = (obj) => {
    return getTrips()
        .then((currentTrips) => {
            currentTrips.push(obj)
            return save(currentTrips)
        })
}

const getTrips = () => {
    return Promise.resolve(retrieveFromLocal());
}




const editTrip = (updatedTrip, itemIndex) => {
    //when they set username, take the whole Trips JSON and send to API put request  
    //in state, save username, then call save,
    //if there's a username, save to database, if not save to localstorage
    function saveUsername() {
        //grab username from script.js 
        handleSetUsername();
    }


}

const deleteTrip = (itemIndex) => {
    return getTrips()
        .then((trips) => {
            trips.splice(itemIndex, 1)
            return saveTrips(trips)
        })
}

