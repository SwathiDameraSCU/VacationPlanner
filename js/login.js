$("#modal_trigger").leanModal({top : 100, overlay : 0.6, closeButton: ".modal_close" });

	$(function(){
		// Calling Login Form
		$("#login_form").click(function(){
			$(".social_login").hide();
			$(".user_login").show();
			return false;
		});

		// Calling Register Form
		$("#register_form").click(function(){
			$(".social_login").hide();
			$(".user_register").show();
			$(".header_title").text('Register');
			return false;
		});

		// Going back to Social Forms
		$(".back_btn").click(function(){
			$(".user_login").hide();
			$(".user_register").hide();
			$(".social_login").show();
			$(".header_title").text('Login');
			return false;
		});

        // Click Handler for Login button
        $("#login-user").click(function(event){
            // Get the form fields
            event.preventDefault();
            var username = $(".user_login").find('#login-username').val().trim();
            var password = $(".user_login").find('#login-password').val();
             $.ajax({
                      url: "http://localhost:9000/users/" + username,
                      type: 'GET',
                      headers: {
                              'Content-Type':'application/json',
                              'Authorization':'password ' + password
                          },
                      contentType: "application/json; charset=utf-8",

                      dataType : 'json',
                      success: function(result) {
                      console.log(result);
                          // set the username value -  logged-username-value
                          var logged_username = result.firstname;
                          $("#logged-username-value").val("Hi! " + logged_username);
//                        localStorage.setItem("booking_id", result.booking_id);
//                        location.href = "confirmation.html";
                      },
                      error: function(result) {
                      console.log(result);
//                        localStorage.setItem("booking_id","");
//                        location.href = "confirmation.html";
                      }
                });
        });

		// Click Handler for Register button
	    $("#register-user").click(function(event){
	        // Get the form fields
	        event.preventDefault();
	        var first_name = $(".user_register").find('#first-name').val().trim();
            var first_name = $(".user_register").find('#middle-name').val();
            var first_name = $(".user_register").find('#last-name').val();
            var first_name = $(".user_register").find('#username').val();
            var first_name = $(".user_register").find('#password').val();
            var first_name = $(".user_register").find('#emailId').val();
            var first_name = $(".user_register").find('#phoneNumber').val();
            var middle_name = $(".user_register").find('#middle-name').val().trim();
            //if (middle_name == "")

            var text = '{"firstname":' + JSON.stringify($(".user_register").find('#first-name').val().trim()) + "," +
                        '"middlename":' + JSON.stringify($(".user_register").find('#middle-name').val().trim()) + "," +
                        '"lastname":' + JSON.stringify($(".user_register").find('#last-name').val().trim()) + "," +
                        '"username":' + JSON.stringify($(".user_register").find('#username').val().trim()) + "," +
                        '"password":' + JSON.stringify($(".user_register").find('#password').val().trim()) + "," +
                        '"emailId":' + JSON.stringify($(".user_register").find('#emailId').val().trim()) + "," +
                        '"phonenumber":' + JSON.stringify($(".user_register").find('#phoneNumber').val().trim()) +
                        '}';

            var obj = JSON.parse(text);
            var d = JSON.stringify(obj);
             $.ajax({
                      url: "http://localhost:9000/users",
                      type: 'POST',
                      data: d,
                      headers: {
                              'Content-Type':'application/json'
                          },
                      contentType: "application/json; charset=utf-8",

                      dataType : 'json',
                      success: function(result) {
//                        localStorage.setItem("booking_id", result.booking_id);
//                        location.href = "confirmation.html";
                      },
                      error: function(result) {
//                        localStorage.setItem("booking_id","");
//                        location.href = "confirmation.html";
                      }
                });
	    });

	})