// Module imports
import express from 'express';
import {ExpressHandlebars, engine } from 'express-handlebars';
import bodyParser from "body-parser";
import session from "express-session";

// File imports
import {route_auth, route_register, route_login, route_logout} from "./server/authentication.mjs"
import {route_manage, route_update_select_station, route_update_prices, route_update_points} from "./server/manage.mjs";
import {route_station} from "./server/station.mjs";
import {route_station_list} from "./server/station_list.mjs";
import {route_index} from "./server/index.mjs";
import {route_contact_form, route_contacts, route_products, route_station_404} from "./server/static_pages.mjs";
import {section_helper} from "./server/templates.mjs";
import {database_init} from "./server/database/database.mjs";

// Server setup
const app = express()
const router = express.Router();
const port = process.env.PORT || '3001';

app.use(express.static('page')) // static content folder
app.use(bodyParser.urlencoded({ extended: false })); // to parse forms
app.use(session({secret: 'secret', resave: true, saveUninitialized: true})); // to manage auth session
app.use(router);

// Template setup
app.engine('hbs', engine({extname: 'hbs',
                                    helpers: {section: section_helper}
                                    }));
app.set('view engine', 'hbs');
app.set('views', './views')


// Routes
router.route("/").get(route_index);
router.route("/login").get(route_login);
router.route("/logout").get(route_logout);
router.route("/manage").get(route_manage);
router.route("/station_list").get(route_station_list);
router.route("/station").get(route_station);
router.route("/index").get(route_index);
router.route("/contacts").get(route_contacts);
router.route("/products").get(route_products);
router.route("/station_404").get(route_station_404);

router.route("/auth").post(route_auth);
router.route("/auth_register").post(route_register);
router.route("/update_select_station").post(route_update_select_station);
router.route("/update_prices").post(route_update_prices);
router.route("/update_points").post(route_update_points);
router.route("/contact_form").post(route_contact_form);

// Server start
database_init();
const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });
