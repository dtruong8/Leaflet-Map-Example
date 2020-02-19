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

L.control.layers(baseMaps, overlayMaps).addTo(mymap);

// Create Legend
var legend = L.control({
    position: 'bottomleft'
});

legend.onAdd = getLegendContent;

//   Add Legend to Map
legend.addTo(mymap);


function getLegendContent(map) {
    var div = L.DomUtil.create('div', 'info legend'),
        population = [0, 10, 100, 1000, 10000, 100000, 1000000],
        labels = [];

    // loop through our density intervals and generate a lobal with a colored sqaure for each interval
    for (var i = 0; i < population.length; i++) {
        div.innerHTML += population[i] + '<br>';
    }
    return div;
}