const localObj = 'localObj';

const retrieveFromLocal = () => {
    return JSON.parse(localStorage.getItem(localObj));
}

const saveToLocal = (obj) => {
    localStorage.setItem(localObj, JSON.stringify(obj));
}

const getTrips = () => {
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
    return Promise.resolve(retrieveFromLocal() || demoTrips);
}

const saveTrips = (obj) => {
    saveToLocal(obj);
    return Promise.resolve();
}

const editTrip = (destination, budget, airfare, lodging, index) => {
    const retrieve = retrieveFromLocal();
   
    
    saveToLocal(retrieve);
    return Promise.resolve(retrieve.destination)
}

const removeTrip = () => {
    localStorage.removeItem(localObj);
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

