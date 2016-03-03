window.onload = function() {
  createTravellersForm();
  //yourFunction(param1, param2);
};
var submitButton = document.getElementById("submit-info");
var monthDaysMapping = {
    'Jan': 31,
    'Feb': 28,
    'Mar': 31,
    'Apr': 30,
    'May': 31,
    'Jun': 30,
    'July': 31,
    'Aug': 31,
    'Sep': 30,
    'Oct': 31,
    'Nov': 30,
    'Dec': 31
}
var monthIndexMapping = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'July': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
}
function createTravellersForm() {
    /* Get the number of Travellers - Adults and children from localstorage */
    var noAdults = parseInt(localStorage.getItem("adults"));
    var noChildren = parseInt(localStorage.getItem("children"));
    var totalNo = noAdults + noChildren;
    var i;
    /*var f = document.createElement("form");
    f.setAttribute("id","personal-form");
    f.setAttribute('method',"post");*/

    for (i=1; i<=totalNo; i++) {
        var f = document.createElement("div");
        f.setAttribute('class',"personal-div");
        var heading = document.createElement("h4");
        if( i == 1) {
            // set it as primary contact
            heading.textContent = "Traveller " + i + ": Adult Primary contact";
            // Phone number with country code

        } else  if(i > noAdults) {
            heading.textContent = "Traveller " + i + ": Child" ;
        } else {
            heading.textContent = "Traveller " + i + ": Adult" ;
        }

        // Div for Name container
        var nameDiv = document.createElement("div");
        nameDiv.setAttribute("class","personal-name-container");
        // Div for first Name
        var firstNameDiv = document.createElement("div");
        firstNameDiv.setAttribute("class","first-name-container");
        // Label
        var firstNameLbl = document.createElement("label"); //input element, text
        firstNameLbl.setAttribute('for',"firstName");
        firstNameLbl.innerHTML = "First Name";

        // First Name
        var firstName = document.createElement("input"); //input element, text
        firstName.setAttribute('type',"text");
        firstName.setAttribute('name',"firstName");
        firstName.setAttribute('class',"firstName");
//$('#firstName').prop('required',true);
        //firstName.setAttribute("required","");
        //firstName.required = true;

        firstNameDiv.appendChild(firstNameLbl);
        firstNameDiv.appendChild(firstName);

        // Div for first Name
        var middleNameDiv = document.createElement("div");
        middleNameDiv.setAttribute("class","middle-name-container");
        // Label
        var middleNameLbl = document.createElement("label"); //input element, text
        middleNameLbl.setAttribute('for',"middleName");
        middleNameLbl.innerHTML = "Middle Name";

        // Middle Name
        var middleName = document.createElement("input"); //input element, text
        middleName.setAttribute('type',"text");
        middleName.setAttribute('name',"middleName");
        middleName.setAttribute('class',"middleName");

        middleNameDiv.appendChild(middleNameLbl);
        middleNameDiv.appendChild(middleName);

         // Div for first Name
        var lastNameDiv = document.createElement("div");
        lastNameDiv.setAttribute("class","last-name-container");

        // Label
        var lastNameLbl = document.createElement("label"); //input element, text
        lastNameLbl.setAttribute('for',"lastName");
        lastNameLbl.innerHTML = "Last Name";
        // Last Name
        var lastName = document.createElement("input"); //input element, text
        lastName.setAttribute('type',"text");
        lastName.setAttribute('name',"lastName");
        lastName.setAttribute('class',"lastName");

        lastNameDiv.appendChild(lastNameLbl);
        lastNameDiv.appendChild(lastName);

        // Gender - Male, Female
        // Div for Gender label
        var genderDiv = document.createElement("div");
        genderDiv.setAttribute("class","personal-gender-container");
        // Label
        var genderLbl = document.createElement("label"); //input element, text
        genderLbl.innerHTML = "Gender";

        genderDiv.appendChild(genderLbl);

        // Radio button div
        var genderRadioDiv = document.createElement("div");
        genderRadioDiv.setAttribute("class","gender-div");
         // Male Radio Button
        var maleRadio = document.createElement("input"); //input element, text
        maleRadio.setAttribute('type',"radio");
        maleRadio.setAttribute('name',"gender"+i);
        maleRadio.setAttribute('class',"gender");
        maleRadio.setAttribute('value',"male");
         // Label
        var maleNameLbl = document.createElement("label"); //input element, text
        maleNameLbl.setAttribute('for',"maleRadio");
        maleNameLbl.innerHTML = "Male";

        // Female Radio Button
        var femaleRadio = document.createElement("input"); //input element, text
        femaleRadio.setAttribute('type',"radio");
        femaleRadio.setAttribute('name',"gender"+i);
        femaleRadio.setAttribute('class',"gender");
        femaleRadio.setAttribute('value',"female");

         // Label
        var femaleNameLbl = document.createElement("label"); //input element, text
        femaleNameLbl.setAttribute('for',"femaleRadio");
        femaleNameLbl.innerHTML = "Female";

        genderRadioDiv.appendChild(maleRadio);
        genderRadioDiv.appendChild(maleNameLbl);
        genderRadioDiv.appendChild(femaleRadio);
        genderRadioDiv.appendChild(femaleNameLbl);
        genderDiv.appendChild(genderRadioDiv);
        // Date of birth - Month ,Day, Year
        var dobDiv = document.createElement("div");
        dobDiv.setAttribute("id","dobDiv");

        // Label
        var dobLbl = document.createElement("label"); //input element, text
        dobLbl.innerHTML = "Date of Birth";

        dobDiv.appendChild(dobLbl);

        //Create array of options to be added
        var monthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
        // Div for Gender label

        //Create and append select list
        var monthSelect = document.createElement("select");
        monthSelect.setAttribute("class","monthSelect");
        dobDiv.appendChild(monthSelect);

        var daySelect = document.createElement("select");
        daySelect.setAttribute("class","daySelect");
        dobDiv.appendChild(daySelect);

        var yearSelect = document.createElement("select");
        yearSelect.setAttribute("class","yearSelect");
        dobDiv.appendChild(yearSelect);
        //Create and append the options
        for (var m = 0; m < monthArray.length; m++) {
            var option = document.createElement("option");
            option.value = monthArray[m];
            option.text = monthArray[m];
            monthSelect.appendChild(option);
        }
        noOfDays = getDaysForMonth(monthSelect.options[monthSelect.selectedIndex].value);
        for (var no = 1; no <= noOfDays; no++) {
            var option = document.createElement("option");
            option.value = no;
            option.text = no;
            daySelect.appendChild(option);
        }
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        for (var cy = currentYear; cy > (currentYear-100) ; cy--) {
            var option = document.createElement("option");
            option.value = cy;
            option.text = cy;
            yearSelect.appendChild(option);
        }

        f.appendChild(heading);
        nameDiv.appendChild(firstNameDiv);
        nameDiv.appendChild(middleNameDiv);
        nameDiv.appendChild(lastNameDiv);
        f.appendChild(nameDiv);
        f.appendChild(genderDiv);
        f.appendChild(dobDiv);

        // Only for first one create email and phone number
        if (i == 1 ) {
             // Div for Email address
            var emailDiv = document.createElement("div");
            emailDiv.setAttribute("class","email-container");
            // Label
            var emailLbl = document.createElement("label"); //input element, text
            emailLbl.setAttribute('for',"email");
            emailLbl.innerHTML = "E-mail";

            // First Name
            var email = document.createElement("input"); //input element, text
            email.setAttribute('type',"email");
            email.setAttribute('name',"email");
            email.setAttribute('class',"email");

            emailDiv.appendChild(emailLbl);
            emailDiv.appendChild(email);
            f.appendChild(emailDiv);

            // Div for Mobile number
            var phoneDiv = document.createElement("div");
            phoneDiv.setAttribute("class","mobile-container");
            // Label
            var phoneLbl = document.createElement("label"); //input element, text
            phoneLbl.setAttribute('for',"phone");
            phoneLbl.innerHTML = "Phone Number";

            // First Name
            var phone = document.createElement("input"); //input element, text
            phone.setAttribute('type',"tel");
            phone.setAttribute('name',"tel");
            phone.setAttribute('class',"tel");

            phoneDiv.appendChild(phoneLbl);
            phoneDiv.appendChild(phone);
            f.appendChild(phoneDiv);
        }

        document.getElementById('payment-form').appendChild(f);
    }
    //document.getElementById('payment-form').appendChild(f);
//    if (i == totalNo) {
//        //$("input").prop('required',true);
//        $(".firstName").prop('required',true);
//        $(".lastName").prop('required',true);
//    }

}
$(document).ready(function() {
    //document.getElementById("firstName").required = true;
    //$("firstName").prop('required',true);
});

