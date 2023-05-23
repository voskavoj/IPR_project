export function route_contacts(req, res)
{
    res.render("contacts");
}

export function route_products(req, res)
{
    res.render("products", {});
}

export function route_contact_form(req, res)
{
    // todo
    res.redirect("index");
}

export function route_station_404(req, res)
{
    res.render("station_404", {});
}
