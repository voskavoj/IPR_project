// Module imports
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import session from "express-session";

// File imports
import {route_auth, route_login, route_logout} from "./server/authentication.mjs"

// Server setup
const app = express()
const router = express.Router();
const port = process.env.PORT || '3001';

app.use(express.static('page')) // static content folder
app.use(bodyParser.urlencoded({ extended: false })); // to parse forms
app.use(session({secret: 'secret', resave: true, saveUninitialized: true})); // to manage auth session
app.use(router);

// Template setup
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Routes
router.route("/auth").post(route_auth);
router.route('/login').get(route_login);
router.route('/logout').get(route_logout);

// Server start
const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });
