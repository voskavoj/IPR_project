// DOCUMENT
let parUrlParams = new URLSearchParams(document.location.search);
let parStationId = parUrlParams.get("station");

// fields to fill
let fldName = document.querySelector("#station-name");
let fldImage = document.querySelector("#station-image");
let fldLocation = document.querySelector("#station-location");
let fldPrices = document.querySelector("#station-prices");
    let fldPricesN95 = document.querySelector("#station-prices-n95");
    let fldPricesDiesel = document.querySelector("#station-prices-diesel");
let fldOpHours = document.querySelector("#station-opening-hours");


// GLOBALS
const fake_station_db = [
    ["Able", "Achaios", 1.997, 1.654, 6, 22],
    ["Baker", "Achaios", 1.998, 1.634, 15, 22],
    ["Charlie", "Pelopones", 1.954, 1.665, 0, 24],
    ["Dog", "Pelopones", 1.936, 1.646, 0, 24],
    ["Easy", "Pelopones", 1.868, 1.634, 0, 24],
    ["Fox", "Korinth", 1.900, 1.643, 23, 24],
    ["George", "Korinth", 1.902, 1.655, 3, 23],
    ["How", "Korinth", 1.990, 1.694, 13, 22],
    ["Item", "Patras", 1.944, 1.599, 12, 22],
    ["Jig", "Patras", 1.995, 1.633, 0, 24],
];

// EVENT LISTENERS

// CLASSES
// todo: move to import, remove from here
// duplicate of class, original in station_list.js
class Station {
    constructor(name, region, prices, opening_hours)
    {
        this.name = name;
        this.region = region;
        this.prices = prices;
        this.opening_hours = opening_hours;
        this.is_nonstop = (this.opening_hours.open === 0 && this.opening_hours.close === 24);
    }

    is_open_now()
    {
        let current_time_min = new Date();
        current_time_min = current_time_min.getHours() * 60 + current_time_min.getMinutes();

        if (this.is_nonstop)
            return true;
        else
            return this.opening_hours.open * 60 < current_time_min && current_time_min < this.opening_hours.close * 60;
        // return (Station._hh_mm_to_minutes(this.opening_hours.open) < current_time_min &&
        //     Station._minutes_to_hh_mm(this.opening_hours.close) > current_time_min);
    }

    print_opening_hours()
    {
        if (this.is_nonstop)
            return "nonstop";
        else
            return this.opening_hours.open + " - " + this.opening_hours.close;
    }

    static _hh_mm_to_minutes(hh_mm)
    {
        let split = hh_mm.split(':');
        return parseInt(split[0]) * 60 + parseInt(split[1]);
    }

    static _minutes_to_hh_mm(minutes)
    {
        return Math.floor(minutes / 60) + ":" + (minutes % 60);
    }
}

class DisplayStation {
    constructor(station)
    {
        this.station = station;
    }

    display()
    {
        document.title += " " + this.station.name;
        fldName.innerHTML = this.station.name;
        fldPricesN95.innerHTML = this.station.prices.n95;
        fldPricesDiesel.innerHTML = this.station.prices.diesel;
        fldLocation.innerHTML = this.station.region;
        fldOpHours.innerHTML = this.station.print_opening_hours();
    }


}


// FUNCTIONS
function find_station_in_fake_db(searched_name)
{
    let stations = [];
    for (let i = 0; i < fake_station_db.length; i++)
    {
        let db_entry = fake_station_db[i];
        let station = new Station(db_entry[0],
            db_entry[1],
            {"n95": db_entry[2], "diesel": db_entry[3]},
            {"open": db_entry[4], "close": db_entry[5]});
        stations.push(station);
    }

    for (let i = 0; i < stations.length; i++)
    {
        let station = stations[i];
        if (station.name === searched_name)
            return station;
    }
    return null;
}

function render_station(station_id)
{
    let station = find_station_in_fake_db(station_id);
    if (station == null)
    {
        display_404();
        return;
    }

    station = new DisplayStation(station);
    station.display();

}


// PAGE FUNCTIONS
function display_404()
{
    console.log(`No station found or no station ID given! Redirecting to 404.`);
    window.location.href = "station_404.html";
}

function on_page_load()
{
    if (parStationId === null)
        display_404();
    console.debug(parStationId);

    render_station(parStationId);

}
on_page_load(); // init

