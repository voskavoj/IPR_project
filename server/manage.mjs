import {is_authenticated} from "./authentication.mjs";

export function route_manage(req, res)
{
    if (is_authenticated(req, 2)) // manager
    {
        let assigned_stations = poll_assigned_stations_for_manager(req.session.username);
        let selected_station = req.session.selected_station;
        let update_successful = req.session.update_successful;
        if (update_successful === false) // hotfix for handlebars
            update_successful = 0;
        req.session.update_successful = null;
        let fuel_types = null;
        if (selected_station)
            fuel_types = poll_fuel_prices_for_station(selected_station);

        res.render("manager", {
            update_successful: update_successful,
            username: req.session.username,
            assigned_stations: assigned_stations,
            selected_station: selected_station,
            fuel_types: fuel_types});
    }
    else if (is_authenticated(req, 1)) // user
    {
        let user_points = poll_points_for_user(req.session.username);
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

export function route_update_prices(req, res)
{
    let station_name = req.body.station;
    let new_prices = {"n95": req.body.n95,
                      "diesel": req.body.diesel};

    req.session.update_successful = update_station_with_new_prices(station_name, new_prices);
    res.redirect("manage");
}

export function route_update_points(req, res)
{
    let user_number = req.body.user_number;
    let points = req.body.points;
    req.session.update_successful = update_user_points(user_number, points);
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

function poll_points_for_user(username)
{
    // todo DB
    return 324;
}

function update_station_with_new_prices(station, new_prices)
{
    // todo DB
    return true;
}

function update_user_points(user_no, additional_points)
{
    // todo DB
    return false; // false just for testing
}