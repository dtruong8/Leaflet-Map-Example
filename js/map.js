// Stamen Title Layers grouped
var terrain = new L.StamenTileLayer("terrain");
var toner = new L.StamenTileLayer("toner");
var OSM_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var overlayMaps = {};

// Call function in theme.js to get la border's geojson
var ladistrict_geocode = get_LADistrict_Theme();

// LA Border Layer
var ladistrict = L.geoJson(ladistrict_geocode, {
    // adds style to geojson
    style: function (feature) {
        return {
            // thickness of border
            weight: '2',
            // color of border is black
            color: '#04A0FF',
            // No fill inside multipolygon
            fill: true
        }
    }
});

overlayMaps["LA District"] = ladistrict;

// Call function in theme.js to get la zipcode geojson
var lazipcode_geocode = get_LAZipcode_Theme();

// LA Zipcode Layer
var lazipcode = L.geoJson(lazipcode_geocode, {
    // adds style to geojson
    style: function (feature) {
        return {
            // thickness of border
            weight: '2',
            // color of border is black
            color: '#04A0FF',
            // No fill inside multipolygon
            fill: true
        }
    }
});

overlayMaps["LA Zipcode"] = lazipcode;

// LA Poverty Layer
var lapoverity_geocode = get_LAPOV_Theme();
var lapoverity = L.geoJson(lapoverity_geocode, {
    // adds style to geojson
    style: function (feature) {
        return {
            // thickness of border
            weight: '2',
            // color of border is black
            color: '#04A0FF',
            // No fill inside multipolygon
            fill: true
        }
    }
});

overlayMaps["LA Poverty"] = lapoverity;

// LA 17-18 Fiscal Year
var fiscalyr_geocode = getfiscalyrlayer();
var fiscalyr = L.geoJson(fiscalyr_geocode, {
    style: style
});

// Add 17-18 Fiscal Year to overlayMaps
overlayMaps["17-18"] = fiscalyr;


// center map to downtown los angeles 
var dtla = new L.latLng({ lat: 33.954372, lon: -118.376021 });

// Create a map object called mymap
var mymap = new L.Map('mapid',
    {
        //Setup mymap's attributes
        center: dtla,
        zoom: 10,
        layers: [terrain, ladistrict]
    });

var baseMaps = {
    "Terrain": terrain,
    "Street": OSM_Mapnik,
    "Toner": toner,
};


var lcontrol = L.control.layers(baseMaps, overlayMaps).addTo(mymap);

// Create Legend
var legend = L.control({
    // position legend to be bottom left of the map
    position: 'bottomleft'
});

legend.onAdd = getLegendContent;

function getLegendContent(map) {
    var div = L.DomUtil.create('div', 'info legend'),
        population = [0,10,50,100,150,200,250,300],
        labels = [];

    // loop through our density intervals and generate a lobal with a colored sqaure for each interval
    for (var i = 0; i < population.length; i++) {
        div.innerHTML += 
            '<div id=legend><i style="background:'+ getColor(population[i]) + '"></i>' + population[i] + '&ndash;' + (population[i + 1] ? population[i + 1] + '<br>' : '+') + '</div>';
    }
    return div;
}

// Used to create clusters of marker
var markers = L.markerClusterGroup();

// load json data
const data = homeenergyimprovementdata;

// Loop through data and create a marker for each longitude and latitude
// Load marker into cluster
for(item of data){
    const marker = L.marker(new L.LatLng(item.y,item.x));
    markers.addLayer(marker);
}
// Add clusters layer to map
mymap.addLayer(markers);

// When LA Zipcode is selected turn on Legend
mymap.on('overlayadd', function(eventLayer){
    if(eventLayer.name === '17-18'){
        mymap.addControl(legend);
    }
});

// When LA Zipcode is deselected turn off Legend
mymap.on('overlayremove', function(eventLayer){
    if(eventLayer.name === '17-18'){
        mymap.removeControl(legend);
    }
});


