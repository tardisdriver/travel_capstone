/* global $ localStorage */

const localObj = 'localObj';

const retrieveFromLocal = () => {
  const data = localStorage.getItem(localObj);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};
function saveToLocal(trips) {
  localStorage.setItem(localObj, JSON.stringify(trips));
}

function saveTrips(trips, username) {
  saveToLocal(trips);
  if (username) {
    $.ajax({
      type: 'PUT',
      url: `/itineraries/${username}`,
      data: JSON.stringify(trips),
      contentType: 'application/json',
    });
  }
}

const getTrips = (username) => {
  if (username) {
    const ajaxOptions = {
      type: 'GET',
      url: `/itineraries/${username}`,
    };
    return $.ajax(ajaxOptions)
      .then(res => res.trips);
  }
  return Promise.resolve(retrieveFromLocal());
};

function checkUsername(username) {
  return $.ajax({
    type: 'GET',
    url: `/itineraries/${username}`,
  })
    .then(function (res) {
      if (res.trips.length === 0) {
        var exists = false;
      } else {
        exists = true;
      }
      console.log(exists);
      return exists;
    })
}
