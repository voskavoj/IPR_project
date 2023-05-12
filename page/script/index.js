// DOCUMENT
let btnFindNearestGS = document.querySelector("#btn-find-nearest-gs");

// GLOBALS
const default_map_center = [38.28935210420344, 21.785465559524];

let map;
let stations = [];
let user_position = null;

// EVENT LISTENERS
btnFindNearestGS.addEventListener("click", find_my_nearest_gs);

// CLASSES


// FUNCTIONS
function cb_on_location_found(e)
{
    user_position = e.latlng;
    map.display_user_position(e);
}

function cb_on_location_found_find_nearest_gs(e)
{
    user_position = e.latlng;
    find_my_nearest_gs();
}

function cb_on_location_error(e)
{
    user_position = null;
    alert(e.message);
}

function find_my_nearest_gs()
{
    if (!user_position)
    {
        map.map.stopLocate();
        map.map.on('locationfound', cb_on_location_found_find_nearest_gs);
        map.map.locate()
    }
    else
    {
        window.location.href = "station.html?station=" + get_closest_station().name;
    }
}

function get_closest_station()
{
    let closest_gs = stations[0];
    let closest_gs_distance = user_position.distanceTo(closest_gs.gps)

    for (const station of stations)
    {
        let distance = user_position.distanceTo(station.gps);
        if (distance < closest_gs_distance)
        {
            closest_gs = station;
            closest_gs_distance = distance;
        }
    }

    return closest_gs;
}

// PAGE FUNCTIONS
function render_map()
{
    map = new Map("map", default_map_center, 15);
    for (const station of stations)
    {
        map.add_marker(station.gps, station.name)
    }
    map.map.on('locationfound', cb_on_location_found);
    map.map.on('locationerror', cb_on_location_error);
    map.map.locate({setView: true, maxZoom: 16});
}

function on_page_load()
{
    stations = get_station_list();
    render_map();
}

on_page_load(); // init
