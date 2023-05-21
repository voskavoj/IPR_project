import {Station} from "./station_list.mjs";

export function route_station(req, res)
{
    const station_name = req.query["station"];
    console.log(station_name)
    if (station_name === undefined)
    {
        res.redirect("station_404");
        return;
    }

    let station = poll_station(station_name);
    let map_data = {center: station.gps,
                    zoom: 15,
                    additional_points: []}

    res.render("station", {station: station, map_data: JSON.stringify(map_data)});
}


function poll_station(station_name)
{
    // todo DB
    // return one station
    
    return new Station(...["Dog", "Pelopones", 1.936, 1.646, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"]);
}


