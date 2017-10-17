/* global $ localStorage */

let itinerary;

function getter(trip, name) {
  const findValue = item => item.name == name;
  const cost = trip.costs.find(findValue);
  return cost.value;
}

function calculateAmountLeft(item) {
  const budget = item.budget;
  const expenses = parseInt(getter(item, 'airfare')) + parseInt(getter(item, 'lodging'));
  const amountLeft = budget - expenses;
  return amountLeft;
}

function handleCreateUser() {
  $('.js-username-submit').on('click', (event) => {
    event.preventDefault();
    const currentUser = $('.js-username').val();
    checkUsername(currentUser)
      .then((exists) => {
        if (exists) {
          $('#warning').removeClass('hidden');
          $('.warning-message').text('User already exists');
        } else {
          setUser(currentUser);
          itinerary = makeItinerary(itinerary.trips, getUser());
          itinerary.saveItinerary();
          $('#login').addClass('hidden');
          render();
        }
      });
  });
}

function handleRetrieveUser() {
  $('.js-username-retrieve').on('click', (event) => {
    event.preventDefault();
    setUser($('#js-username-retrieve').val());
    retrieveTrips();
  });
}

function handleLogOut() {
  $('#log-out').on('click', (event) => {
    event.preventDefault();
    itinerary = makeItinerary([]);
    localStorage.clear();
    $('.label-as-badge').addClass('hidden');
    render();
  });
}

function setUser(name) {
  localStorage.setItem('username', name);
}

function getUser() {
  return localStorage.getItem('username');
}

const makeItinerary = function (trips, username) {
  if (!(trips instanceof Array)) {
    throw new Error(`trips is not an array, it is ${trips}`);
  }
  function addTrip(trip) {
    trips.push(trip);
    return saveTrips(trips, username);
  }

  function getTrip(index) {
    return trips[index];
  }

  function editTrip(updatedTrip, itemIndex) {
    trips[itemIndex] = updatedTrip;
    return saveTrips(trips, username);
  }

  function deleteTrip(itemIndex) {
    trips.splice(itemIndex, 1);
    return saveTrips(trips, username);
  }
  function saveItinerary() {
    saveTrips(trips, username);
  }

  return {
    addTrip,
    editTrip,
    deleteTrip,
    saveItinerary,
    getTrip,
    trips,
  };
};

function badgeNumber(number) {
  $('.label-as-badge').text(number);
}

function renderTrip(trip, index) {
  const template = $('#list-item-template').clone();
  return generateItemElement(trip, index, template);
}

function renderTripList() {
  const listOfRenders = itinerary.trips.map(renderTrip);
  const renderedTripList = listOfRenders.join('');
  $('.js-trip-list').html(renderedTripList);
  const badgeCount = listOfRenders.length;
  if (badgeCount !== 0) {
    $('.label-as-badge').removeClass('hidden');
    badgeNumber(badgeCount);
  }
}

function generateItemElement(item, itemIndex, template) {
  const formId = `js-trip-info-${itemIndex}`;
  template.find('.js-saved-trips').attr('id', formId);
  template.find('.js-trip-item-date').attr('value', item.date);
  template.find('.js-trip-item-destination').attr('value', item.destination);
  template.find('.js-trip-item-budget').attr('value', item.budget);
  template.find('.js-trip-item-airfare').attr('value', getter(item, 'airfare'));
  template.find('.js-trip-item-lodging').attr('value', getter(item, 'lodging'));
  const amtLeft = calculateAmountLeft(item);
  template.find('.js-budget-calc').text(amtLeft);
  template.find('.js-item-index-element').attr('data-item-index', itemIndex);
  template.find('.js-current-savings').text(item.savings);
  template.find('.js-budget-total').text(item.budget);
  return template.html();
}

function addItemToTripList(itemDate, itemDestination, itemBudget, itemAirfare, itemLodging) {
  const newTrip = {
    date: itemDate, destination: itemDestination, budget: itemBudget, costs: [{ name: 'airfare', value: itemAirfare }, { name: 'lodging', value: itemLodging }],
  };
  itinerary.addTrip(newTrip);
}

function getAndClear(selector) {
  const itemElement = $(selector);
  const itemElementValue = itemElement.val();
  itemElement.val('');
  return itemElementValue;
}


// handles user input for adding a new trip
function handleNewItemSubmit() {
  $('#js-trip-list-form').submit((event) => {
    event.preventDefault();
    const newItemDate = getAndClear('.js-trip-list-entry-date');
    const newItemElementDestination = getAndClear('.js-trip-list-entry-destination');
    const newItemElementBudget = getAndClear('.js-trip-list-entry-budget');
    const newItemElementAirfare = getAndClear('.js-trip-list-entry-airfare');
    const newItemElementLodging = getAndClear('.js-trip-list-entry-lodging');
    addItemToTripList(newItemDate, newItemElementDestination, newItemElementBudget, newItemElementAirfare, newItemElementLodging);
    render();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function deleteClickedItem(itemIndex) {
  itinerary.deleteTrip(itemIndex);
}

function handleDeleteItemClicked() {
  $('.js-item-delete').on('click', (event) => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteClickedItem(itemIndex);
    render();
  });
}

function editClickedItem({ itemIndex, newDate, newAirfare, newDestination, newBudget, newLodging }) {
  itinerary.getTrip(itemIndex).date = newDate;
  itinerary.getTrip(itemIndex).destination = newDestination;
  itinerary.getTrip(itemIndex).budget = newBudget;
  itinerary.getTrip(itemIndex).costs[0].value = newAirfare;
  itinerary.getTrip(itemIndex).costs[1].value = newLodging;
  itinerary.editTrip(itinerary.getTrip(itemIndex), itemIndex);
  render();
}

function handleEditItemClicked() {
  $('.js-saved-trips').on('submit', function (event) {
    event.preventDefault();
    const itemIndex = parseInt($(this).children().attr('data-item-index'));
    const newDate = event.currentTarget.date.value;
    const newAirfare = event.currentTarget.tripairfare.value;
    const newDestination = event.currentTarget.tripdestination.value;
    const newBudget = event.currentTarget.tripbudget.value;
    const newLodging = event.currentTarget.triplodging.value;
    editClickedItem({
      itemIndex, newDate, newAirfare, newDestination, newBudget, newLodging,
    });
  });
}

function render() {
  $('.js-username').val(getUser());
  if (getUser()) {
    $('#logged-in-user').text(`Welcome, ${getUser()}!`);
    $('#logged-in').removeClass('hidden');
    $('#login').addClass('hidden');
  } else {
    $('#login, .initial').removeClass('hidden');
    $('#logged-in, .choice, .new-user, .returning-user, #warning').addClass('hidden');
  }
  renderTripList();
  handleCreateUser();
  handleRetrieveUser();
  handleDeleteItemClicked();
  handleEditItemClicked();
  handleLogOut();
  datePicker();
}

function retrieveTrips() {
  getTrips(getUser())
    .then(trips => {
      itinerary = makeItinerary(trips, getUser());
      return itinerary;
    })
    .then(render);
}

$(retrieveTrips);

$(handleNewItemSubmit);
