$(document).ready(function(){

	console.log("success");
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

	var database = firebase.database();

	var btn = $("#submit")

	 
	$(btn).on("click", function(event) {

	event.preventDefault();

	      name = $(".userInput").val().trim();
	     
	      database.ref().push({
	        name: name
	      });

	      alert("Employee successfully added!");

	    });
});