var airports = {};
var flights = {};
var currentParams = {};

var airlines = {
  'AS': 'alaska.jpg',
  'UA': 'united.jpg',
  'B6': 'jet_blue.jpg',
  'AA': 'AA.jpg',
  'DL': 'delta.jpg'
};

var default_airline = 'default.png';

function getUrlParam(name) {
  var regex = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"), results = regex.exec(window.location.href);
  if (results == null || results[2] == null) {
    return null;
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function selectFlight(optionIndex) {
  if (Storage != null) {
    localStorage.setItem("flightOption", JSON.stringify(flights.options[optionIndex]));
    localStorage.setItem("adults", currentParams.adults);
    localStorage.setItem("children", currentParams.children);
    localStorage.setItem("roundTrip", currentParams.roundTrip);
    localStorage.setItem("departureDate", currentParams.departureDate);
    localStorage.setItem("returnDate", currentParams.returnDate);
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
  window.document.location.href = 'review.html';
}

function getTime(dateTime) {
  return moment(new Date(dateTime)).format('h:mm a')
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

function onError(message) {
  $("#error").html(message || 'An internal error occured. Please try again.');
  $('#loading, #selectFlight').hide();
  $('#data').html("");
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
    '<th></th>' + // Select Button
    '</tr>';

  flights.options.forEach(function (option, index) {
    var getFirstLeg = function (flightSlice) { return flightSlice.legs[0] };
    var getLastLeg = function (flightSlice) { return flightSlice.legs[flightSlice.legs.length - 1]};

    table += '<tr class="flight">' +
      '<td class="flightDtls">' +
      getDiv(option.flightSlices, function(slice) {
        var airline = slice.legs.reduce(function (prevAirline, flight) {
          return (prevAirline == null || flight.carrier === prevAirline)
            ? flight.carrier
            : 'Multiple';
        }, null);

        var airlineLogo = (airlines[airline] == null) ? default_airline : airlines[airline];

        return '<img src="images/airlines/' + airlineLogo + '" />';
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
    table += '<td class="flightDtls"><input type="button" class="flat-button" value="select" onclick="selectFlight('+ index +')" /></td></tr>';
  });

  table+="</table>";
  $('#loading').hide();
  $('#selectFlight').show();
  var data = $('#data');
  data.html(table);
  data.show();
}

function queryFlights() {
    var origin = $('#source').val();
    var destination = $('#dest').val();
    var departureDate = $('#datepicker1').val();
    var arrivalDate = $('#datepicker2').val();
    var roundTrip = $('#rb1')[0].checked;
    var adults = $('#adults').val();
    var children= $('#children').val();


  var error = validateFlightForm(origin, destination, departureDate, arrivalDate, roundTrip, airports);
  if (error != null) {
    onError(error);
    return;
  } else {
    $("#error").html('');
  }

  currentParams = {
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    returnDate: arrivalDate,
    roundTrip: roundTrip,
    adults: adults,
    children: children
  };

  $('#loading').show();
  $('#selectFlight').hide();
  $('#data').hide();
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
  }).fail(function() { onError() });
}

$(document).ready(function() {
  $( "#loading" ).progressbar({
    value: false
  });

  $('#source').val(getUrlParam('from') || 'Source');
  $('#dest').val(getUrlParam('to') || 'Destination');
  $('#datepicker1').val(getUrlParam('depart'));
  $('#datepicker2').val(getUrlParam('arrive'));
  $('#rb1')[0].checked = getUrlParam('trip-type') !== 'one-way';
  $('#rb2')[0].checked = getUrlParam('trip-type') === 'one-way';
  $('#adults').val(getUrlParam('adults') || 1);
  $('#children').val(getUrlParam('children') || 0);

  $("#datepicker1, #datepicker2").datepicker({minDate: 0});

  var returnPicker = $("#datepicker2");
  if (getUrlParam('trip-type') !== 'one-way') {
    returnPicker.show();
  } else {
    returnPicker.hide();
  }

  $('input[type=radio][name=rb]').change(function() {
    var returnPicker = $("#datepicker2");
    if (this.value === 'round-trip') {
      returnPicker.show();
    } else {
      returnPicker.hide();
    }
  });



  queryFlights();
  autoCompleteAirportInfo("#source, #dest", airports)
});

loadAirports(function (err, airportData) {
  if (err) alert(err);
  airports = airportData;
  autoCompleteAirportInfo("#source, #dest", airports)
});
