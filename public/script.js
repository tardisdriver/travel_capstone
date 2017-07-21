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

function editTrip() {
  var jsDestination = $('.js-destination').val();
  console.log(jsDestination);

    $.ajax({
            type: "PUT",
            url: TRIPS_DATA_URL,
            dataType: 'json',
            data: {
              destination: jsDestination
            }
        })

        .done(function() {
          
            // console.log(dataOutput);
            // displayActiveActivityResults(JSON.parse(resultsForJsonParse));
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
  }



function addTrip(callback) {
  //adds new trip  
  console.log('addTrip ran');
  var settings = {
    url: TRIPS_DATA_URL,
    type: "POST",
    data: JSON.stringify({
      destination: $(".js-destination").val(),
      budget: $(".js-budget").val(),
      airfareCost: $(".js-airfareCost").val(),
      lodgingCost: $(".js-lodgingCost").val(),
      foodCost: $(".js-foodCost").val(),
      entertainmentCost: $(".js-entertainmentCost").val(),
      carRentalCost: $(".js-carRentalCost").val(),
      miscCost: $(".js-miscCost").val()
    }),
      dataType: 'json',
      contentType: 'application/json',
      success:function(data){
        if (typeof callback !== 'undefined') {
        callback(data);
        }
      }
  };
  $.ajax(settings);
  //need code to add item to page
}


function deleteTrip() {
  $('.js-delete').on('click', function() {
    console.log('deletetrip ran');
    if (confirm('Are you sure you want to delete this trip?')) {
      var id = $(this).parent().attr('id');
      $.ajax({
        url: TRIPS_DATA_URL,
        data: id,
        method: 'DELETE',
      })
      .done(function() {
        console.log('trip deleted');
        window.location.reload(true);
      });
    }
  })
}



function renderSavedTripData(data) {
  for (var i = 0; i<data.trips.length; i++){
  $(".js-savedTrips").append(
    '<div>' +
        '<form class = "js-form">'+
       '<span>Destination: <input type="text" class= "js-destination" value="' + data.trips[i].destination + '"><br>' +
       /*'<span>Budget: ' + data.trips[i].budget + '<br>' +
       '<span>Airfare Cost: ' + data.trips[i].airfareCost + '<br>'+
       '<span>Lodging Cost: ' + data.trips[i].lodgingCost + '<br>' +
       '<span>Food Cost: ' + data.trips[i].foodCost + '<br>' +
       '<span>Entertainment Cost: ' + data.trips[i].entertainmenCost + '<br>' +
       '<span>Car Rental Cost: ' + data.trips[i].carRentalCost + '<br>' +
       '<span>Miscellaneous Cost: ' + data.trips[i].miscCost +'<br>' +*/
       `<input type="hidden" name="trip_id" value="${data.trips[i].id}"></input>
       <button type="submit" class="js-edit">Save Changes</button>
       <button type="button" class="js-delete">Delete this trip</button></div><br><br>
        </form>`);
  }
}


function handleNewSubmit() {
  //handles new trip when submit button is pressed
  $("#js-trip-info").on("submit", function(e) {
    console.log('handleNewSubmit ran');
      e.preventDefault();
      addTrip();
  });
}

function handleEditTrip() {
  $('.js-form').submit(function(e) {
    
    e.preventDefault();
    var userInput = $('.js-destination').val();
    console.log(userInput);
    editTrip(userInput);
  })
}


$(document).ready(function() {
  $(handleNewSubmit);
  deleteTrip();
  handleEditTrip();
  getDataFromTripAPI(renderSavedTripData);
});

$(".js-savedTrips").submit('.js-form', function(e) {
    console.log('id: ', e.target.trip_id);
    console.log('handleEditTrip ran');
    e.preventDefault();
    var userInput = $('.js-destination').val();
    console.log(userInput);
    editTrip(userInput);
  });
