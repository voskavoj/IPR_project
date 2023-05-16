export function route_station_list(req, res)
{
    let station_list = []; // todo
    res.render("station_list", {stations: station_list});
}

function poll_all_stations()
{
    // todo DB
    // return list of records
}
