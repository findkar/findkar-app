console.log("google map linked")
$(function() {

    if(!!navigator.geolocation) {
    
        var map;
    
        var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    
        navigator.geolocation.getCurrentPosition(function(position) {
        
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log(geolocate);
            var geoMarker = new google.maps.Marker({
                map: map,
                position: geolocate,
                animation: google.maps.Animation.DROP
                // content:
                //     '<p> You are here </p>' 
                    // '<h2>Latitude: ' + position.coords.latitude + '</h2>' +
                    // '<h2>Longitude: ' + position.coords.longitude + '</h2>'
            });
            
            map.setCenter(geolocate);
            
        });
        
    } else {
        document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
    }
    
});