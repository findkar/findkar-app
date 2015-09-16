console.log("google map linked")

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(40.7400379,-73.9897665),
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
}

//------ GEOLOCATION
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
    // console.log(position.coords.latitude)
}






google.maps.event.addDomListener(window, 'load', initialize);