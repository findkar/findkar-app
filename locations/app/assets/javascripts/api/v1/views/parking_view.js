$(document).ready(function(){
// __________________Model View__________________
      var ParkingView = Backbone.View.extend({
        initialize: function(){
          var that = this;
          //Check if the user signed in has a parking assigned to them
            if(typeof userParkingId !== "undefined"){
              this.model = new Parking({id: userParkingId});
              this.model.fetch({
                success: function(){
                  //get the parking assigned to user and get amount of time left
                  $.ajax({
                    url: "api/v1/parkings/"+that.model.id,
                    success: function(data){
                      var seconds = Math.round(data["seconds"]);
                      //get the timer passing in amount of time left in seconds
                      var clock = $('#time-left').FlipClock(seconds, {
                        countdown: true,
                        clockFace: 'MinuteCounter'
                      });
                    }
                  })          
                }
              });
            //show div to track, add time, timer   &&   hide div to create new parking
            $('#after-set-park').attr('class', 'showme');
            $('#add-parking').attr('class', 'hideme');
          };
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
          //get geolocation for car  
          navigator.geolocation.getCurrentPosition(function(position) {
         		var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
         		var carLatitude = position.coords.latitude;
         		var carLongitude = position.coords.longitude;
            var inputTime = this.$('#time-paid').val();
            //get current date/time
            var oldTime = new Date();
            console.log(oldTime);
            //get the utc date form by passing in milliseconds of current time and adding meter time to get future expiration time
            var newTime = new Date(oldTime.getTime() + inputTime*60000)
            console.log(newTime)
            //create new Parking model and save
            that.model = new Parking({time_up: newTime, carLongitude: carLongitude, carLatitude: carLatitude});
            that.model.save();
            //ajax call to get id of this parking model and upon success another ajax call to get seconds until expiration
            $.ajax({
              url: "/api/v1/parkings",
              success: function(data){
                var id = data["parking"][0].id;
                $.ajax({
                  url: "/api/v1/parkings/" + id,
                  success: function(data){
                    var seconds = data["seconds"];
                    var clock = $('#time-left').FlipClock(seconds, {
                      countdown: true,
                      clockFace: 'MinuteCounter'
                    });
                  }
                })
              }
            })
            //set input box to blank, hide div to create new parking and show div to track/end/addtime
            $("#time-paid").val('');
            $('#after-set-park').attr('class', 'showme');
            $('#add-parking').attr('class', 'hideme');
          });
        },
        trackCar: function(){
            var that = this;
            //get current geolocation
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              var currentlatitude = position.coords.latitude;
              var currentlongitude = position.coords.longitude;
              //edit db and set current location
              that.model.set({currentLatitude: currentlatitude, currentLongitude: currentlongitude})
              that.model.save(null,{
                success: function(data){
                  console.log(data);
                }
              });
              var carLatitude = that.model.attributes.carLatitude;
              var carLongitude = that.model.attributes.carLongitude;
              // currentMarker is current location
              currentMarker = "markers=color:green|label:A|"+ currentlatitude+","+currentlongitude
              // carMarker is car location
              carMarker = "markers=color:red|label:B|"+ carLatitude+","+carLongitude
				      $.ajax({
					       url: "api/v1/parkings",
					       success: function(data){
						        var polyline = data["overview"]
                		link = "https://maps.googleapis.com/maps/api/staticmap?size=400x290&scale=2&"+currentMarker+"&"+carMarker+"&path=weight:3%7Ccolor:blue%7Cenc:"+polyline
        						$('#google-map').empty()
        						$('#google-map').append('<img class="img-responsive" src="'+link+'">')
					       }
				      })
            });
        },
        addTime: function(){
            var addedTime = this.$("#added-time").val();
            var oldTime = new Date();
              console.log(oldTime);
              var newTime = new Date(oldTime.getTime() + addedTime*60000)
              console.log(newTime)
            this.model.set({time_up: newTime})
            this.model.save();
        },
        deleteTime: function(){
            this.model.destroy();
            $('#after-set-park').attr('class', 'hideme');
            $('#add-parking').attr('class', 'showme');
        }
    });
var parkingView = new ParkingView();
})