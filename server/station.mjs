import {Station} from "./station_list.mjs";

export function route_station(req, res)
{
    let station; // todo
    res.render("station", {station: station});
}


function poll_station(station_name)
{
    // todo DB
    // return one station
    
    return new Station(...["Dog", "Pelopones", 1.936, 1.646, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664"]);
}
