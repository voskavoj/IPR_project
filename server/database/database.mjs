import sqlite3 from "sqlite3";
import {open} from "sqlite";
import {Station} from "../station.mjs";

let database;

export async function database_init()
{
    sqlite3.verbose();

    let filename = "server/database/database.db";

    database = await open({
        filename,
        driver: sqlite3.Database
    });
    await poll_station("fff");
}

// MANAGEMENT

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

    try {
        const cmd = await database.prepare(`UPDATE stations SET ${prices} WHERE name=?`);
        await cmd.run(...prices_to_set, station_name);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function poll_points_for_user(username)
{
    const cmd = await database.prepare('SELECT points FROM users WHERE username=? AND level=1');
    let res = await cmd.get(username);
    if (res !== undefined)
        return res.points;
    else
    {
        console.log("Error in fetching user points")
        return 0;
    }

}

export async function update_user_points(username, additional_points)
{
    const points_to_add = additional_points + await poll_points_for_user(username);

    try {
        const cmd = await database.prepare('UPDATE users SET points=? WHERE username=?');
        await cmd.run(points_to_add, username);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// AUTHENTICATION
/**
 * Search database for username, password combination
 *
 * Return level of authentication:
 *      0: no user or invalid credentials
 *      1: user
 *      2: manager
 *      3: admin
 * **/
export async function authenticate_user(username, password)
{
    const cmd = await database.prepare('SELECT level FROM users WHERE username=? AND password=?');
    let res = await cmd.get(username, password);

    if (res === undefined)
        return 0;
    else
        return res.level;
}

export async function is_username_available(username)
{
    const cmd = await database.prepare('SELECT username FROM users WHERE username=? LIMIT 1');
    let res = await cmd.get(username);
    return res === undefined;
}

export async function add_new_user(username, password)
{
    try {
        const cmd = await database.prepare('INSERT INTO users VALUES (null, ?, ?, ?, ?)');
        await cmd.run(username, password, 1, 0); // level is assumed 1 (user), points 0
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// STATIONS

export async function poll_station(station_name)
{
    const cmd = await database.prepare('SELECT * FROM stations WHERE name=?');
    let ret = await cmd.get(station_name);
    if (ret === undefined)
        return undefined;

    return new Station(ret);
}

export async function poll_all_stations()
{
    const cmd = await database.prepare('SELECT * FROM stations ORDER BY name');
    let ret = await cmd.all();

    let station_list = []
    for (const row of ret)
        station_list.push(new Station(row));
    return station_list;
}
