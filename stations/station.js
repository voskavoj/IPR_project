
let parUrlParams = new URLSearchParams(document.location.search);
let parStationId = parUrlParams.get("station");

if (parStationId === null)
    display_404();
console.log(parStationId);


function display_404()
{
    console.log(`No station found or no station ID given! Redirecting to 404.`);
    window.location.href = "station_404.html";
}

