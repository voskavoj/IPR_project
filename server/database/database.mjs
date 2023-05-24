import sqlite3 from "sqlite3";
import {open} from "sqlite";

let database;

export async function database_init()
{
    sqlite3.verbose();

    let filename = "server/database/database.db";

    database = await open({
        filename,
        driver: sqlite3.Database
    });
}

export async function poll_assigned_stations_for_manager(username)
{
    const cmd = await database.prepare('SELECT name FROM stations WHERE mng_usr=? ORDER BY name');

    let res = await cmd.all(username);

    let retval = [];
    for (const stat of res)
    {
        retval.push(stat.name);
    }

    return retval;
}

export async function poll_fuel_prices_for_station(station_name)
{
    const cmd = await database.prepare('SELECT n95, diesel FROM stations WHERE name=?');
    return await cmd.get(station_name);
}


export async function update_station_with_new_prices(station_name, new_prices)
{
    let prices = "";
    let prices_to_set = [];

    console.log(new_prices);

    for (const fuel in new_prices)
    {
        prices += fuel + "=?, ";
        prices_to_set.push(new_prices[fuel]);
    }
    prices = prices.slice(0, -2);

    const cmd = await database.prepare(`UPDATE stations SET ${prices} WHERE name=?`);
    await cmd.run(...prices_to_set, station_name);
    return true;
}

export async function poll_points_for_user(username)
{
    const cmd = await database.prepare('SELECT points FROM users WHERE username=? AND level=1');
    let res = await cmd.get(username);
    return res.points;
}

export async function update_user_points(username, additional_points)
{
    const points_to_add = additional_points + await poll_points_for_user(username);
    const cmd = await database.prepare('UPDATE users SET points=? WHERE username=?');
    await cmd.run(points_to_add, username);
    return true;
}