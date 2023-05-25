import {poll_all_stations} from "./database/database.mjs";

export async function route_index(req, res)
{
    let station_list = await poll_all_stations();
    res.render("index", {map_data: JSON.stringify(generate_map_data(station_list)),
                         prices: calculate_average_fuel_price(station_list)});
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