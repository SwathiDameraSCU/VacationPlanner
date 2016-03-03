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

    var error = validateFlightForm(to, from, departDate, returnDate, roundTrip, airports);

    if (error != null) {
      $("#error").html(error);
      event.preventDefault();
    }
  });

  autoCompleteAirportInfo("#to, #from", airports)
});

loadAirports(function (airportData) {
  airports = airportData;
  autoCompleteAirportInfo("#to, #from", airports)
});
