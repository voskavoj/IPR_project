let sqlite3 = require("sqlite3");
let new_db;


let cmd_create_table_users = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE "users" (
	"id"	    INTEGER PRIMARY KEY AUTOINCREMENT,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"level"     INTEGER NOT NULL,
	"points"    INTEGER NOT NULL DEFAULT 0
);`


let cmd_create_table_stations = `
    DROP TABLE IF EXISTS stations;
    CREATE TABLE "stations" (
	"id"	    INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	    TEXT NOT NULL,
    "region"	TEXT NOT NULL,
    "n95"	    REAL NOT NULL,
    "diesel"	REAL NOT NULL,
    "open"	    TEXT NOT NULL,
    "close"	    TEXT NOT NULL,
    "lat"	    REAL NOT NULL,
    "lon"	    REAL NOT NULL,
    "manager"	TEXT NOT NULL,
    "email"	    TEXT NOT NULL,
    "phone"	    TEXT NOT NULL,
	"address"	TEXT NOT NULL,
    "mng_usr"   TEXT NOT NULL,
	"about"	    TEXT DEFAULT ''
);`



const default_station_db = [
    ["Able", "Achaios", 1.997, 1.654, 6, 22, 20.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "manAB"],
    ["Baker", "Achaios", 1.998, 1.634, 15, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "manAB"],
    ["Charlie", "Pelopones", 1.954, 1.665, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["Dog", "Pelopones", 1.936, 1.646, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "manD"],
    ["Easy", "Pelopones", 1.868, 1.634, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["Fox", "Korinth", 1.900, 1.643, 23, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["George", "Korinth", 1.902, 1.655, 3, 23, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["How", "Korinth", 1.990, 1.694, 13, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["Item", "Patras", 1.944, 1.599, 12, 22, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
    ["Jig", "Patras", 1.995, 1.633, 0, 24, 14.556464, 52.665445, "Georgios Mouranos", "able@fakeoil.gr", "+39445675435", "Ametitia 13\nPatra\n25664", "man"],
];

const default_user_db = [
    ["admin", "superdupersafepassword", 3, 0],
    ["man", "man", 2, 0],
    ["manAC", "man", 2, 0],
    ["manD", "man", 2, 0],
    ["BigTankGuy", "hummerforlife", 1, 0],
];

function create_databases()
{
    new_db = new sqlite3.Database('database.db');
    new_db.exec(cmd_create_table_users);
    new_db.exec(cmd_create_table_stations);

    for (const usr of default_user_db)
    {
        new_db.run('INSERT INTO users VALUES (null, ?, ?, ?, ?)', usr);

    }

    for (const station of default_station_db)
    {
        new_db.run('INSERT INTO stations VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null)', station);

    }
}


console.log("This is DANGEROUS territory. Executing this file will DELETE ALL EXISTING DATABASE DATA and replace it with default values.")
console.log("If you are absolutely sure you want to do it, uncomment the line bellow and run the file again.")

// create_databases(); // uncomment to run
