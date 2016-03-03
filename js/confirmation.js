
$( window ).load(function() {
  if (typeof(Storage) !== "undefined") {
      var booking_id = localStorage.getItem("booking_id");
      if (booking_id == "") {
        $("#message-div").html("Your ticket was not booked.Please try agains");
      } else {
        $("#message-div").html("Your ticket has been booked successfully and your <b> booking id is " + booking_id + "</b>");
      }

    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }

});