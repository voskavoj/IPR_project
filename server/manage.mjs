import {is_authenticated} from "./authentication.mjs";
import {
    poll_assigned_stations_for_manager, poll_fuel_prices_for_station, poll_points_for_user,
    update_station_with_new_prices,
    update_user_points
} from "./database/database.mjs";

export async function route_manage(req, res)
{
    if (is_authenticated(req, 2)) // manager
    {
        let assigned_stations = await poll_assigned_stations_for_manager(req.session.username);
        let selected_station = req.session.selected_station;
        let update_successful = req.session.update_successful;
        if (update_successful === false) // hotfix for handlebars
            update_successful = 0;
        req.session.update_successful = null;
        let fuel_types = null;
        if (selected_station)
            fuel_types = await poll_fuel_prices_for_station(selected_station);

        res.render("manager", {
            update_successful: update_successful,
            username: req.session.username,
            assigned_stations: assigned_stations,
            selected_station: selected_station,
            fuel_types: fuel_types});
    }
    else if (is_authenticated(req, 1)) // user
    {
        let user_points = await poll_points_for_user(req.session.username);
        res.render("user", {username: req.session.username,
            user_points: user_points});
    }
    else
        res.redirect("login");
}

export function route_update_select_station(req, res)
{
    req.session.selected_station = req.body.station;
    res.redirect("manage");
}

export async function route_update_prices(req, res)
{
    let station_name = req.body.station_name;
    let new_prices = {"n95": req.body.n95,
                      "diesel": req.body.diesel};

    req.session.update_successful = await update_station_with_new_prices(station_name, new_prices);
    res.redirect("manage");
}

export async function route_update_points(req, res)
{
    let username = req.body.username;
    let points = Number(req.body.points);
    req.session.update_successful = await update_user_points(username, points);
    res.redirect("manage");
}
