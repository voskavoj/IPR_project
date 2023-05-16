export function route_auth(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    let auth_level = authenticate_user(username, password);

    if (auth_level)
    {
        req.session.is_authenticated = true;
        req.session.auth_level = auth_level;
        req.session.username = username;
        req.session.invalid_login_attempt = false;
        res.redirect('/index.html');
    }
    else
    {
        req.session.invalid_login_attempt = true;
        res.redirect('/login');
    }
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
        res.redirect('/index.html');
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
    res.redirect('/index.html');
}

export function is_authenticated(req, required_level=1)
{
    return (req.session.is_authenticated && req.session.auth_level >= required_level)
}