$( window ).load(function() {
  // Run code
  console.log("inside load");
  //$("input").prop('required',true);
   $(".firstName").prop('required',true);
   $(".lastName").prop('required',true);
   $(".gender").prop('required',true);


});
function getDaysForMonth(selectedMonth) {
    return monthDaysMapping[selectedMonth];
}
function changeNoOfDays(selectedMonth) {
    for (var i = 1; i < 32; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        daySelect.appendChild(option);
    }

}

// Event listener for Form submit button
	$("#submit-info").click(function(event){
	event.preventDefault();
	// when the button is clicked
        var j=1;
        var data = {
            passengers: [],
            contacts: []
        };

		$.each($(".personal-div"),function(i,e){
            // TO DO - Trim it
            var genderName = "gender" + j;
            console.log("genderName" + genderName);
            var selectedMonth = monthIndexMapping[$(this).find('.monthSelect').val()];
            selectedDay = $(this).find('.daySelect').val();
            selectedYear = $(this).find('.yearSelect').val();
            var selectedFullDate = selectedMonth + "/" + selectedDay + "/" + selectedYear;
            data.passengers.push({"firstname":$(this).find('.firstName')[0].value,
                             "middlename": $(this).find('.middleName')[0].value,
                             "lastname": $(this).find('.lastName')[0].value,
                             "gender": $("input[name="+genderName+"]:checked").val(),
                             "dob": selectedFullDate
                             });
            j++;
		});
        data.contacts.push({"emailId":$(".personal-div").find('.email')[0].value,
         "phonenumber":$(".personal-div").find('.tel')[0].value});

		console.log(JSON.stringify(data.passengers));
		console.log(JSON.stringify(data.contacts));
        event.preventDefault();
		// If no error then pass the JSON in post method to payment.html
		// Store in local storage
		//$.post( "payment.html", skusAsJSON);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("passengers", JSON.stringify(data.passengers));
            localStorage.setItem("contacts", JSON.stringify(data.contacts));
            localStorage.setItem("emailId", JSON.stringify($(".personal-div").find('.email')[0].value));
            localStorage.setItem("phonenumber", JSON.stringify($(".personal-div").find('.tel')[0].value));
          } else {
            alert("Sorry, your browser does not support Web Storage...");
          }
          window.document.location.href = 'payment.html';
	});
