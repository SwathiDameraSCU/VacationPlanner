// TODO remove
var shouldLoadFlights = true;
var savedResponse = {"options":[{"totalSales":"USD326.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T12:50","arrivalTime":"2016-03-10T14:50","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":399}]},{"legs":[{"departureTime":"2016-03-10T16:20","arrivalTime":"2016-03-10T18:21","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":322}]}]},{"totalSales":"USD326.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:30","arrivalTime":"2016-03-10T08:30","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":321}]},{"legs":[{"departureTime":"2016-03-10T09:55","arrivalTime":"2016-03-10T11:59","duration":124,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":330}]}]},{"totalSales":"USD326.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T09:45","arrivalTime":"2016-03-10T11:49","duration":124,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":327}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T14:58","duration":123,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":326}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:30","arrivalTime":"2016-03-10T08:30","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":321}]},{"legs":[{"departureTime":"2016-03-10T16:20","arrivalTime":"2016-03-10T18:21","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":322}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:30","arrivalTime":"2016-03-10T08:30","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":321}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T14:58","duration":123,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":326}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T09:45","arrivalTime":"2016-03-10T11:49","duration":124,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":327}]},{"legs":[{"departureTime":"2016-03-10T20:55","arrivalTime":"2016-03-10T22:56","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":336}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T09:45","arrivalTime":"2016-03-10T11:49","duration":124,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":327}]},{"legs":[{"departureTime":"2016-03-10T16:20","arrivalTime":"2016-03-10T18:21","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":322}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:30","arrivalTime":"2016-03-10T08:30","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":321}]},{"legs":[{"departureTime":"2016-03-10T20:55","arrivalTime":"2016-03-10T22:56","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":336}]}]},{"totalSales":"USD332.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T12:50","arrivalTime":"2016-03-10T14:50","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":399}]},{"legs":[{"departureTime":"2016-03-10T20:55","arrivalTime":"2016-03-10T22:56","duration":121,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":336}]}]},{"totalSales":"USD336.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T12:50","arrivalTime":"2016-03-10T14:50","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":399}]},{"legs":[{"departureTime":"2016-03-10T18:20","arrivalTime":"2016-03-10T20:26","duration":126,"destination":"SJC","origin":"SEA","connectionDuration":0,"carrier":"AS","number":328}]}]},{"totalSales":"USD936.72","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:30","arrivalTime":"2016-03-10T08:30","duration":120,"destination":"SEA","origin":"SJC","connectionDuration":0,"carrier":"AS","number":321}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T13:50","duration":55,"destination":"YVR","origin":"SEA","connectionDuration":130,"carrier":"UA","number":8244},{"departureTime":"2016-03-10T16:00","arrivalTime":"2016-03-10T18:47","duration":167,"destination":"LAX","origin":"YVR","connectionDuration":173,"carrier":"WS","number":1698},{"departureTime":"2016-03-10T21:40","arrivalTime":"2016-03-10T22:56","duration":76,"destination":"SJC","origin":"LAX","connectionDuration":0,"carrier":"WS","number":5570}]}]},{"totalSales":"USD965.12","flightSlices":[{"legs":[{"departureTime":"2016-03-10T07:35","arrivalTime":"2016-03-10T08:34","duration":59,"destination":"RNO","origin":"SJC","connectionDuration":0,"carrier":"AS","number":2250},{"departureTime":"2016-03-10T09:05","arrivalTime":"2016-03-10T11:13","duration":128,"destination":"SEA","origin":"RNO","connectionDuration":0,"carrier":"AS","number":2250}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T13:50","duration":55,"destination":"YVR","origin":"SEA","connectionDuration":130,"carrier":"UA","number":8244},{"departureTime":"2016-03-10T16:00","arrivalTime":"2016-03-10T18:47","duration":167,"destination":"LAX","origin":"YVR","connectionDuration":173,"carrier":"WS","number":1698},{"departureTime":"2016-03-10T21:40","arrivalTime":"2016-03-10T22:56","duration":76,"destination":"SJC","origin":"LAX","connectionDuration":0,"carrier":"WS","number":5570}]}]},{"totalSales":"USD969.62","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:35","arrivalTime":"2016-03-10T08:19","duration":104,"destination":"PDX","origin":"SJC","connectionDuration":71,"carrier":"AS","number":405},{"departureTime":"2016-03-10T09:30","arrivalTime":"2016-03-10T10:20","duration":50,"destination":"SEA","origin":"PDX","connectionDuration":0,"carrier":"AS","number":2172}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T13:50","duration":55,"destination":"YVR","origin":"SEA","connectionDuration":130,"carrier":"UA","number":8244},{"departureTime":"2016-03-10T16:00","arrivalTime":"2016-03-10T18:47","duration":167,"destination":"LAX","origin":"YVR","connectionDuration":173,"carrier":"WS","number":1698},{"departureTime":"2016-03-10T21:40","arrivalTime":"2016-03-10T22:56","duration":76,"destination":"SJC","origin":"LAX","connectionDuration":0,"carrier":"WS","number":5570}]}]},{"totalSales":"USD969.62","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:35","arrivalTime":"2016-03-10T08:19","duration":104,"destination":"PDX","origin":"SJC","connectionDuration":101,"carrier":"AS","number":405},{"departureTime":"2016-03-10T10:00","arrivalTime":"2016-03-10T10:50","duration":50,"destination":"SEA","origin":"PDX","connectionDuration":0,"carrier":"AS","number":2038}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T13:50","duration":55,"destination":"YVR","origin":"SEA","connectionDuration":130,"carrier":"UA","number":8244},{"departureTime":"2016-03-10T16:00","arrivalTime":"2016-03-10T18:47","duration":167,"destination":"LAX","origin":"YVR","connectionDuration":173,"carrier":"WS","number":1698},{"departureTime":"2016-03-10T21:40","arrivalTime":"2016-03-10T22:56","duration":76,"destination":"SJC","origin":"LAX","connectionDuration":0,"carrier":"WS","number":5570}]}]},{"totalSales":"USD969.62","flightSlices":[{"legs":[{"departureTime":"2016-03-10T06:35","arrivalTime":"2016-03-10T08:19","duration":104,"destination":"PDX","origin":"SJC","connectionDuration":41,"carrier":"AS","number":405},{"departureTime":"2016-03-10T09:00","arrivalTime":"2016-03-10T09:50","duration":50,"destination":"SEA","origin":"PDX","connectionDuration":0,"carrier":"AS","number":2154}]},{"legs":[{"departureTime":"2016-03-10T12:55","arrivalTime":"2016-03-10T13:50","duration":55,"destination":"YVR","origin":"SEA","connectionDuration":130,"carrier":"UA","number":8244},{"departureTime":"2016-03-10T16:00","arrivalTime":"2016-03-10T18:47","duration":167,"destination":"LAX","origin":"YVR","connectionDuration":173,"carrier":"WS","number":1698},{"departureTime":"2016-03-10T21:40","arrivalTime":"2016-03-10T22:56","duration":76,"destination":"SJC","origin":"LAX","connectionDuration":0,"carrier":"WS","number":5570}]}]},{"totalSales":"USD1493.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T10:10","arrivalTime":"2016-03-10T13:47","duration":157,"destination":"DEN","origin":"SJC","connectionDuration":112,"carrier":"UA","number":5870},{"departureTime":"2016-03-10T15:39","arrivalTime":"2016-03-10T17:34","duration":175,"destination":"SEA","origin":"DEN","connectionDuration":0,"carrier":"UA","number":948}]},{"legs":[{"departureTime":"2016-03-10T23:21","arrivalTime":"2016-03-11T05:42","duration":261,"destination":"IAH","origin":"SEA","connectionDuration":220,"carrier":"UA","number":1696},{"departureTime":"2016-03-11T09:22","arrivalTime":"2016-03-11T11:42","duration":260,"destination":"SJC","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1957}]}]},{"totalSales":"USD1493.20","flightSlices":[{"legs":[{"departureTime":"2016-03-10T08:07","arrivalTime":"2016-03-10T11:42","duration":155,"destination":"DEN","origin":"SJC","connectionDuration":237,"carrier":"UA","number":247},{"departureTime":"2016-03-10T15:39","arrivalTime":"2016-03-10T17:34","duration":175,"destination":"SEA","origin":"DEN","connectionDuration":0,"carrier":"UA","number":948}]},{"legs":[{"departureTime":"2016-03-10T23:21","arrivalTime":"2016-03-11T05:42","duration":261,"destination":"IAH","origin":"SEA","connectionDuration":220,"carrier":"UA","number":1696},{"departureTime":"2016-03-11T09:22","arrivalTime":"2016-03-11T11:42","duration":260,"destination":"SJC","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1957}]}]},{"totalSales":"USD1635.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T10:10","arrivalTime":"2016-03-10T13:47","duration":157,"destination":"DEN","origin":"SJC","connectionDuration":33,"carrier":"UA","number":5870},{"departureTime":"2016-03-10T14:20","arrivalTime":"2016-03-10T16:03","duration":163,"destination":"SFO","origin":"DEN","connectionDuration":0,"carrier":"UA","number":733},{"departureTime":"2016-03-10T19:57","arrivalTime":"2016-03-10T22:08","duration":131,"destination":"SEA","origin":"SFO","connectionDuration":0,"carrier":"UA","number":733}]},{"legs":[{"departureTime":"2016-03-10T23:21","arrivalTime":"2016-03-11T05:42","duration":261,"destination":"IAH","origin":"SEA","connectionDuration":220,"carrier":"UA","number":1696},{"departureTime":"2016-03-11T09:22","arrivalTime":"2016-03-11T11:42","duration":260,"destination":"SJC","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1957}]}]},{"totalSales":"USD1741.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T14:50","arrivalTime":"2016-03-10T18:27","duration":157,"destination":"DEN","origin":"SJC","connectionDuration":38,"carrier":"UA","number":5726},{"departureTime":"2016-03-10T19:05","arrivalTime":"2016-03-10T20:59","duration":174,"destination":"SEA","origin":"DEN","connectionDuration":0,"carrier":"UA","number":407}]},{"legs":[{"departureTime":"2016-03-10T23:21","arrivalTime":"2016-03-11T05:42","duration":261,"destination":"IAH","origin":"SEA","connectionDuration":220,"carrier":"UA","number":1696},{"departureTime":"2016-03-11T09:22","arrivalTime":"2016-03-11T11:42","duration":260,"destination":"SJC","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1957}]}]},{"totalSales":"USD2088.60","flightSlices":[{"legs":[{"departureTime":"2016-03-10T12:40","arrivalTime":"2016-03-10T18:28","duration":228,"destination":"IAH","origin":"SJC","connectionDuration":57,"carrier":"UA","number":1851},{"departureTime":"2016-03-10T19:25","arrivalTime":"2016-03-10T22:16","duration":291,"destination":"SEA","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1977}]},{"legs":[{"departureTime":"2016-03-10T23:21","arrivalTime":"2016-03-11T05:42","duration":261,"destination":"IAH","origin":"SEA","connectionDuration":220,"carrier":"UA","number":1696},{"departureTime":"2016-03-11T09:22","arrivalTime":"2016-03-11T11:42","duration":260,"destination":"SJC","origin":"IAH","connectionDuration":0,"carrier":"UA","number":1957}]}]}]};

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

function onError(message) {
  $("#error").html(message || 'No flights could be found with the requested parameters');
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
    table += '<td class="flightDtls"><input type="button" class="gridButton" value="select" onclick="selectFlight('+ index +')" /></td></tr>';
  });

  table+="</table>";
  $('#loading').hide();
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
  $('#data').hide();
  if (shouldLoadFlights) {
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
  } else {
    setTimeout(function () {
      flights = savedResponse;
      updateFlights(flights)
    }, 2000)
  }
}

$(document).ready(function() {
  $( "#loading" ).progressbar({
    value: false
  });

  $('#source').val(getUrlParam('to') || 'Source');
  $('#dest').val(getUrlParam('from') || 'Destination');
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