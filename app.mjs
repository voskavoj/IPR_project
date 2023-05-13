// Imports
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import session from "express-session";

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

function handle_authentication_request(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    if (authenticate_user(username, password))
    {
        req.session.is_authenticated = true;
        req.session.username = username;
        req.session.invalid_login_attempt = false;
        res.redirect('/index.html');
    }
    else
    {
        req.session.invalid_login_attempt = true;
        res.redirect('/login');
    }
    console.log(username, password);
}

function authenticate_user(username, password)
{
    // todo

    if (password === "1234")
        return true;
    else
        return false;
}

function route_login(req, res)
{
    if (req.session.is_authenticated)
        res.redirect('/index.html');
    else
    {
        let invalid_attempt = req.session.invalid_login_attempt;
        res.render("login", {invalid_attempt: invalid_attempt});
    }
}

function route_logout(req, res)
{
    req.session.is_authenticated = false;
    req.session.username = null;
    res.redirect('/index.html');
}


// Routes
router.route("/auth").post(handle_authentication_request);
router.route('/login').get(route_login);
router.route('/logout').get(route_logout);

// Server start
const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

