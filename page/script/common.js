// CLASSES

/**
 Class to contain information about a Station, in addition to non-html-related methods

 To be used as an ancestor / core component of HTML-formatting classes where necessary
 Should contain only methods common to more use cases
 */
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


class Map
{
    constructor(html_element, center, zoom=15)
    {
        this.map = new L.map('map', {center: center, zoom: zoom});
        this.map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
        this.markers = [];
    }

    add_marker(gps, name="", circle_radius = 0)
    {
        let marker = L.marker(gps).addTo(this.map);
        if (name !== "")
            marker.bindPopup(name);
        if (circle_radius > 0)
            L.circle(gps, circle_radius).addTo(this.map);
        this.markers.push(marker);
    }

    display_user_position(position)
    {
        console.debug(position);
        let radius = Math.round(position.accuracy / 2);
        this.add_marker(position.latlng, "You are within " + radius + " meters from this point", radius);
        this.map.panTo(position.latlng);
    }
}


// FAKE DB
const fake_station_db = [
    ["Able", "Achaios", 1.997, 1.654, 6, 22, 20.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Baker", "Achaios", 1.998, 1.634, 15, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Charlie", "Pelopones", 1.954, 1.665, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Dog", "Pelopones", 1.936, 1.646, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Easy", "Pelopones", 1.868, 1.634, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Fox", "Korinth", 1.900, 1.643, 23, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["George", "Korinth", 1.902, 1.655, 3, 23, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["How", "Korinth", 1.990, 1.694, 13, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Item", "Patras", 1.944, 1.599, 12, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
    ["Jig", "Patras", 1.995, 1.633, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
];

function pull_db_from_server()
{
    return fake_station_db; // todo real
}
function parse_stations_db(db)
{
    let station_list = [];
    for (let i = 0; i < db.length; i++)
    {
        let db_entry = db[i];
        let station = new Station(db_entry[0],
            db_entry[1],
            {"n95": db_entry[2], "diesel": db_entry[3]},
            {"open": db_entry[4], "close": db_entry[5]},
            {"manager": db_entry[8], "email": db_entry[9], "phone": db_entry[10], "address": db_entry[11]},
            [db_entry[6], db_entry[7]]);

        station_list.push(station);
    }
    return station_list;
}


// DB PULL
function get_station_list()
{
    let db;

    if (!is_session_storage_of_stations_valid())
    {
        console.log("Pulling new DB");
        db = pull_db_from_server();
        sessionStorage.setItem("stations", JSON.stringify(db));
    }
    else
        db = JSON.parse(sessionStorage.getItem("stations"));

    return parse_stations_db(db);
}

function is_session_storage_of_stations_valid()
{
    if (sessionStorage.getItem("stations") == null)
        return false;
    else if (false) // todo expired
        return false;
    else
        return true;
}