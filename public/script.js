const STORE = [];

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

//uses the html template to generate divs for each saved trip
function generateItemElement(item, itemIndex, template) {
    const form_id = `js-trip-info-${itemIndex}`;
    template.find('.js-saved-trips').attr("id", form_id);
    template.find('.js-trip-item').attr("value", item.destination);
    template.find('.js-trip-item-budget').attr("value", item.budget);
    template.find('.js-trip-item-airfare').attr("value", getter(item, "airfare"));
    template.find('.js-trip-item-lodging').attr("value", getter(item, "lodging"));
    const amt_left = calculateAmountLeft(item);
    template.find('.js-budget-calc').text(amt_left);
    template.find('.js-item-index-element').attr('data-item-index', itemIndex);
    return template.html();
}

//generates a string by mapping over the list of trips
function generateTripItemsString(tripList) {
    console.log("Generating trip list element");
    const items = tripList.map(function (item, index) {
        const template = $('#list-item-template').clone();
        return generateItemElement(item, index, template);
    });
    return items.join("");
}

//creates the list of saved trips in html
function renderTripList(index) {
    console.log('renderTripList ran');
    // generate HTML for the list
    const tripListItemsString = generateTripItemsString(STORE);
    // insert that HTML into the DOM
    if (index != undefined) {
        var insertion = `#js-trip-info-${index}`;
        $(insertion).html(tripListItemsString);
    } else {
        $('.js-trip-list').html(tripListItemsString);
    }
}

// BEGIN PUSH CODE

//pushes a new trip to the list
function addItemToTripList(itemDestination, itemBudget, itemAirfare, itemLodging) {
    console.log('Adding stuff to Trip list');
    const newTrip = { destination: itemDestination, budget: itemBudget, costs: [{ name: "airfare", value: itemAirfare }, { name: "lodging", value: itemLodging }] };
    STORE.push(newTrip);
    addTrip(newTrip);
}

//handles user input for adding a new trip
function handleNewItemSubmit() {
    $('#js-trip-list-form').submit(function (event) {
        event.preventDefault();
        console.log('`handleNewItemSubmit` ran');

        const newItemElement = $('.js-trip-list-entry');
        const newItemElementBudget = $('.js-trip-list-entry-budget');
        const newItemElementAirfare = $(".js-trip-list-entry-airfare");
        const newItemElementLodging = $('.js-trip-list-entry-lodging');
        const newItemDestination = newItemElement.val();
        const newItemBudget = newItemElementBudget.val();
        const newItemAirfare = newItemElementAirfare.val();
        const newItemLodging = newItemElementLodging.val();

        newItemElement.val('');
        newItemElementBudget.val('');
        newItemElementAirfare.val('');
        newItemElementLodging.val('');

        addItemToTripList(newItemDestination, newItemBudget, newItemAirfare, newItemLodging);
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

//removes selected item from the STORE
function deleteClickedItem(itemIndex) {
    console.log("Deleting li for item at index " + itemIndex);
    STORE.splice(itemIndex, 1);
    deleteTrip(itemIndex);
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

//fetches new user input and places it in the STORE
function editClickedItem({ itemIndex, newAirfare, newDestination, newBudget, newLodging }) {
    console.log('Editing item at index ' + itemIndex);

    //change appropriate entry in STORE
    STORE[itemIndex].destination = newDestination;
    STORE[itemIndex].budget = newBudget;
    STORE[itemIndex].costs[0].value = newAirfare;
    STORE[itemIndex].costs[1].value = newLodging;

    editTrip(STORE[itemIndex], itemIndex);
    render();
}

//handler for save changes button
function handleEditItemClicked() {

    //event.currentTarget.tripairfare.value instead of jquery, or wrap it in jquery
    $('.js-saved-trips').on('submit', function (event) {
        console.log('handleEditItemClicked ran');
        event.preventDefault();
        var itemIndex = parseInt($(this).children().attr("data-item-index"));
        var newAirfare = event.currentTarget.tripairfare.value;
        var newDestination = event.currentTarget.tripdestination.value;
        var newBudget = event.currentTarget.tripbudget.value;
        var newLodging = event.currentTarget.triplodging.value;

        editClickedItem({ itemIndex, newAirfare, newDestination, newBudget, newLodging });
        //renderTripList(itemIndex);
    });
}

//this function fires all other necessary functions

function render() {
    renderTripList();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleEditItemClicked();
}

$(function () {
    getTrips()
        .then((trips) =>
            trips.forEach(trip => {
                STORE.push(trip)
            })
        )
        .then(render)
});

