
let parUrlParams = new URLSearchParams(document.location.search);
let parStationId = parUrlParams.get("station");

if (parStationId === null)
    display_no_station_id_given();
console.log(parStationId);


function display_no_station_id_given()
{
    // todo
    console.log(`No station ID given!`);
    // redirect to station list
    window.setTimeout(function(){window.location.href = "station_list.html";}, 3000);
}
function display_station_not_found(station_id)
{
    // todo
    console.log(`Station ${station_id} not found`)
}