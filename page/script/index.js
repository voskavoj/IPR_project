// DOCUMENT
let btnFindNearestGS = document.querySelector("#btn-find-nearest-gs");
const dataMapData = document.querySelector("#map-data");

// GLOBALS
const default_map_center = [38.28935210420344, 21.785465559524];
let map;
let user_position = null;


// EVENT LISTENERS
btnFindNearestGS.addEventListener("click", find_my_nearest_gs);


// Map user location
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
    console.log(e.message);
}


// Find my nearest station
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
        window.location.href = "/station?station=" + get_closest_station().name;
    }
}

function get_closest_station()
{
    let closest_gs = stations[0];
    let closest_gs_distance = user_position.distanceTo(closest_gs.gps)

    for (const station of stations)
    {
        let distance = user_position.distanceTo(station.gps);
        if (distance < closest_gs_distance && station.is_open)
        {
            closest_gs = station;
            closest_gs_distance = distance;
        }
    }

    return closest_gs;
}


// page load
function on_page_load()
{
    let map_data = JSON.parse(dataMapData.value);
    map_data.center = default_map_center;
    stations = map_data.additional_points;

    map = new Map("map", map_data);
    map.map.on('locationfound', cb_on_location_found);
    map.map.on('locationerror', cb_on_location_error);
    map.map.locate({setView: true, maxZoom: 16});
}
on_page_load();

