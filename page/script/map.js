class Map
{
    constructor(html_element, map_data)
    {
        this.map = new L.map('map', {center: map_data.center, zoom: map_data.zoom});
        this.map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
        this.markers = [];

        for (const point of map_data.additional_points)
        {
            this.add_marker(point.gps, point.name);
        }
    }

    add_marker(gps, name="", circle_radius = 0)
    {
        let marker = L.marker(gps).addTo(this.map);
        if (name !== "")
            marker.bindPopup(name);
        if (circle_radius > 0)
            L.circle(gps, circle_radius).addTo(this.map);
        this.markers.push(marker);
    }

    display_user_position(position)
    {
        console.debug(position);
        let radius = Math.round(position.accuracy / 2);
        this.add_marker(position.latlng, "You are within " + radius + " meters from this point", radius);
        this.map.panTo(position.latlng);
    }
}
