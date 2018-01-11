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
	 
	firebase.initializeApp(config);
	
	var btn = $("#submit");

	var database = firebase.database();


	$(btn).on("click", function(event) {

	event.preventDefault();

	    name = $("#inlineFormInput").val().trim();
	    destination = $("#destination").val().trim();
	    arrivalTime = $("#arrivalTime").val().trim();
	    frequency = $("#frequency").val().trim();
	    nextArrival = $("#arrivalTime").val().trim();
	    
	      
	    database.ref().push({
	      	trainName: name,
	        destination: destination,
	        arrivalTime: arrivalTime,
	        frequency: frequency,
	        nextArrival: nextArrival
	        
	        
	     });

	      console.log("Train Succesfully Added!");

	    });
	database.ref().on('child_added', function(snapshot){

		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().arrivalTime);
		console.log(snapshot.val().frequency);
		console.log(snapshot.val().nextArrival);

	
	// Assumptions
    var tFrequency = snapshot.val().frequency;
    // first train arrival 
    var firstTime = snapshot.val().arrivalTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var arrivingTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextArrival = moment(arrivingTrain).format("hh:mm");
	
	// creating a variable and row, then writing data to html table
	var addRow = $("<tr>");

	addRow.append("<td>" + (snapshot.val().trainName) + "</td>");
	addRow.append("<td>" + (snapshot.val().destination) + "</td>");
	addRow.append("<td>" + (snapshot.val().frequency) + "</td>");
	addRow.append("<td>" + (snapshot.val().arrivalTime) + "</td>");
	addRow.append('<td id="nextArrival">' + (nextArrival) + "</td>");
	addRow.append('<td id="nextMin">' + (tMinutesTillTrain) + "</td>");

	$(".table").append(addRow);


});
});