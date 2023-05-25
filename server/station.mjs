import {poll_station} from "./database/database.mjs";

export async function route_station(req, res)
{
    const station_name = req.query["station"];
    console.log(station_name)
    if (station_name === undefined)
    {
        res.redirect("station_404");
        return;
    }

    let station = await poll_station(station_name);
    if (station === undefined)
    {
        res.redirect("station_404");
        return;
    }

    let map_data = {center: station.gps,
                    zoom: 15,
                    additional_points: []}

    res.render("station", {station: station, map_data: JSON.stringify(map_data)});
}

export class Station {
    constructor(row)
    {
        this._is_open = this.is_open_now(row.open, row.close);

        this.open_tick = this.format_is_open_now(true);
        this.open_word = this.format_is_open_now(false);
        this.name = row.name;
        this.region = row.region;
        this.prices = {n95: row.n95, diesel: row.diesel};
        this.opening_hours = this.format_opening_hours(row.open, row.close);
        this.contact = {manager: row.manager, email: row.email, phone: row.phone, address: row.address,
            gps: this.format_gps(row.lon, row.lat)};
        this.gps = [row.lon, row.lat];
        this.image_url = this.format_image_url(this.name);
        this.about = row.about;
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

    format_gps(lon, lat)
    {
        return lon + "N; " + lat + "E";
    }

    format_image_url(name)
    {
        return `url("img/${name}.JPG")`;
    }
}
