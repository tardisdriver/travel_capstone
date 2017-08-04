const localObj = 'localObj';

const retrieveFromLocal = () => {
    console.log('retrieveFromLocal ran');
    return JSON.parse(localStorage.getItem('localObj'));
}

const saveToLocal = (obj) => {
    console.log('saveToLocal ran');
    console.log('obj from saveToLocal', obj);
    localStorage.setItem('localObj', JSON.stringify(obj));
    console.log(localStorage);
}

const getTrips = () => {
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
}

const saveTrips = (obj) => {
    console.log('saveTrips ran');
    console.log(obj);
    saveToLocal(obj);
    return Promise.resolve();
}

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


