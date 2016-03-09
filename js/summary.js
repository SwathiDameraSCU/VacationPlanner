
function showOnToggle(i){
	$('#showOntoggleTraveller_'+i).toggle('slow');
}

function getTravellerInfo(){

	// prev changes
	//var adults =0;
	//var children =0;
	var adultPrice = 0;
	var childrenPrice = 0;
	var adultTax = 0;
	var childrenTax = 0;
	var totalPrice = 0;
	var tripTotal = 0;

	if (typeof(Storage) !== "undefined") {
		 adults = parseInt(localStorage.getItem("adults"));
	     children = parseInt(localStorage.getItem("children"));
	     fli = JSON.parse(localStorage.getItem("flightOption"));
		 price = fli.totalSales;
	}

	totalPassengers = adults +children;

	// latest code
	//priceForCal = parseFloat(price.replace("USD".toUpperCase(),""));
	// currency changes by Swathi
	priceForCal = parseFloat(price.replace ( /^\D+/g, ''));
	curr =  price.replace(/[^a-zA-Z]+/g, '');
	$('#bookingFee').append(curr+' 0.00');

	taxInfo = parseFloat(((priceForCal*18)/100).toFixed(2));
	passengerCharge	= priceForCal-taxInfo;
	taxInfoPerPerson = parseFloat((taxInfo/totalPassengers).toFixed(2));
	passengerPerPersonCharge	= parseFloat((passengerCharge/totalPassengers).toFixed(2));;
	totalPricePerPassgnr = parseFloat((priceForCal/totalPassengers).toFixed(2));

	document.getElementById('numberOfTickets').innerHTML=" <strong>"+totalPassengers+" Ticket(s):  </strong>";

			for(var i=1;i<=totalPassengers;i++){
				for(var i=1;i<=adults;i++){
					$('.ulStyleTr').append("<li class='toggleClass'><a id='toggle' class='styleAnch' onclick='showOnToggle("+i+")'> Traveller "+i+":<span id='passengerType'> Adult </span><span id='passengerPrice' class='floatRight'> "+displZeroForDecimal(totalPricePerPassgnr)+" </span> </a></li><div id='showOntoggleTraveller_"+i+"'><ul class='ulStyleTrCl'><li> <span> Flights </span><span id='flightamount' class='floatRight'> "+displZeroForDecimal(passengerPerPersonCharge)+" </span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'> "+displZeroForDecimal(taxInfoPerPerson)+" </span></li></ul></div>");
				}
				for(var i=adults+1;i<=totalPassengers;i++){
					$('.ulStyleTr').append("<li class='toggleClass'><a id='toggle' class='styleAnch' onclick='showOnToggle("+i+")'> Traveller "+i+":<span id='passengerType'> Child </span><span id='passengerPrice' class='floatRight'> "+displZeroForDecimal(totalPricePerPassgnr)+" </span> </a></li><div id='showOntoggleTraveller_"+i+"'><ul class='ulStyleTrCl'><li> <span> Flights </span><span id='flightamount' class='floatRight'> "+displZeroForDecimal(passengerPerPersonCharge)+" </span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'> "+displZeroForDecimal(taxInfoPerPerson)+" </span></li></ul></div>");
				}
			}
		document.getElementById('displayPrice').innerHTML = displZeroForDecimal(priceForCal);

		for(var i=1;i<=totalPassengers;i++){
        		$('#showOntoggleTraveller_'+i).hide();
        	}

	}


//logic to display zero
function displZeroForDecimal(num){
	 
	var number = num.toString();
	var numSplit = number.split(".");
	var decimalValue;
	if(numSplit.length==2){
		if(numSplit[1].length==1){
			decimalValue = numSplit[1]+"0";
			number = numSplit[0]+'.'+decimalValue;
		}else{
			number = num;
		}	
	}else{
			number = num+".00";
	}
	return curr+" "+number;
}
