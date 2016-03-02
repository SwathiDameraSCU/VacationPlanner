var fli;
var price =0;

function setValues(){ 
	$("#showOntoggle1").hide();
	$("#showOntoggle2").hide();
	$("#showOntoggle3").hide();
	$("#showOntoggle4").hide();
	$("#showOntoggle5").hide();
	$("#div2").hide();
	
}

function nextPage(){
	window.document.location.href = 'personal-info.html';
}

function showOnToggle1(){
	$("#showOntoggle1").toggle('slow');
}
function showOnToggle2(){
	$("#showOntoggle2").toggle('slow');
}
function showOnToggle3(){
	$("#showOntoggle3").toggle('slow');
}
function showOnToggle4(){
	$("#showOntoggle4").toggle('slow');
}
function showOnToggle5(){
	$("#showOntoggle5").toggle('slow');
}


function showBagToggle1(){
	$("#showBagToggle1").toggle('slow');
}
function showBagToggle0(){
	$("#showBagToggle0").toggle('slow');
}


function getTravellerInfo(){
	var adults =0;
	var children =0;
	var adultPrice = 0;
	var childrenPrice = 0;
	var adultTax = 0;
	var childrenTax = 0;
	var totalPrice = 0;
	var tripTotal = 0;

	if (typeof(Storage) !== "undefined") {
		 adults = parseInt(localStorage.getItem("adults"));
	     children = parseInt(localStorage.getItem("children"));
		 price = fli.totalSales;
	}
	totalPrice = parseFloat(price.replace("USD".toUpperCase(),""));
	adultPrice = parseFloat((totalPrice).toFixed(2));
	childrenPrice = parseFloat((totalPrice/2).toFixed(2));
	adultTax = parseFloat(((adultPrice*18)/100).toFixed(2));
	childrenTax =parseFloat(((childrenPrice*18)/100).toFixed(2));

	var totalPassengers = adults +children;

	document.getElementById('numberOfTickets').innerHTML=" <strong>"+totalPassengers+" Ticket(s):  </strong>";
	
	if(totalPassengers < 6){
			for(var i=1;i<=adults;i++){
				$('.ulStyleTr').append("<li><a id='toggle' onclick='showOnToggle"+i+"()' class='styleAnch'> Traveller "+i+":<span id='passengerType'> Adult </span><span id='passengerPrice' class='floatRight'> "+(parseFloat(adultPrice)+parseFloat(adultTax)).toFixed(2)+" </span> </a></li><div id='showOntoggle"+i+"'><ul class='ulStyleTrCl'><li> <span> Flights </span><span id='flightamount' class='floatRight'> "+adultPrice+" </span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'> "+adultTax+" </span></li></ul></div>");
			}
			for(var i=adults+1;i<=totalPassengers;i++){
				$('.ulStyleTr').append("<li><a id='toggle' onclick='showOnToggle"+i+"()' class='styleAnch'> Traveller "+i+":<span id='passengerType'> Child </span><span id='passengerPrice' class='floatRight'> "+(parseFloat(childrenPrice)+parseFloat(childrenTax)).toFixed(2)+" </span> </a></li><div id='showOntoggle"+i+"'><ul class='ulStyleTrCl'><li> <span> Flights </span><span id='flightamount' class='floatRight'> "+childrenPrice+" </span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'> "+childrenTax+" </span></li></ul></div>");
			}
	}else{
		alert("not more than 5 passengers in one session");
	}

		tripTotal =(((adultPrice+adultTax)*adults)+((childrenPrice+childrenTax)*children));
		document.getElementById('displayPrice').innerHTML = "$"+tripTotal;
	}


   if (typeof(Storage) !== "undefined") {
		 fli = JSON.parse(localStorage.getItem("flightOption"));
	}

function onLoad(){

 var data=fli.flightSlices.length; // to check whether it is roundtrip or One way
 var fromDate = '02/29/2016';//get dates from local storage of flights.html
 var toDate = '03/01/2016';

	for(var i=0;i<data;i++){
		getFlightInfo(i);
	}

	 if(data==2){
		$('#roundOrOneLabel').append("Round Trip");
		document.getElementById("depatureDateFormat0").innerHTML=getDateFormat(fromDate); 
		document.getElementById("depatureDateFormat1").innerHTML=getDateFormat(toDate);
	 } else if(data==1){
		$("#roundOrOneLabel").append("One Way");
		document.getElementById('depatureDateFormat0').innerHTML=getDateFormat(fromDate);
	 } else{
		$("#roundOrOneLabel").append("No value set");
	 }

    $("#showBagToggle1").hide();
	$("#showBagToggle0").hide();

}

