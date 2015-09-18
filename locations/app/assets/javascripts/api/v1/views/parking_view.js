$(document).ready(function(){

// __________________Model View__________________


    var ParkingView = Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.model, 'all', this.logit);
            if(typeof userParkingId !== "undefined"){
                this.model = new Parking({id: userParkingId});
                this.model.fetch();
                $('#after-set-park').attr('class', 'showme');
              $('#add-parking').attr('class', 'hideme');
              // this.updateTimer();
            }



        },

        // updateTimer: function(){


        //     if(time > 0){
        //         setInterval(function(){
        //             time-=1;
        //             that.model.set({time_up: time})
        //         }60000);
        //     }else{
        //             //SEND TEXT
        //     } 
        // },

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
         		var carLatitude = position.coords.latitude;
         		var carLongitude = position.coords.longitude;

             	var time = this.$('#time-paid').val();
             	that.model = new Parking({time_up: time, carLongitude: carLongitude, carLatitude: carLatitude});
             	that.model.save();
             	$("#time-paid").val('');
            	$('#after-set-park').attr('class', 'showme');
            	$('#add-parking').attr('class', 'hideme');
            	// this.updateTimer();
            });
        },

        trackCar: function(){
            var that = this;

            navigator.geolocation.getCurrentPosition(function(position) {
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            var currentlatitude = position.coords.latitude;
            var currentlongitude = position.coords.longitude;

            that.model.set({currentLatitude: currentlatitude, currentLongitude: currentlongitude})
            that.model.save();
                var carLatitude = that.model.attributes.carLatitude;
                var carLongitude = that.model.attributes.carLongitude;
                // marker one is current location
                currentMarker = "markers=color:green|label:A|"+ currentlatitude+","+currentlongitude
                // marker two is car location
                carMarker = "markers=color:red|label:B|"+ carLatitude+","+carLongitude
				$.ajax({
					url: "api/v1/parkings",
					success: function(data){
						var polyline = data["overview"]
                		link = "https://maps.googleapis.com/maps/api/staticmap?size=400x290&scale=2&"+currentMarker+"&"+carMarker+"&path=weight:3%7Ccolor:blue%7Cenc:"+polyline
						$('#google-map').empty()
						$('#google-map').append('<img src="'+link+'">')
					}
				})
            });
        },

        addTime: function(){
            var time = this.$("#added-time").val();
            this.model.set({time_up: time})
            this.model.save();
            $("#added-time").val('');
        },

        deleteTime: function(){
            this.model.destroy();
            $('#after-set-park').attr('class', 'hideme');
            $('#add-parking').attr('class', 'showme');

        }



    });



var parkingView = new ParkingView();


//GET CURRENT TIME
            var x = new Date();
            var hour = x.getHours();
            var minutes = x.getMinutes();
            console.log(hour, minutes)




})