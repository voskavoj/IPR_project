import {poll_all_stations} from "./database/database.mjs";

export async function route_station_list(req, res)
{
    let station_list = await poll_all_stations();
    res.render("station_list", {stations: station_list});
}
