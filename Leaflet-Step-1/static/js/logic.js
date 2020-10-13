// Perform an API call; console log to review output; format loop structure to pull coordinates from repsonse object

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function (data) {

    console.log(data.features);

    let features = data.features;

    for (var index = 0; index < features.length; index++) {
        let coords = features[index].geometry.coordinates
        console.log(coords)
    };

});

// Function to create a layer group from earhtquake markers arra; pull earthquake coordinates and info from JSON repsonse object, append to markers array 

function createMarkers(response) {

    // Pull coordinates and depth from response object
    let earthquakes = response.features;

    // Initialize array to hold earthquake markets
    let quakeMarkers = [];

    // Loop through the earthquakes array to pull lat / long info:
    for (var index = 0; index < eatherquakes.length; index++) {
        let coords = earthquakes[index].geometry.coordinates

        // For each earthquake, create marker and bind a popup with the quake's location
        let quakeMarker = L.marker([coords[0], coords[1]])
            .bindPopup("<h4>" + earthquakes[index].properties.mag);

        // Add marker to quakeMarkers array
        quakeMarkers.push(quakeMarker);

        createMarkers.Map(L.layerGroup(quakeMarkers));
    }
}


// Function to create the map

function createMap() {


}




