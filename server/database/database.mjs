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

