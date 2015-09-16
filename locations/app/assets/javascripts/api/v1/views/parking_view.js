$(document).ready(function(){

// __________________Model View__________________

var ParkingView = Backbone.View.extend({

})




// __________________Collection View__________________



var CreateParkingView = Backbone.View.extend({
    // initialize: function(){
    //     this.listenTo(this.collection, 'all', this.logit)
    // },

    // logit: function(event_name){
    //     console.log(event_name);
    // },

    el: '#add-parking',
    events: {'click .start': 'createParking'},

    createParking: function(){
        var that = this;
        
        navigator.geolocation.getCurrentPosition(function(position) {
     var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
     var latitude = position.coords.latitude;
     var longitude = position.coords.longitude;

            var time = this.$('#time-paid').val();
            that.collection.create({time_up: time, longitude: longitude, latitude: latitude});
            $("#time-paid").val('');
     console.log(latitude)
     console.log(longitude)
        });
       
    }

})



createParkingView = new CreateParkingView({collection: parkings});




})