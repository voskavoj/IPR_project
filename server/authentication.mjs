import {add_new_user, authenticate_user, is_username_available} from "./database/database.mjs";

export async function route_auth(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    let auth_level = await authenticate_user(username, password);

    if (auth_level)
    {
        log_in_user(req, username, auth_level);
        res.redirect('/manage');
    }
    else
    {
        req.session.invalid_login_attempt = true;
        res.redirect('/login');
    }
}

function log_in_user(req, username, auth_level)
{
    req.session.is_authenticated = true;
    req.session.auth_level = auth_level;
    req.session.username = username;
    req.session.invalid_login_attempt = false;
}

export function route_login(req, res)
{
    if (is_authenticated(req))
        res.redirect('/manage');
    else
    {
        res.render("login", {invalid_attempt: req.session.invalid_login_attempt});
    }
}

export function route_logout(req, res)
{
    req.session.is_authenticated = false;
    req.session.auth_level = 0;
    req.session.username = null;
    res.redirect('/index');
}

export function is_authenticated(req, required_level=1)
{
    return (req.session.is_authenticated && req.session.auth_level >= required_level)
}

export async function route_register(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    if (await is_username_available(username))
    {
        if (await add_new_user(username, password)) // add to DB ok
        {
            req.session.invalid_login_attempt = false;
            log_in_user(req, username, 1);
            res.redirect("index");
        }
        else
        {
            req.session.invalid_login_attempt = true;
            res.redirect("login");
        }

    }
    else
    {
        req.session.invalid_login_attempt = true;
        res.redirect("login");
    }
}
