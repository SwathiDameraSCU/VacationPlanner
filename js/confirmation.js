
$( window ).load(function() {
  if (typeof(Storage) !== "undefined") {
      var booking_id = localStorage.getItem("booking_id");
      if (booking_id == "") {
        $("#message-div").html("Your ticket was not booked.Please try again later");
      } else {
        $("#message-div").html("Your ticket has been booked successfully and your <b> booking id is " + booking_id + "</b>." + "<br> Confirmation email sent to <b>" + localStorage.getItem("emailId") + "</b>.");
      }
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }

});


 $("#goBackButton").click(function(event){
        event.preventDefault;
        /* If the user is logged in, it should remain the same */
        window.document.location.href = 'home.html';
 });
