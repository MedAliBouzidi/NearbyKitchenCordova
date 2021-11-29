initMap()

function initMap() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    const mapCanvas = document.getElementById('map-canvas')

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

}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
}