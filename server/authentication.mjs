export function route_auth(req, res)
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

export function route_login(req, res)
{
    if (req.session.is_authenticated)
        res.redirect('/index.html');
    else
    {
        let invalid_attempt = req.session.invalid_login_attempt;
        res.render("login", {invalid_attempt: invalid_attempt});
    }
}

export function route_logout(req, res)
{
    req.session.is_authenticated = false;
    req.session.username = null;
    res.redirect('/index.html');
}
