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
                      //success: function(result) {
                      success: function(result, textStatus, request){
                      console.log(result);
                      console.log(request);
                     /* _id: "sumanahariharan2"
                      emailId: "shariharan@scu.edu"
                      firstname: "Sumana"
                      gender: null
                      lastname: "Hariharan"
                      middlename: "test"
                      password: "1234"
                      phoneNumber: "5109363713"*/
                      // Check whether HTTP header is 200
                      // set the username value -  logged-username-value
                      if (request.status == 200) { // Username and password valid
                         // Store the username
                         localStorage.setItem("logged-user-id",result._id);
                         // Display the logged in username
                          var logged_username = result.firstname;
                          $("#logged-username-value").html("Hi! " + logged_username);
                          $("#logged-username-value").css("display","inline")
                          $("#li-logout").addClass("displayLoggedUser");
                          $("#login-li").css("display","none");
                          // Close the popup
                          $("#modal").css("display","none");
                      }
                      },
                      error: function(result, textStatus, request){
                      console.log(result);
                      console.log("inside error");
                      if (result.status == 404 ) {
                           // username and password did not match
                            $("#error-div").text(result.responseText);
                            $("#error-div").val(result.responseText);
                            $("#error-div").html(result.responseText);
                        }
                      }
                });
        });

		// Click Handler for Register button
	    $("#register-user").click(function(event){
	        // Get the form fields
	        event.preventDefault();
	        var first_name = $(".user_register").find('#first-name').val().trim();
            var user_name = $(".user_register").find('#username').val();

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
                      success: function(result, textStatus, request){
                       if (request.status == 201) { // NEW USER CREATED
                             localStorage.setItem("logged-user-id",user_name);
                             // Display the logged in username
                              $("#logged-username-value").text("Hi! " + first_name);
                              $("#logged-username-value").css("display","inline");
                              $("#li-logout").addClass("displayLoggedUser");
                              $("#login-li").css("display","none");
                              // Close the popup
                              $("#modal").css("display","none");
                        }
//                        location.href = "confirmation.html";
                      },
                      error: function(result) {
                        if (result.status == 400 ) {
                             // User already exists
                              $("#register-error").html("Username already exists");
                          }
                      }
                });
	    });

	    // Click Handler for Log out button
        $("#logout").click(function(event){
            event.preventDefault;
            // Clear the username in localstorage
            localStorage.removeItem("logged-user-id");
            // Hide the Welcome user message
            $("#logged-username-value").text("");
            $("#logged-username-value").css("display","none");
            // Hide Logout
            $("#li-logout").removeClass("displayLoggedUser");
            // Show login
            $("#login-li").css("display","inline");
            // Navigate to home.html
             window.document.location.href = 'home.html';
        });

	})