function getFlightInfo(value){

	//$('.ulStyle').append("<li><div class='borderTop'></div> <span class='separator'></span></li>");
	
	for(var i=value;i<=value;i++){
			var opt=fli.flightSlices[i]; // each and every flight Slice
			var len=opt.legs.length;
			var totalTime=1; // duration display - by summing the each slice duration
			var stops='';
			for(var k=0;k<len;k++){ 
				totalTime +=opt.legs[k].duration;
			}
			for(var a=0;a<len-1;a++){ // to determine the stops  
				stops +=opt.legs[a].destination+',';
			}
			price = fli.totalSales;
			
		$('.ulStyle').append("<li><div></div> <span class='separator'></span></li>"); 
		$('.ulStyle').append("<li><article class='articleStyle'><div class='firstDiv'><div class='depDate'><h3 id='departureDate'><p id='depatureDateFormat"+i+"'> Sat, Feb 28</p> </h3></div><div class='fromToDiv'><div class='fromToLabels'><span class='fromClass'> From </span><span class='styleFromToText'> "+opt.legs[0].origin+" </span></div><div class='fromToLabels'> <span class='toClass'> To&nbsp&nbsp </span><span class='styleFromToText'> "+opt.legs[len-1].destination+" </span></div></div>  	<div class='imageDiv'><div><img src=\"images/airlines/AA.jpg\" alt='United'> </div></div>                <div class='flightDetails'><div class='deptDetails'><div class='deptArrDurStyle' id='departtime'> "+getTime(opt.legs[0].departureTime)+"</div><div class='orgDestVia' id='departArpt'> "+opt.legs[0].origin+" </div></div><div class='toImageStyle' id='arrowImg'><span><img src=\"images/arrow.png\" alt='United'></span></div><div class='arrDetails'><div class='deptArrDurStyle' id='arrtime'> "+getTime(opt.legs[len-1].arrivalTime)+" </div><div class='orgDestVia' id='aarArpt'> "+opt.legs[len-1].destination+"</div></div><div class='durDtls'><div id='durTime' class='deptArrDurStyle'> "+calDuration(totalTime)+", "+(len-1)+" Stops </div><div class='orgDestVia' id='secCode'> "+stops.slice(',',-1)+" </div> <div class='separator'></div></div>" ); 
		
		$('.ulStyle').append("<li class='ulStyleBag'> <a id='toggle' onclick='showBagToggle"+i+"()' class='styleAnch'> Flight Details </a>   <div class='testdiv' id='showBagToggle"+i+"'><ul class='ulStyleBagCl'>");
		for(var j=0;j<len;j++){
		//alert(opt.legs[j].origin);
			$('#showBagToggle'+i+'').append("<div class='separator'></div> <li><article class='articleStyle'><div class='flightDetails'><div class='deptDetails'><div class='deptArrDurStyle' id='departtime'>"+getTime(opt.legs[j].departureTime)+"</div></div><div class='toImageStyle' id='arrowImg'><span><img src=\"images/arrow.png\" alt='United'></span></div><div class='arrDetails'><div id='arrtime' class='deptArrDurStyle' >"+getTime(opt.legs[j].arrivalTime)+"</div></div><div class='durDtls'><div id='durTime' class='deptArrDurStyle'>"+calDuration(opt.legs[j].duration)+"</div></div><div class='firstDiv'></div><div class='fromToDiv'><div class='paddingLeft47'><span class='fromClass'> From </span><span class='fromClass'> "+opt.legs[j].origin+" </span></div><div class='paddingLeft47'><span class='toClass'> To&nbsp&nbsp&nbsp </span><span class='toClass'>"+opt.legs[j].destination+"</span></div></div><div class='imageDiv'><div class='paddingLeft38'> <span class='carrier'>"+opt.legs[j].carrier+"</span> </div></div><div class='imageDiv'><div class='paddingLeft38'><span class='flghtNumber'>"+opt.legs[j].number+"</span> </div></div><div class='imageDiv'><div class='paddingLeft38'> <span class='stopStyle'>"+calDuration(opt.legs[j].connectionDuration)+" &nbsp Stop</span><span class='stopDestnStyle'> &nbsp in &nbsp"+opt.legs[j].destination+" </span> </div></div> " );  
			
			$('#showBagToggle'+i+'').append("<li><span class='separator'></span></li> </article></li>");
			
			/*<span> Flights </span><span id='flightamount' class='floatRight'> $425.00</span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'>$137.05</span></li><li> <span> Flights </span><span id='flightamount' class='floatRight'> $425.00</span></li><li><span> Taxes & Fees </span><span id='taxFeeAmt' class='floatRight'>$137.05</span></li>");*/
		}
		$('.testdiv').append("</ul></div>");
		$('.ulStyle').append("    </ul>");
		
		$('.ulStyle').append("      <li><span class='separator'></span></li>");
	
	}
	$('.ulStyle').append("<li><div class='borderTop'></li>");
}

function calDuration(mins){
	 var HRSMINS =0;
	if(mins!=0){
		var m = mins % 60;
		var	h = (mins-m)/60;
		HRSMINS = h.toString() + "hr " + (m<10?"0":"") + m.toString() +"min";
	}else{
		HRSMINS =0;
	}
    return HRSMINS;
}

function getTime(dateTime) {
	var d = new Date(dateTime);
	var n = d.toLocaleTimeString();
	return n;
}

function getDateFormat(dateValue){
    var d = new Date(dateValue);
    var date = d.toString().substring(0, 11);
    var day = date.substring(0,4);
    var month = date.substring(4,8);
    var numb = date.substring(8,10);

return day+", "+month+" "+numb;
}