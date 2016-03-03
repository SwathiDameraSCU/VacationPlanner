
function validateFlightForm (to, from, departDate, returnDate, roundTrip, airports) {
  if (to == null || to === "") {
    return '"To" field is required';
  } else if (from == null || from === "") {
    return '"From" field is required';
  } else if (departDate == null || departDate === "") {
    return '"Departure Date" is required'
  } else if (roundTrip && (returnDate == null  || returnDate === "")) {
    return '"Return Date is required';
  } else if (_.keys(airports).indexOf(to) == -1) {
    return '"' + to + '" is not a valid airport identifier'
  } else if (_.keys(airports).indexOf(from) == -1) {
    return '"' + from + '" is not a valid airport identifier'
  } else if (new Date(departDate) - Date.now() < 0) {
    return 'Departure date "' + departDate + '" is in the past';
  } else if (roundTrip && (new Date(returnDate) - Date.now() < 0)) {
    return 'Return date "' + returnDate + '" is in the past';
  } else if (roundTrip && new Date(returnDate) - new Date(departDate) < 0) {
    return 'Return date must be after departure date';
  }
  return null;
}

function autoCompleteAirportInfo (selector, airports) {
  $(selector).autocomplete({
    source: _.map(airports, function(full, abbrev) {
      return {label: full + ' (' + abbrev + ')', value: abbrev};
    })
  });
}

function loadAirports (cb) {
  if (Storage != null) {
    var airportData = localStorage.getItem("airports");
    if (airportData != null) {
      console.log('cached');
      cb(JSON.parse(airportData));
      return;
    }
  }

  $.get("http://localhost:9000/airports", function (data) {
    if (Storage != null) {
      localStorage.setItem("airports", data);
    }
    console.log('full load');
    cb(JSON.parse(data));
  });
}