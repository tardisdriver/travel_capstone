const localObj = 'localObj';

const retrieveFromLocal = () => {
<<<<<<< HEAD
    console.log('retrieveFromLocal ran');
    return JSON.parse(localStorage.getItem('localObj'));
=======
    const data = localStorage.getItem(localObj);
    const demoTrips = [
        {
            destination: "Greece",
            budget: 4000,
            costs:
            [
                { name: "airfare", value: 1000 },
                { name: "lodging", value: 900 }
            ],
        },
        {
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
>>>>>>> api
}

const saveToLocal = (obj) => {
    console.log('saveToLocal ran');
    console.log('obj from saveToLocal', obj);
    localStorage.setItem('localObj', JSON.stringify(obj));
    console.log(localStorage);
}

const addTrip = (obj) => {
    return getTrips()
        .then((currentTrips) => {
            currentTrips.push(obj)
            return saveTrips(currentTrips)
        })
}

const getTrips = () => {
<<<<<<< HEAD
    console.log('getTrips ran');
    const demoTrips = [
    {
        destination: "Greece",
        budget: 4000,
        costs:
        [
            { name: "airfare", value: 1000 },
            { name: "lodging", value: 900 }
        ],
    },
    {
        destination: "Australia",
        budget: 5000,
        costs:
        [
            { name: "airfare", value: 1300 },
            { name: "lodging", value: 1000 }
        ],
    }
];
    return Promise.resolve(/*retrieveFromLocal() ||*/ demoTrips);
=======
    return Promise.resolve(retrieveFromLocal());
>>>>>>> api
}

const saveTrips = (obj) => {
    console.log('saveTrips ran');
    console.log(obj);
    saveToLocal(obj);
    return Promise.resolve();
}

<<<<<<< HEAD
const editTrip = (trips) => {
    console.log('editTrip ran');
    const retrieve = retrieveFromLocal();
    console.log(retrieve);
    console.log(trips);
    
    //saveToLocal(retrieve);
   // return Promise.resolve(retrieve.destination)
}

const removeTrip = () => {
    console.log('removeTrip ran');
    localStorage.removeItem(localObj);
}

=======
const editTrip = (updatedTrip, itemIndex) => {
    itemIndex = parseInt(itemIndex);
    return getTrips()
        .then((currentTrips) => {
            currentTrips[itemIndex] = updatedTrip;
            return saveTrips(currentTrips);
        })
}

const deleteTrip = (itemIndex) => {
    return getTrips()
        .then((trips) => {
            trips.splice(itemIndex, 1)
            return saveTrips(trips)
        })
}
>>>>>>> api

