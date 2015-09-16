$(document).ready(function(){

// __________________Model View__________________

var ParkingView = Backbone.View.extend({

})





// __________________Create View__________________





var CreateParkingView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'all', this.logit)
	},

	logit: function(event_name){
		console.log(event_name);
	},

	el: '#right-side',
	events: {
		'click .start': 'createParking',
		'click #increase-time': 'addTime',
		'click #delete-time': 'deleteTime',
		'click .track': 'trackCar'
	},

	createParking: function(){
		var that = this;
		
		navigator.geolocation.getCurrentPosition(function(position) {
     var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
     var latitude = position.coords.latitude;
     var longitude = position.coords.longitude;

		 var time = this.$('#time-paid').val();
		 that.collection.create({time_up: time, longitude: longitude, latitude: latitude});
		 $("#time-paid").val('');
		 $('#after-set-park').toggleClass('showme');
		 $('#add-parking').attr('class', 'hideme');
		});
	},

	trackCar: function(){
		var that = this;

		navigator.geolocation.getCurrentPosition(function(position) {
	    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
	    var currentlatitude = position.coords.latitude;
	    var currentlongitude = position.coords.longitude;

	    console.log(currentlongitude, "current long");
	    console.log(currentlatitude, "current lat");
			var object = that.collection.toJSON();
			var carLongitude = object[object.length-1].longitude;
			var carLatitude = object[object.length-1].latitude;
			console.log(carLongitude, "car long");
			console.log(carLatitude, "car lat");
		});
	},

	addTime: function(){
		var time = this.$("#added-time").val();
		var model = this.collection.models[this.collection.models.length-1];
		model.set({time_up: time})
		model.save();

	},

	deleteTime: function(){
		var model = this.collection.models[this.collection.models.length-1];
		model.destroy();

	}



})


parkings.fetch();
var createParkingView = new CreateParkingView({collection: parkings});




})