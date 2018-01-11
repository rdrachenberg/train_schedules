$(document).ready(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBId31oc_gQKoToZOKpvkfuKj_6fkLBacI",
	    authDomain: "trainscheduler-1.firebaseapp.com",
	    databaseURL: "https://trainscheduler-1.firebaseio.com",
	    projectId: "trainscheduler-1",
	    storageBucket: "trainscheduler-1.appspot.com",
	    messagingSenderId: "827220560124"
	 };
	
	 // initialized firebase app
	firebase.initializeApp(config);
	
	// create a var of btn to represent my button with an id of submit	
	var btn = $("#submit");
	
	// creates a variable of database and sets it equal to our firebase database
	var database = firebase.database();

	// this is our on click listener function to gather the inputed information 
	// and push it to our firebase database
	$(btn).on("click", function(event) {
	
		// stops default behavior 
		event.preventDefault();

		// creates directories and inputs the values of the selected
		 // jQuery elements into those directories
	    name = $("#inlineFormInput").val().trim();
	    destination = $("#destination").val().trim();
	    arrivalTime = $("#arrivalTime").val().trim();
	    frequency = $("#frequency").val().trim();
	    nextArrival = $("#arrivalTime").val().trim();
	    
	    // creates directories  and then pushes the value of the second variable
	     // information to our variable of database, which is our firebase database.  
	    database.ref().push({
	      	trainName: name,
	        destination: destination,
	        arrivalTime: arrivalTime,
	        frequency: frequency,
	        nextArrival: nextArrival
	        
	    });
	    // sets timeout to reset the page and then therefore updateing the data
		setTimeout(function(){
       	location.reload();
   		},45000);
	});

	// creates an event listener to monitor when a chiled element 
	// is added and then execute a function. 
	database.ref().on('child_added', function(snapshot){
	
	// pulls the value of frequency from firebase and creates a variable of tFrequency
    var tFrequency = snapshot.val().frequency;
    
    // first train arrival 
    var firstTrainArrival = snapshot.val().arrivalTime;
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainArrivalConverted = moment(firstTrainArrival, "hh:mm").subtract(1, "years");
    
    // creates a variable of the current time named currentTime
    var currentTime = moment();
    
    // mesures the difference between the subtracted year and now
    var diffTime = moment().diff(moment(firstTrainArrivalConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // create a variable  and equals it to the frequuency minus how much time 
    // until the next frequency interval which will be equal to the  Minutes Until
    // the trai arrives
    var tMinTillTrain = tFrequency - tRemainder;
    
    // creates a vaiable equal to now plus the minutes left until the
     // Next Train arrives which will return the time of arrival
    var arrivingTrain = moment().add(tMinTillTrain, "minutes");
    
    // additional vaiable to clean up the variable and will display same information
    var nextArrival = moment(arrivingTrain).format("hh:mm");
	
	// creating a variable and row, then writing data to html table
	var addRow = $("<tr>");

	addRow.append("<td>" + (snapshot.val().trainName) + "</td>");
	addRow.append("<td>" + (snapshot.val().destination) + "</td>");
	addRow.append("<td>" + (snapshot.val().frequency) + "</td>");
	addRow.append("<td>" + (snapshot.val().arrivalTime) + "</td>");
	addRow.append('<td id="nextArrival">' + (nextArrival) + "</td>");
	addRow.append('<td id="nextMin">' + (tMinTillTrain) + "</td>");

	
	// select the class of table and append all information to a new table row which is created in the add row variable
	$(".table").append(addRow);
	});

	// sets timeout to reset the page and then therefore updateing the data
	setTimeout(function(){
       location.reload();
   },100000);

    
});

