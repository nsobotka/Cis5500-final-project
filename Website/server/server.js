const express = require('express');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//register all routes as GET
app.get('/artists', routes.get_similar_artists)
app.get('/artists_from', routes.artists_from)
app.get('/songs', routes.get_song_key_time)
app.get('/songs_range', routes.get_song_attribute_range)
app.get('/related_songs', routes.get_related_songs)
app.get('/top_year_albums', routes.top_year_albums)
app.get('/albums_region_chart', routes.albums_region_chart)
app.get('/top5_artists_in', routes.get_top_artists_in_region)
app.get('/tags_by_region', routes.tags_by_region)
app.get('/artist_song_type', routes.artist_song_type_popularity)

//start server
app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
