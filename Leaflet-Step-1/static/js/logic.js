// Perform an API call; console log to review output; format loop structure to pull coordinates from repsonse object

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function (data) {

    console.log("Sample JSON response object")
    console.log(data.features);
    console.log("-----------------------------------------------------")

    let features = data.features;

    console.log("Confirm JSON location of coordinate and depth info ")

    for (var index = 0; index < features.length; index++) {
        let coords = features[index].geometry.coordinates
        console.log(coords)
    };
    console.log("-----------------------------------------------------")

});

// Function to create the map

function createMap(quakeInfo) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the quakeInfo layer
    var overlayMaps = {
        "Earthquakes": quakeInfo
    };

    // Create the map object with options
    var map = L.map("mapid", {
        center: [40.73, -74.0059],
        zoom: 5,
        layers: [lightmap, quakeInfo]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(map);
}

// Function to create a layer group from earhtquake markers arra; pull earthquake coordinates and info from JSON repsonse object, append to markers array 

function createMarkers(response) {

    // Pull coordinates and depth from response object
    let earthquakes = response.features;

    // Initialize array to hold earthquake markets
    let quakeMarkers = [];

    // Loop through the earthquakes array to pull lat / long info:
    for (var index = 0; index < earthquakes.length; index++) {
        let coords = earthquakes[index].geometry.coordinates

        // For each earthquake, create marker and bind a popup with the quake's location
        let quakeMarker = L.marker([coords[0], coords[1]])
            .bindPopup("<h4>Magnitude:" + earthquakes[index].properties.mag + "</h4>");

        // Add marker to quakeMarkers array
        quakeMarkers.push(quakeMarker);
    }
    // Create the layer group made fro quakeMarkers array
    createMap(L.layerGroup(quakeMarkers));

    console.log(quakeMarkers)
}

// Perform API call to the earthquakes JSON file

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", createMarkers);


