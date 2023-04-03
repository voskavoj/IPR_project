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
const fake_station_db = [
    ["Able",    "Achaios",  1.997, 1.654, 6,  22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Baker",   "Achaios",  1.998, 1.634, 15, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Charlie", "Pelopones",1.954, 1.665, 0,  24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Dog",     "Pelopones",1.936, 1.646, 0,  24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Easy",    "Pelopones",1.868, 1.634, 0,  24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Fox",     "Korinth",  1.900, 1.643, 23, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["George",  "Korinth",  1.902, 1.655, 3,  23, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["How",     "Korinth",  1.990, 1.694, 13, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Item",    "Patras",   1.944, 1.599, 12, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Jig",     "Patras",   1.995, 1.633, 0,  24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
];

let active_station = null;

// EVENT LISTENERS

// CLASSES
// todo: move to import, remove from here
// duplicate of class, original in station_list.js
class Station {
    constructor(name, region, prices, opening_hours, contact, gps, about="")
    {
        this.name = name;
        this.region = region;
        this.prices = prices;
        this.opening_hours = opening_hours;
        this.contact = contact;
        this.gps = gps;
        this.about = about;

        this.is_nonstop = (this.opening_hours.open === 0 && this.opening_hours.close === 24);
    }

    is_open_now()
    {
        let current_time = new Date(); // hrs as decimal
        current_time = current_time.getHours() + current_time.getMinutes() / 60;
        console.debug(current_time)

        if (this.is_nonstop)
            return true;
        else
            return this.opening_hours.open < current_time && current_time < this.opening_hours.close;
    }

    print_opening_hours()
    {
        if (this.is_nonstop)
            return "nonstop";
        else
            return this.opening_hours.open + " - " + this.opening_hours.close;
    }

    print_is_open_now()
    {
        if (this.is_open_now())
            return "&#x2714;";
        else
            return "&#x2718;";
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
        fldRegion.innerHTML = this.station.region;
        fldOpHours.innerHTML = this.station.print_opening_hours();
        fldIsOpen.innerHTML = this._display_is_open();
        fldPhone.innerHTML = this.station.contact.phone;
        fldEmail.innerHTML = this.station.contact.email;
        fldAddress.innerHTML = this.station.contact.address;
        fldAbout.innerHTML = this._display_about();
        fldGps.innerHTML = this._display_gps();
        fldManager.innerHTML = this.station.contact.manager;
    }

    _display_gps()
    {
        return this.station.gps[0] + "N, " + this.station.gps[1] + "E";
    }

    _display_is_open()
    {
        if (this.station.is_open_now())
            return "open"
        else
            return "closed"
    }

    _display_about()
    {
        if (this.station.about !== "")
            return this.station.about;
        else
            return "<i>No new announcements</i>";
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
            {"open": db_entry[4], "close": db_entry[5]},
            {"manager": db_entry[8], "email": db_entry[9], "phone": db_entry[10], "address": db_entry[11]},
            [db_entry[6], db_entry[7]]);
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

    active_station = new DisplayStation(station);
    active_station.display();

}

function copy_gps_to_clipboard()
{
    navigator.clipboard.writeText(active_station._display_gps());
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
