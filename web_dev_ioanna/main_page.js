// Create a map object centered on your preferred location and set the zoom level.
var map = L.map("map").setView([38.28935210420344, 21.785465559524], 15);

// Add a tile layer to display the map tiles from a specific provider.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data © OpenStreetMap contributors",
  maxZoom: 18
}).addTo(map);

// Create markers for your saved locations and add them to the map.
var locations = [  {    name: "Location 1",    lat: 38.28265425524198,    lng: 21.770983636287944  },  {    name: "Location 2",    lat: 38.28026243896955,    lng: 21.76587671035202  }];

locations.forEach(function(location) {
  var marker = L.marker([location.lat, location.lng]).addTo(map);
  marker.bindPopup(location.name);
});

// Add a marker for your current location to the map.
function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

function openNewWindow() {
  window.open("become_manager.html");
}
function openNearWindow() {
  window.open("near_station.html");
}
