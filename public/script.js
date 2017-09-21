let username = localStorage.getItem('username');
let itinerary;

function getter(trip, name) {
    const findValue = item => item.name == name;
    const cost = trip.costs.find(findValue);
    return cost.value;
}

//calculates the amount left to spend
function calculateAmountLeft(item) {
    const budget = item.budget;
    const expenses = parseInt(getter(item, "airfare")) + parseInt(getter(item, "lodging"));
    const amountLeft = budget - expenses;
    return amountLeft;
}

function handleCreateUser() {
    $(".js-username-submit").on("click", function (event) {
        event.preventDefault();
        setUser($('.js-username').val());
        //the local itinerary pushed to server
        itinerary = makeItinerary(itinerary.trips, username);
        itinerary.saveItinerary();
    });
}

function handleRetrieveUser() {
    $(".js-username-retrieve").on("click", function (event) {
        event.preventDefault();
        setUser($('.js-username').val());
        //retrieve itinerary from server
        retrieveTrips();
    });
}

function setUser(name) {
    username = name;
    localStorage.setItem('username', username);
}

const makeItinerary = function (trips, username) {
    if (!(trips instanceof Array)) {
        throw new Error(`trips is not an array, it is ${trips}`)
    }
    function addTrip(trip) {
        trips.push(trip);
        return saveTrips(trips);
    }

    function getTrip(index) {
        return trips[index]
    }

    function editTrip(updatedTrip, itemIndex) {
        trips[itemIndex] = updatedTrip;
        return saveTrips(trips);
    }

    function deleteTrip(itemIndex) {
        trips.splice(itemIndex, 1);
        return saveTrips(trips);
    }
    function saveItinerary() {
        saveTrips(trips);
    }

    return {
        addTrip: addTrip,
        editTrip: editTrip,
        deleteTrip: deleteTrip,
        saveItinerary: saveItinerary,
        getTrip: getTrip,
        trips: trips
    }
}

//creates the list of saved trips in html
function renderTripList() {
    let listOfRenders = itinerary.trips.map(renderTrip) //this would now be a list of somethings? as rendered by jQuery? as an HTML string
    let renderedTripList = listOfRenders.join("")
    $('.js-trip-list').html(renderedTripList);
}

function renderTrip(trip, index) {
    const template = $('#list-item-template').clone();
    return generateItemElement(trip, index, template);
}

//uses the html template to generate divs for each saved trip
function generateItemElement(item, itemIndex, template) {
    const form_id = `js-trip-info-${itemIndex}`;
    template.find('.js-saved-trips').attr("id", form_id);
    template.find('.js-trip-item-date').attr("value", item.date);
    template.find('.js-trip-item-destination').attr("value", item.destination);
    template.find('.js-trip-item-budget').attr("value", item.budget);
    template.find('.js-trip-item-airfare').attr("value", getter(item, "airfare"));
    template.find('.js-trip-item-lodging').attr("value", getter(item, "lodging"));
    const amt_left = calculateAmountLeft(item);
    template.find('.js-budget-calc').text(amt_left);
    template.find('.js-item-index-element').attr('data-item-index', itemIndex);
    template.find('.js-current-savings').text(item.savings);
    template.find('.js-budget-total').text(item.budget);
    return template.html();
}

// BEGIN PUSH CODE

//pushes a new trip to the list
function addItemToTripList(itemDate, itemDestination, itemBudget, itemAirfare, itemLodging) {
    const newTrip = { date: itemDate, destination: itemDestination, budget: itemBudget, costs: [{ name: "airfare", value: itemAirfare }, { name: "lodging", value: itemLodging }] };
    itinerary.addTrip(newTrip);
}

function getAndClear(selector) {
    const itemElement = $(selector);
    const itemElementValue = itemElement.val();
    itemElement.val('');
    return itemElementValue;
}


//handles user input for adding a new trip
function handleNewItemSubmit() {
    $('#js-trip-list-form').submit(function (event) {
        event.preventDefault();
        const newItemDate = getAndClear('.js-trip-list-entry-date');
        const newItemElementDestination = getAndClear('.js-trip-list-entry-destination');
        const newItemElementBudget = getAndClear('.js-trip-list-entry-budget');
        const newItemElementAirfare = getAndClear(".js-trip-list-entry-airfare");
        const newItemElementLodging = getAndClear('.js-trip-list-entry-lodging');
        addItemToTripList(newItemDate, newItemElementDestination, newItemElementBudget, newItemElementAirfare, newItemElementLodging);
        render();
    });
}

//for PUT and DELETE, this identifies indexes
function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
        .closest('.js-item-index-element')
        .attr('data-item-index');
    return parseInt(itemIndexString, 10);
}

//DELETE BEGIN

//removes selected item from the STORE.trips
function deleteClickedItem(itemIndex) {
    console.log("Deleting li for item at index " + itemIndex);
    itinerary.deleteTrip(itemIndex);
}

//handler for delete button
function handleDeleteItemClicked() {
    $('.js-item-delete').on('click', function (event) {
        console.log('`handleDeleteItemClicked` ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteClickedItem(itemIndex);
        render();
    });
}


//PUT BEGIN

//fetches new user input and places it in the STORE.trips
function editClickedItem({ itemIndex, newDate, newAirfare, newDestination, newBudget, newLodging }) {
    console.log('Editing item at index ' + itemIndex);
    itinerary.getTrip(itemIndex).date = newDate;
    itinerary.getTrip(itemIndex).destination = newDestination;
    itinerary.getTrip(itemIndex).budget = newBudget;
    itinerary.getTrip(itemIndex).costs[0].value = newAirfare;
    itinerary.getTrip(itemIndex).costs[1].value = newLodging;
    itinerary.editTrip(itinerary.getTrip(itemIndex), itemIndex);
    render();
}

//handler for save changes button
function handleEditItemClicked() {
    $('.js-saved-trips').on('submit', function (event) {
        event.preventDefault();
        var itemIndex = parseInt($(this).children().attr("data-item-index"));
        var newDate = event.currentTarget.date.value;
        var newAirfare = event.currentTarget.tripairfare.value;
        var newDestination = event.currentTarget.tripdestination.value;
        var newBudget = event.currentTarget.tripbudget.value;
        var newLodging = event.currentTarget.triplodging.value;
        editClickedItem({ itemIndex, newDate, newAirfare, newDestination, newBudget, newLodging });
    });
}



//this function fires all other necessary functions

function render() {
    $('.js-username').val(username);
    handleCreateUser();
    handleRetrieveUser();
    renderTripList();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleEditItemClicked();
    datePicker();
}

function retrieveTrips() {
    getTrips(username)
        .then(trips => {
            console.log(trips);
            itinerary = makeItinerary(trips, username);
            return itinerary;
        })
        .then(render)
}

$(retrieveTrips);