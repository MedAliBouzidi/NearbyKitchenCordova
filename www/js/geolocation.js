const apiKey = "AAPKb3c5ec80528a4687b8ecc2ad63602d46d0t3OczmYXmyCHdzNuUoI3PL0HUz62stGWbJHFRGzN-hBYHZgRDCyHjR7nvQAfJM"
const basemapEnum = "ArcGIS:Streets"

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let latLong = L.latLng(lat, long)

    let options = {
        center: latLong,
        zoom: 12
    }
    const map = L.map('map-canvas', options)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWVkYWxpYm91emlkaSIsImEiOiJja3gzanpzNG4wbzNiMzBvMWhhOGx4dXBkIn0.dQ0TX8Q3jDNNkWKQL18QgQ'
    }).addTo(map)

    const marker = L.marker(latLong).addTo(map)
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
}