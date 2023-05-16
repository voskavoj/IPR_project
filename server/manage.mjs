import {is_authenticated} from "./authentication.mjs";

export function route_manage(req, res)
{
    if (is_authenticated(req, 2)) // manager
    {
        let assigned_stations = poll_assigned_stations_for_manager(req.session.username);
        let selected_station = req.session.selected_station;
        let fuel_types = null;
        if (selected_station)
            fuel_types = poll_fuel_prices_for_station(selected_station);

        res.render("manager", {username: req.session.username,
            assigned_stations: assigned_stations,
            selected_station: selected_station,
            fuel_types: fuel_types})
    }
    else if (is_authenticated(req, 1)) // user
    {

    }
    else
        res.redirect("login");
}

export function route_manage_select_station(req, res)
{
    req.session.selected_station = req.body.station;
    res.redirect("manage");
}

function poll_assigned_stations_for_manager(username)
{
    // todo DB
    return ["Able", "Charlie"];
}

function poll_fuel_prices_for_station(station_name)
{
    // todo DB
    return {"n95": 5, "diesel": 4};
}

