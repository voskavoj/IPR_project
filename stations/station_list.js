// DOCUMENT
const tabStationTable = document.querySelector('#station-table');


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

let stations = [];


// EVENT LISTENERS


// CLASSES
class Station {
    constructor(name, region, prices, opening_hours)
    {
        this.name = name;
        this.region = region;
        this.prices = prices;
        this.opening_hours = opening_hours;
        this.is_nonstop = (this.opening_hours.open === 0 && this.opening_hours.close === 24);
    }

    to_html_table_row()
    {
        let node = document.createElement("tr");
        node.setAttribute('class', `item-station`);

        node.innerHTML = this._to_table([
            this._is_open_now(),
            this.name,
            this.region,
            this.prices.n95,
            this.prices.diesel,
            this._print_opening_hours()], `station.html?station=${this.name}`);

        return node;
    }

    _to_table(list, link="")
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
    _is_open_now()
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

    _print_opening_hours()
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
            {"open": db_entry[4], "close": db_entry[5]});
        stations.push(station);
    }
}

// PAGE FUNCTIONS
function on_page_load()
{
    fake_read_db();
    construct_table();
}
on_page_load(); // init
