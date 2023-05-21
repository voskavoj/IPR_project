export function route_auth(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    let auth_level = authenticate_user(username, password);

    if (auth_level)
    {
        log_in_user(req, username, auth_level);
        res.redirect('/index');
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

/**
 * Search database for username, password combination
 *
 * Return level of authentication:
 *      0: no user or invalid credentials
 *      1: user
 *      2: manager
 *      3: admin
 * **/
function authenticate_user(username, password)
{
    // todo DB

    if (password === "usr")
        return 1;
    else if (password === "man")
        return 2;
    else if (password === "adm")
        return 3;
    else
        return 0;
}

export function route_login(req, res)
{
    if (is_authenticated(req))
        res.redirect('/index');
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

export function route_register(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    if (is_username_available(username))
    {
        if (add_new_user(username, password)) // add to DB ok
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

function is_username_available(username)
{
    // todo DB
    if (username === "reserved") // testing
        return false

    return true
}

function add_new_user(username, password)
{
    // todo DB
    return true;
}