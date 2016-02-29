var flights = {};

function getUrlParam(name) {
  var regex = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"), results = regex.exec(window.location.href);
  if (results == null || results[2] == null) {
    return null;
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function selectFlight(optionIndex) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("flightOption", flights.options[optionIndex]);
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
  window.document.location.href = 'review.html';
}

function getTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString();
}

function formatDuration(legs) {
  var mins = legs.reduce(function (sum, current) {
    return sum + current.duration + current.connectionDuration;
  }, 0);

  var m = mins % 60;
  var h = (mins - m) / 60;
  return h.toString() + "hr " + (m < 10 ? "0" : "") + m.toString() + "min";
}

function getDiv(flightSlices, sliceReducer) {
  var html = flightSlices.reduce(function(div, flightSlice) {
    return div + '<span>' +sliceReducer(flightSlice) + '</span>';
  }, '<div class="flex-container">');
  return html + '</div>'
}

function updateFlights(flights) {
  var table = '<table><tr>' +
    '<th></th>' + // Airline logo
    '<th>Source</th>' +
    '<th>Destination</th>' +
    '<th>Departure Time</th>' +
    '<th>Arrival Time</th>' +
    '<th>Duration</th>' +
    '<th>Price</th>' +
    '<th>Select</th></tr>';

  flights.options.forEach(function (option, index) {
    var getFirstLeg = function (flightSlice) { return flightSlice.legs[0] };
    var getLastLeg = function (flightSlice) { return flightSlice.legs[flightSlice.legs.length - 1]};

    table += '<tr class="flight">' +
      '<td class="flightDtls">' +
      getDiv(option.flightSlices, function(slice) {
        var airline = slice.legs.reduce(function (prevAirline, flight){
          return (flight.carrier === prevAirline && prevAirline != null)
            ? 'Multiple'
            : flight.carrier;
        });

        // TODO use a map & airline to dynamically select logo
        return '<img src="images/airlines/AA.jpg" />';
      }) +
      '</td>' +
      '<td class="flightDtls">' +
          getDiv(option.flightSlices, function(slice) {
            return getFirstLeg(slice).origin
          }) +
      '</td>' +
      '<td class="flightDtls">' +
          getDiv(option.flightSlices, function(slice) {
            return getLastLeg(slice).destination
          }) +
      '</td>' +
      '<td class="flightDtls">' +
          getDiv(option.flightSlices, function(slice) {
            return getTime(getFirstLeg(slice).departureTime)
          }) +
      '</td>' +
      '<td class="flightDtls">' +
          getDiv(option.flightSlices, function(slice) {
            return getTime(getLastLeg(slice).arrivalTime)
          }) +
      '</td>' +
      '<td class="flightDtls">' +
          getDiv(option.flightSlices, function(slice) {
            return formatDuration(slice.legs)
          }) +
      '</td>';
    table += '<td class="flightDtls">' + option.totalSales.replace("USD".toUpperCase(),"$ ") + '</td>';
    table += '<td class="flightDtls"><input type="button" class="gridButton" value="select" onclick="selectFlight('+ index +')" /></td></tr>';
  });

  table+="</table>";
  $('#data2').append(table);
}

function queryFlights() {
  $.get("http://localhost:9000/flights", {
    origin: $('#source').val(),
    destination: $('#dest').val(),
    'departure-date': $('#datepicker1').val(),
    'arrival-date': $('#datepicker2').val(),
    'round-trip': $('#rb1')[0].checked,
    'adult-count': $('#adults').val(),
    'child-count': $('#children').val()
  }, function (data) {
    flights = JSON.parse(data);
    updateFlights(flights);
  });
}

$(document).ready(function() {
  $('#source').val(getUrlParam('to') || 'Source');
  $('#dest').val(getUrlParam('from') || 'Destination');
  $('#datepicker1').val(getUrlParam('depart'));
  $('#datepicker2').val(getUrlParam('arrive'));
  $('#rb1')[0].checked = getUrlParam('trip-type') !== 'one-way';
  $('#rb2')[0].checked = getUrlParam('trip-type') === 'one-way';
  $('#adults').val(getUrlParam('adults'));
  $('#children').val(getUrlParam('children'));

  $("#datepicker1, #datepicker2").datepicker();

  queryFlights();
});
