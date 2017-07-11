function getData(callback) {
  setTimeout(function(){ 
    callback(MOCK_DATA)
  }, 100);
}

function displayData(data) {
  for (index in data.userData) {
    $('body').append(
      '<p>Your Total Budget:' + data.userData[index].budget + '<p>',
      '<p> Lodging Cost: ' + data.userData[index].lodgingCost + '<p>',
      '<p> Airfare Cost: ' + data.userData[index].airfareCost + '<p>',
      '<p> Food Cost: ' + data.userData[index].foodCost + '<p>',
      '<p> Car Rental Cost: ' + data.userData[index].carRentalCost + '<p>',
      '<p> Entertainment Cost: ' + data.userData[index].entertainmentCost + '<p>',
      '<p> Miscellaneous Cost: ' + data.userData[index].miscCost + '<p>');
  }
}

function getAndDisplayData() {
  getData(displayData);
}


getAndDisplayData();
