
var map;
 var marker
 var c;
 var lat,lon;

function setup() {
c=	createCanvas(windowWidth, windowHeight);
	// put setup code here
// map = L.map('map').setView([31.4, 34.99], 15);
if ("geolocation" in navigator) {
  /* geolocation is available */
  const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// function success(pos) {
//   const crd = pos.coords;
//
//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

  function success(pos){
const crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
  console.log(lat+" "+lon)




map = L.map('map').setView([lat, lon], 15);
 mbAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
mbUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

 var layer1 = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}).addTo(map);





 var layer2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})//.addTo(map);


function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
    return degree*Math.PI/180;
}
//var distance = getDistance([lat1, lng1], [lat2, lng2])





 L.simpleMapScreenshoter().addTo(map)

// creat marker with lonlng with mouse click
 function onMapClick(e) {
   if(marker != null){
	 map.removeLayer(marker);
 }
   let position = e.latlng;
   console.log(position.lat);
	 marker = L.marker([position.lat, position.lng]).addTo(map);
	 marker.bindPopup(nfc(position.lat,4)+ " , "+nfc(position.lng,4)).openPopup();
 }

 map.on('click', onMapClick);
}
}
}
function draw() {
	// put drawing code here
	background(35);
}
function keyPressed(){
	if (key =='s'){
		saveCanvas(c, 'myCanvas', 'jpg');
	}
}
