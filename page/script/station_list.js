// DOCUMENT
const tabStationTable = document.querySelector('#station-table');


// GLOBALS
let stations = [];


// EVENT LISTENERS


// CLASSES

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
    stations = get_station_list();
    for (let i = 0; i < stations.length; i++)
    {
        let station = new DisplayStationListItem(stations[i]);
        tabStationTable.appendChild(station.to_html_table_row())
    }
}

// FUNCTIONS


// PAGE FUNCTIONS
function on_page_load()
{
    construct_table();
}
on_page_load(); // init
