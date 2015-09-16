$(document).ready(function(){

// __________________Model View__________________

var ParkingView = Backbone.View.extend({

})




// __________________Collection View__________________



var CreateParkingView = Backbone.View.extend({
	el: '.add-parking',
	events: {'click .start': 'createParking'},

	createParking: function(){
		console.log("hello");
		console.log(session[:user_id]);
		$(".time-paid").val('');
	}

})



createParkingView = new CreateParkingView();




})