const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

async function get_artists(req, res) {
    const artist = req.query.artist_mb ? req.query.artist_mb : 'Snoop Dogg'
    //handle /top_artist_count query
    if (req.query.page && !isNaN(req.query.page)) {
        //if a page attribute (with an optional pagesize attribute) was passed
        const page = req.query.page
        const pagesize = (req.query.pagesize && !isNaN(req.query.pagesize)) ? req.query.pagesize : 10
        connection.query(`WITH Bruno_Mars_Genres AS (
                            SELECT artist_mb, tags_lastfm
                            FROM Genre USE INDEX (genre_artist_tags)
                            WHERE artist_mb = '${artist}'
                        )
                        SELECT Genre.artist_mb, Genre.tags_lastfm, listeners_lastfm
                        FROM Genre USE INDEX (genre_artist_tags), Bruno_Mars_Genres
                        WHERE Genre.tags_lastfm LIKE CONCAT('%', SUBSTRING_INDEX(Bruno_Mars_Genres.tags_lastfm, ';', 2), '%') AND
                            Genre.artist_mb != Bruno_Mars_Genres.artist_mb
                        ORDER BY listeners_lastfm DESC
                        LIMIT ${pagesize} OFFSET ${(page - 1) * pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`WITH Bruno_Mars_Genres AS (
                        SELECT artist_mb, tags_lastfm
                        FROM Genre USE INDEX (genre_artist_tags)
                        WHERE artist_mb = '${artist}'
                    )
                    SELECT Genre.artist_mb, Genre.tags_lastfm, listeners_lastfm
                    FROM Genre USE INDEX (genre_artist_tags), Bruno_Mars_Genres
                    WHERE Genre.tags_lastfm LIKE CONCAT('%', SUBSTRING_INDEX(Bruno_Mars_Genres.tags_lastfm, ';', 2), '%') AND
                        Genre.artist_mb != Bruno_Mars_Genres.artist_mb
                    ORDER BY listeners_lastfm DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function get_similar_artists(req, res) {
    const artist = req.query.artist_mb ? req.query.artist_mb : 'Bruno Mars'
    //handle /top_artist_count query
    if (req.query.page && !isNaN(req.query.page)) {
        //if a page attribute (with an optional pagesize attribute) was passed
        const page = req.query.page
        const pagesize = (req.query.pagesize && !isNaN(req.query.pagesize)) ? req.query.pagesize : 10
        connection.query(`WITH Bruno_Mars_Genres AS (
                            SELECT artist_mb, tags_lastfm
                            FROM Genre USE INDEX (genre_artist_tags)
                            WHERE artist_mb = '${artist}'
                        )
                        SELECT Genre.artist_mb, Genre.tags_lastfm, listeners_lastfm
                        FROM Genre USE INDEX (genre_artist_tags), Bruno_Mars_Genres
                        WHERE Genre.tags_lastfm LIKE CONCAT('%', SUBSTRING_INDEX(Bruno_Mars_Genres.tags_lastfm, ';', 2), '%') AND
                            Genre.artist_mb != Bruno_Mars_Genres.artist_mb
                        ORDER BY listeners_lastfm DESC
                        LIMIT ${pagesize} OFFSET ${(page - 1) * pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`WITH Bruno_Mars_Genres AS (
                        SELECT artist_mb, tags_lastfm
                        FROM Genre USE INDEX (genre_artist_tags)
                        WHERE artist_mb = '${artist}'
                    )
                    SELECT Genre.artist_mb, Genre.tags_lastfm, listeners_lastfm
                    FROM Genre USE INDEX (genre_artist_tags), Bruno_Mars_Genres
                    WHERE Genre.tags_lastfm LIKE CONCAT('%', SUBSTRING_INDEX(Bruno_Mars_Genres.tags_lastfm, ';', 2), '%') AND
                        Genre.artist_mb != Bruno_Mars_Genres.artist_mb
                    ORDER BY listeners_lastfm DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

//Query 4
async function get_song_attribute_range(req, res) {
    const min_danceability = req.query.min_danceability ? req.query.min_danceability : 0.0;
    const max_danceability = req.query.max_danceability ? req.query.max_danceability : 1.0;
    const min_energy = req.query.min_energy ? req.query.min_energy : 0.0;
    const max_energy = req.query.max_energy ? req.query.max_energy : 1.0;
    const min_loudness = req.query.min_loudness ? req.query.min_loudness : 0.0;
    const max_loudness = req.query.max_loudness ? req.query.max_loudness : 1.0;
    const min_speechiness = req.query.min_speechiness ? req.query.min_speechiness : 0.0;
    const max_speechiness = req.query.max_speechiness ? req.query.max_speechiness : 1.0;
    connection.query(`WITH filtered_songs AS (
        SELECT name_, artist_id, danceability, energy, speechiness, loudness
        FROM Songs USE INDEX (songs_all_attr)
        WHERE danceability >= ${min_danceability} AND danceability <= ${max_danceability} AND
          energy >= ${min_energy} AND energy <= ${max_energy} AND
          loudness >= ${min_loudness} AND loudness <= ${max_loudness} AND
          speechiness >= ${min_speechiness} AND speechiness <= ${max_speechiness}
    )
    SELECT filtered_songs.name_, A.artist, danceability, energy, speechiness, loudness
    FROM filtered_songs JOIN Artists A USE INDEX (artists_all_attr) on filtered_songs.artist_id = A.artist_id;`, function (error, results, fields) {

    if (error) {
        console.log(error)
        res.json({ error: error })
    } else if (results) {
        res.json({ results: results })
    }
    });
}

//Query 6
async function get_song_key_time(req, res) {
    const input_song = req.query.input_song ? req.query.input_song : 'Hymn for the Weekend'
    //handle /top_artist_count query
    if (req.query.page && !isNaN(req.query.page)) {
        //if a page attribute (with an optional pagesize attribute) was passed
        const page = req.query.page
        const pagesize = (req.query.pagesize && !isNaN(req.query.pagesize)) ? req.query.pagesize : 10
        connection.query(`WITH Input_Song AS (
                        SELECT Songs.artist_id, Songs.key_, Songs.time_signature
                        FROM Songs USE INDEX (songs_artist_key_time)
                        WHERE name_ = '${input_song}'
                        LIMIT 1
                    )
                    SELECT DISTINCT name_, Artists.artist, Songs.key_, Songs.time_signature
                    FROM Songs USE INDEX (songs_artist_key_time) JOIN Artists ON Songs.artist_id = Artists.artist_id, Input_Song
                    WHERE Songs.key_ = Input_Song.key_ AND Songs.time_signature = Input_Song.time_signature
                    AND SUBSTR(Songs.name_, 1, 1) REGEXP '^[A-z]+$'
                    AND SUBSTR(Artists.artist, 1, 1) REGEXP '^[A-z]+$'
                        LIMIT ${pagesize} OFFSET ${(page - 1) * pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`WITH Input_Song AS (
                        SELECT Songs.artist_id, Songs.key_, Songs.time_signature
                        FROM Songs USE INDEX (songs_artist_key_time)
                        WHERE name_ = '${input_song}'
                        LIMIT 1
                    )
                    SELECT DISTINCT name_, Artists.artist, Songs.key_, Songs.time_signature
                    FROM Songs USE INDEX (songs_artist_key_time) JOIN Artists ON Songs.artist_id = Artists.artist_id, Input_Song
                    WHERE Songs.key_ = Input_Song.key_ AND Songs.time_signature = Input_Song.time_signature
                    AND SUBSTR(Songs.name_, 1, 1) REGEXP '^[A-z]+$'
                    AND SUBSTR(Artists.artist, 1, 1) REGEXP '^[A-z]+$'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

module.exports = {
    get_similar_artists,
    get_song_key_time,
    get_song_attribute_range,
}