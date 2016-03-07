
$(document).ready(function() {
     $("form").submit(function(event) {
        // Randomly validate the payment
        event.preventDefault();
        var value = ((Math.random() * 10) + 1);

        // If error, display error and do not call booking API

        // Else create JSON object and call API
        if (typeof(Storage) !== "undefined") {
            var fli = JSON.parse(localStorage.getItem("flightOption"));
        }
        var flightJSONData = {
            flights: [],
            passengers: [],
        };
        var data=fli.flightSlices.length; // to check whether it is roundtrip or One way
        for (var i=0; i<data; i++) {
            flightJSONData.flights.push(fli.flightSlices[i].legs[0]);
        }

        flightJSONData.passengers = localStorage.getItem("passengers");
        var contacts = JSON.parse(localStorage.getItem("contacts"));
        flightJSONData.emailId = localStorage.getItem("emailId");
        flightJSONData.phonenumber = localStorage.getItem("phonenumber");
        dataString = '{"flights": flightJSONData.flights,"passengers":JSON.parse(flightJSONData.passengers)}';

        var text = '{"flights":' + JSON.stringify(flightJSONData.flights) + "," +
                    '"passengers":' + flightJSONData.passengers + "," +
                    '"emailId":' + flightJSONData.emailId + "," +
                    '"phonenumber":' + flightJSONData.phonenumber  +
                    '}';

        var obj = JSON.parse(text);
        var d = JSON.stringify(obj);
        headerStr = "";
        if (localStorage.getItem("logged-user-id") == undefined) {
            headerStr = 'X-User-id:'+ localStorage.getItem("logged-user-id");
        }

         $.ajax({
                  url: "http://localhost:9000/bookings",
                  type: 'POST',
                  data: d,
                  headers: {
                           headerStr,
                          'Content-Type':'application/json'
                      },
                  contentType: "application/json; charset=utf-8",

                  dataType : 'json',
                  success: function(result) {
                    localStorage.setItem("booking_id", result.booking_id);
                    location.href = "confirmation.html";
                   // booking_id" : "56d7d64f91d5d493c193cbe0
                  },
                  error: function(result) {
                    localStorage.setItem("booking_id","");
                    location.href = "confirmation.html";
                  }
            });
      });
});