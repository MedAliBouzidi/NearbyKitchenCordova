import axios from "../../node_modules/axios"

const GOOGLE_MAPS_API_KEY = 'AIzaSyB36PAAvVMqyXDI2B6M8WqHFG5swgk5bpI'
const mapCanvas = document.getElementById('map-canvas')

initMap()

function initMap() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude

    let latLong = new google.maps.LatLng(lat, long)

    let map = new google.maps.Map(
        mapCanvas,
        {
            center: latLong,
            zoom: 8
        }
    )

    mapCanvas.innerHTML = `For Development purpose <br /> Latitude : ${latLong.lat()} <br /> Longitude : ${latLong.lng()}`

    searchRestaurant(map)
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
}

function searchRestaurant(map) {
    const service = new google.maps.places.PlacesService(map)
    const req = {
        fields: ["geometry", "name", "opening_hours", "rating", "user_ratings_total", "types"]
    }

}