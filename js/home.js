var airports = {};

$(document).ready(function() {
  $('input[type=radio][name=trip-type]').change(function() {
    var returnPicker = $("#return-container");
    if (this.value == 'round-trip') {
      returnPicker.show();
    } else {
      returnPicker.hide();
    }
  });
  $(".datepicker").datepicker();

  $("form").submit(function(event) {
    // Validate form
    var to = $("#to").val();
    var from = $("#from").val();
    var departDate = $("#depart-input").val();
    var returnDate = $("#return-input").val();
    var roundTrip = $('input[name="trip-type"]').val() === 'round-trip';

    var error;

    if (to == null || to === "") {
      error = '"To" field is required';
    } else if (from == null || from === "") {
      error = '"From" field is required';
    } else if (departDate == null || departDate === "") {
      error = '"Departure Date" is required'
    } else if (roundTrip && (returnDate == null  || returnDate === "")) {
      error = '"Return Date is required';
    } else if (_.keys(airports).indexOf(to) == -1) {
      error = '"' + to + '" is not a valid airport identifier'
    } else if (_.keys(airports).indexOf(from) == -1) {
      error = '"' + from + '" is not a valid airport identifier'
    } else if (new Date(departDate) - Date.now() < 0) {
      error = 'Departure date "' + departDate + '" is in the past';
    } else if (roundTrip && (new Date(returnDate) - Date.now() < 0)) {
      error = 'Return date "' + returnDate + '" is in the past';
    } else if (roundTrip && new Date(returnDate) - new Date(departDate) < 0) {
      error = 'Return date must be after departure date';
    }

    if (error != null) {
      $("#error").html(error);
      event.preventDefault();
    }
  });
});

$.get("http://localhost:9000/airports", function (data) {
  console.log('done');
  airports = JSON.parse(data);
  $("#to, #from").autocomplete({
    source: _.map(airports, function(full, abbrev) {
      return {label: full + ' (' + abbrev + ')', value: abbrev};
    })
  });
});
