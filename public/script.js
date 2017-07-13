var TRIPS_DATA_URL = 'http://localhost:8888/trips';


function getDataFromTripAPI(callback) {
  //gets data from API
  var settings = {
  url: TRIPS_DATA_URL,
  type: "GET",
    success: function(data) {
      callback(data);
      }
    };
  $.ajax(settings);
  
}

/*function editTrip(tripID, callback) {
  var settings = {
    url: TRIPS_DATA_URL,
    type: "PUT",
    data: {
      destination: $(".js-destination").value(),
      budget: $(".js-budget").value(),
    }
      success:function(data){
        callback(data);
      }
  }
}*/


function addTrip() {
  //adds new trip  
  console.log('addTrip ran');
  var settings = {
    url: TRIPS_DATA_URL,
    type: "POST",
    data: {
      destination: $(".js-destination").value(),
      budget: $(".js-budget").value(),
      aifareCost: $(".js-airfareCost").value(),
      lodgingCost: $(".js-lodgingCost").value(),
      foodCost: $(".js-foodCost").value(),
      entertainmentCost: $(".js-entertainmentCost").value(),
      carRentalCost: $(".js-carRentalCost").value(),
      miscCost: $(".js-miscCost").value()
    },
      success:function(data){
        callback(data);
      }
  }
}

function renderSavedTripData(data) {
  for (var i = 0; i<data.trips.length; i++){
  $(".js-savedTrips").append(
    '<div>' +
       '<span>Destination: ' + data.trips[i].destination + '<br>' +
       '<span>Budget: ' + data.trips[i].budget + '<br>' +
       '<span>Airfare Cost: ' + data.trips[i].airfareCost + '<br>'+
       '<span>Lodging Cost: ' + data.trips[i].lodgingCost + '<br>' +
       '<span>Food Cost: ' + data.trips[i].foodCost + '<br>' +
       '<span>Entertainment Cost: ' + data.trips[i].entertainmenCost + '<br>' +
       '<span>Car Rental Cost: ' + data.trips[i].carRentalCost + '<br>' +
       '<span>Miscellaneous Cost: ' + data.trips[i].miscCost +'<br>' +
       '<span>Edit This Trip</span>'+
        '</div><br><br>');
  }
}

function handleNewSubmit() {
  console.log('handleNewSubmit ran');
  //handles new trip when submit button is pressed
  addTrip();
}


$(document).ready(function() {
  getDataFromTripAPI(renderSavedTripData);
  $(handleNewSubmit);
});
