function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locationOutput").innerHTML = "La geolocalización no es compatible con este navegador.";
    }
}

function showPosition(position) {
    document.getElementById("locationOutput").innerHTML = "Latitud: " + position.coords.latitude + 
    "<br>Longitud: " + position.coords.longitude;
}