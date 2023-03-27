const tabStationTable = document.querySelector('#station-table');

let stations = [];

// NOTE!!!!!!!! ` not ' or "

function fake_read_db()
{
    for (let i = 0; i < 6; i++)
    {
        let station = new Station("A",
            "reg",
            {"n95": 5, "diesel": 4},
            {"start": 3, "end": 5});
        stations.push(station);
    }
}


class Station {
    constructor(name, region, prices, opening_hours)
    {
        this.name = name;
        this.region = region;
        this.prices = prices;
        this.opening_hours = opening_hours;
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
            this.opening_hours.start + " - " + this.opening_hours.end]);

        return node;
    }

    _to_table(list)
    {
        let table = "";
        for (let i = 0; i < list.length; i++)
        {
            table += "<td>" + list[i] + "</td>";
        }
        return table;
    }
    _is_open_now()
    {
        return true;
    }
}

function construct_table()
{
    for (let i = 0; i < stations.length; i++)
    {
        tabStationTable.appendChild(stations[i].to_html_table_row())
    }

}


// main
fake_read_db();
construct_table();
