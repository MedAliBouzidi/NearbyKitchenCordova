navigator.geolocation.getCurrentPosition(onSuccess, onerror, {
    enableHighAccuracy : false,
    maximumAge: 0,
    timeout: 4000
  });  
  
function onSuccess(position)  
{  
    var mapCanvas = document.getElementById('map-canvas');  
    var lat = position.coords.latitude;  
    var lang = position.coords.longitude;  
    var myLatlng = new google.maps.LatLng(lat, lang); 
    var mapOptions = {  
            zoom: 4,  
            center: myLatlng  
        }  
    var map = new google.maps.Map(mapCanvas, mapOptions);   
    var marker = new google.maps.Marker({  
            position: myLatlng,  
            map: map  
        }); 
}  

function onError(error)  
{  
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');  
}  
  
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 3000 });  
  
google.maps.event.addDomListener(window, 'load', onSuccess);  
