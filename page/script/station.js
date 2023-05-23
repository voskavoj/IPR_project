const dataMapData = document.querySelector("#map-data")
let map;

function copy_gps_to_clipboard()
{
    navigator.clipboard.writeText(active_station._compose_gps());
}

function on_page_load()
{
    let map_data = JSON.parse(dataMapData.value);
    map = new Map("map", map_data);
}
on_page_load(); // init
