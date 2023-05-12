// DOCUMENT
let parUrlParams = new URLSearchParams(document.location.search);
let parStationId = parUrlParams.get("station");

// fields to fill
let fldName = document.querySelector("#fld-name");
let fldImage = document.querySelector("#fld-image");
let fldRegion = document.querySelector("#fld-region");
let fldPricesN95 = document.querySelector("#fld-prices-n95");
let fldPricesDiesel = document.querySelector("#fld-prices-diesel");
let fldOpHours = document.querySelector("#fld-opening-hours");
let fldAddress = document.querySelector("#fld-address");
let fldGps = document.querySelector("#fld-gps");
let fldPhone = document.querySelector("#fld-phone");
let fldEmail = document.querySelector("#fld-email");
let fldIsOpen = document.querySelector("#fld-is-open");
let fldAbout = document.querySelector("#fld-about");
let fldManager = document.querySelector("#fld-manager");


// GLOBALS
let active_station = null;
let station_map = null;

// EVENT LISTENERS

// CLASSES
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
        fldRegion.innerHTML = this.station.region;
        fldOpHours.innerHTML = this.station.print_opening_hours();
        fldIsOpen.innerHTML = this._compose_is_open();
        fldPhone.innerHTML = this.station.contact.phone;
        fldEmail.innerHTML = this.station.contact.email;
        fldAddress.innerHTML = this.station.contact.address;
        fldAbout.innerHTML = this._compose_about();
        fldGps.innerHTML = this._compose_gps();
        fldManager.innerHTML = this.station.contact.manager;

        this._display_image();
    }

    _compose_gps()
    {
        return this.station.gps[0] + "N, " + this.station.gps[1] + "E";
    }

    _compose_is_open()
    {
        if (this.station.is_open_now())
            return "open"
        else
            return "closed"
    }

    _compose_about()
    {
        if (this.station.about !== "")
            return this.station.about;
        else
            return "<i>No new announcements</i>";
    }

    _display_image()
    {
        fldImage.style.backgroundImage = `url("img/${this.station.name}.JPG")`;
    }
}


// FUNCTIONS
function find_station_in_db(searched_name)
{
    let stations = get_station_list();
    console.log(stations);

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
    let station = find_station_in_db(station_id);
    if (station == null)
    {
        // display_404();
        return;
    }

    active_station = new DisplayStation(station);
    active_station.display();

    station_map = new Map("map", active_station.station.gps);
    station_map.add_marker(active_station.station.gps);

}

function copy_gps_to_clipboard()
{
    navigator.clipboard.writeText(active_station._compose_gps());
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
