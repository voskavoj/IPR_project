import {poll_all_stations} from "./database/database.mjs";
import {is_authenticated} from "./authentication.mjs";
import {poll_points_for_user} from "./database/database.mjs";

export async function route_index(req, res)
{   
    if(is_authenticated(req, 1)||is_authenticated(req, 2)) {
        let user_points = await poll_points_for_user(req.session.username);
        let station_list = await poll_all_stations();
        res.render("index", {map_data: JSON.stringify(generate_map_data(station_list)),
                         prices: calculate_average_fuel_price(station_list), username: req.session.username, user_points: user_points});
    }
    else {
        let station_list = await poll_all_stations();
        res.render("index", {map_data: JSON.stringify(generate_map_data(station_list)),
                         prices: calculate_average_fuel_price(station_list)});
    }
}

function generate_map_data(station_list)
{
    let map_data = {center: [], // done locally
                    zoom: 15,
                    additional_points: []}

    for (const station of station_list)
    {
        map_data.additional_points.push({gps: station.gps, name: station.name, is_open: station._is_open});
    }

    return map_data;
}

function calculate_average_fuel_price(station_list)
{
    let average_prices = station_list[0].prices;

    for (const fuel_type in average_prices)
    {
        let avg_price = 0;
        for (const station of station_list)
        {
            avg_price += station.prices[fuel_type];
        }
        average_prices[fuel_type] = (avg_price / station_list.length).toFixed(3);
    }

    return average_prices;
}