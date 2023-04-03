// DOCUMENT
const tabStationTable = document.querySelector('#station-table');


// GLOBALS
const fake_station_db = [
    ["Able", "Achaios", 1.997, 1.654, 6, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"],
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
let stations = [];


// EVENT LISTENERS


// CLASSES
/**
    Class to contain information about a Station, in addition to non-html-related methods

    To be used as an ancestor / core component of HTML-formatting classes where necessary
    Should contain only methods common to more use cases

    TODO: Move to a separate file (THIS IS THE OG CLASS, ALL CHANGES SHOULD BE DISTRIBUTED FROM HERE)
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

class DisplayStationListItem {
    constructor(station)
    {
        this.station = station;
    }

    to_html_table_row()
    {
        let node = document.createElement("tr");
        node.setAttribute('class', `item-station`);

        node.innerHTML = DisplayStationListItem._to_table([
            this.station.print_is_open_now(),
            this.station.name,
            this.station.region,
            this.station.prices.n95,
            this.station.prices.diesel,
            this.station.print_opening_hours()], `station.html?station=${this.station.name}`);

        return node;
    }

    static _to_table(list, link="")
    {
        let table = "";
        let link_start = "";
        let link_end = "";

        if (link !== "") {
            link_start = `<a href=${link}>`;
            link_end = '</a>';
        }

        for (let i = 0; i < list.length; i++)
        {
            table += "<td>" + link_start + list[i] + link_end + "</td>";
        }

        return table;
    }
}



function construct_table()
{
    for (let i = 0; i < stations.length; i++)
    {
        tabStationTable.appendChild(stations[i].to_html_table_row())
    }

}

// FUNCTIONS
function fake_read_db()
{
    for (let i = 0; i < fake_station_db.length; i++)
    {
        let db_entry = fake_station_db[i];
        let station = new Station(db_entry[0],
            db_entry[1],
            {"n95": db_entry[2], "diesel": db_entry[3]},
            {"open": db_entry[4], "close": db_entry[5]},
            {"manager": db_entry[8], "email": db_entry[9], "phone": db_entry[10], "address": db_entry[11]},
            [db_entry[6], db_entry[7]]);
        stations.push(new DisplayStationListItem(station));
    }
}


// PAGE FUNCTIONS
function on_page_load()
{
    fake_read_db();
    construct_table();
}
on_page_load(); // init
