// DOCUMENT


// GLOBALS
const default_map_center = [38.28935210420344, 21.785465559524];
let map;
let stations = [];

// EVENT LISTENERS


// CLASSES


// FUNCTIONS
function onLocationFound(e) {
    
    map.display_user_position(e);
}

function onLocationError(e) {
    alert(e.message);
}

// PAGE FUNCTIONS
function render_map()
{
    map = new Map("map", default_map_center, 15);
    for (const station of stations)
    {
        map.add_marker(station.gps, station.name)
    }
    map.map.on('locationfound', onLocationFound);
    map.map.on('locationerror', onLocationError);
    map.map.locate({setView: true, maxZoom: 16});
}

function on_page_load()
{
    stations = fake_read_db();
    render_map();
}

on_page_load(); // init
