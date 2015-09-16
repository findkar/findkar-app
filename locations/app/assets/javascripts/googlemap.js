console.log("google map linked")

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(40.7400379,-73.9897665),
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
}








google.maps.event.addDomListener(window, 'load', initialize);