export function route_station_list(req, res)
{
    let station_list = poll_all_stations(); // todo
    res.render("station_list", {stations: station_list});
}

function poll_all_stations()
{
    // todo DB
    // return list of Station classes

    // testing
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

    let station_list = [];
    for (let i = 0; i < fake_station_db.length; i++)
    {
        let db_entry = fake_station_db[i];
        let station = new Station(...db_entry);
        station_list.push(station);
    }
    return station_list;
}

export class Station {
    constructor(name, region,
                price_n95, price_diesel,
                oh_open, oh_close, gps_lon, gps_lat, mng, email, phone, addr, about="")
    {
        this._is_open = this.is_open_now(oh_open, oh_close);

        this.open = this.format_is_open_now(true);
        this.name = name;
        this.region = region;
        this.prices = {n95: price_n95, diesel: price_diesel};
        this.opening_hours = this.format_opening_hours(oh_open, oh_close);
        this.contact = {manager: mng, email: email, phone: phone, address: addr};
        this.gps = [gps_lon, gps_lat];
        this.about = about;
    }

    is_open_now(open, close)
    {
        let current_time = new Date(); // hrs as decimal
        current_time = current_time.getHours() + current_time.getMinutes() / 60;

        if (open === 0 && close === 24)
            return true;
        else
            return open < current_time && current_time < close;
    }

    format_opening_hours(open, close)
    {
        if (open === 0 && close === 24)
            return "nonstop";
        else
            return open + " - " + close;
    }

    format_is_open_now(symbol=true)
    {
        if (this._is_open)
            return symbol ? "&#x2714;" : "open";
        else
            return symbol ? "&#x2718;" : "closed";
    }
}
