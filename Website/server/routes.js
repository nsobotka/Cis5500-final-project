const config = require('./config.json')
const mysql = require('mysql');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

//Query 1
async function tags_by_region(req, res) {
    const country = req.query.country ? req.query.country : '';

    if (country != '') {
        connection.query(`WITH tags AS (
                SELECT country_mb, tags_lastfm, COUNT(tags_lastfm) as popularity
                FROM Genre USE INDEX (genre_country_tags)
                WHERE country_mb = '${country}'
                GROUP BY tags_lastfm
                ORDER BY popularity DESC
            )
            SELECT *
            FROM tags
            GROUP BY country_mb;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        connection.query(`WITH tags AS (
            SELECT country_mb, tags_lastfm, COUNT(tags_lastfm) as popularity
            FROM Genre USE INDEX (genre_country_tags)
            GROUP BY tags_lastfm, country_mb
            ORDER BY popularity DESC
        )
        SELECT *
        FROM tags
        GROUP BY country_mb;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Query 2
async function artists_from(req, res) {
    const country = req.query.country ? req.query.country : '';
    //handle /artist_from query
    if (req.query.page && !isNaN(req.query.page)) {
        //if a page attribute (with an optional pagesize attribute) was passed
        const page = req.query.page
        const pagesize = (req.query.pagesize && !isNaN(req.query.pagesize)) ? req.query.pagesize : 10
        connection.query(`WITH Popular_Artists_By_Country AS (
                            SELECT Genre.country_mb, Genre.artist_mb, Genre.listeners_lastfm as num_listeners
                            FROM Genre USE INDEX (genre_country_artist_listeners)
                            GROUP BY country_mb, num_listeners
                            ORDER BY num_listeners DESC
                        )
                        SELECT * FROM Popular_Artists_By_Country GROUP BY country_mb
                        LIMIT ${pagesize} OFFSET ${(page - 1) * pagesize}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        if (country === '') {
            connection.query(`WITH Popular_Artists_By_Country AS (
                            SELECT Genre.country_mb, Genre.artist_mb, Genre.listeners_lastfm as num_listeners
                            FROM Genre USE INDEX (genre_country_artist_listeners)
                            GROUP BY country_mb, num_listeners
                            ORDER BY num_listeners DESC
                        )
                        SELECT * FROM Popular_Artists_By_Country GROUP BY country_mb`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            connection.query(`WITH Popular_Artists_By_Country AS (
                            SELECT Genre.country_mb, Genre.artist_mb, Genre.listeners_lastfm as num_listeners
                            FROM Genre USE INDEX (genre_country_artist_listeners)
                            WHERE country_mb = '${country}'
                            GROUP BY country_mb, num_listeners
                            ORDER BY num_listeners DESC
                        )
                        SELECT * FROM Popular_Artists_By_Country GROUP BY country_mb`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    }
}


//Query 3
async function top_year_albums(req, res) {
    const year = req.query.year ? req.query.year : 2020
    const region = req.query.region1 ? req.query.region1 : 'United States'
    
    connection.query(`WITH filtered_albums AS (
        SELECT album, album_id, release_date
        FROM Album_Info USE INDEX (album_id_name_date)
        WHERE SUBSTR(Album_Info.release_date, 1, 4) = '${year}'
    ),
    filtered_charts AS (
        SELECT artist, title
        FROM Charts USE INDEX (chart_all_attr)
        WHERE region = '${region}'
    ),
    Most_Popular_Artists AS (
        SELECT Artists.artist_id, Artists.artist, title, count(Artists.artist) as num
        FROM Artists JOIN filtered_charts C on Artists.artist = C.artist
        GROUP BY Artists.artist_id, C.title
    )
    SELECT DISTINCT artist, album, release_date
    FROM filtered_albums JOIN Songs S USE INDEX (songs_album_artist) on filtered_albums.album_id = S.album_id
                         JOIN Most_Popular_Artists ON Most_Popular_Artists.artist_id = S.artist_id`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
        });
}

//Query 4
async function get_song_attribute_range(req, res) {
    const min_danceability = req.query.min_danceability ? req.query.min_danceability : 0.2;
    const max_danceability = req.query.max_danceability ? req.query.max_danceability : 0.8;
    const min_energy = req.query.min_energy ? req.query.min_energy : 0.2;
    const max_energy = req.query.max_energy ? req.query.max_energy : 0.9;
    const min_loudness = req.query.min_loudness ? req.query.min_loudness : 0.2;
    const max_loudness = req.query.max_loudness ? req.query.max_loudness : 0.8;
    const min_speechiness = req.query.min_speechiness ? req.query.min_speechiness : 0.1;
    const max_speechiness = req.query.max_speechiness ? req.query.max_speechiness : 0.8;
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

// Query 5
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
                            AND Genre.artist_mb REGEXP '[A-Za-z0-9.,-]'
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
                        AND Genre.artist_mb REGEXP '[A-Za-z0-9.,-]'
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

//Query 6
async function get_related_songs(req, res) {
    const input_song = req.query.input_song ? req.query.input_song : 'Bohemian Rhapsody'
    const input_artist = req.query.input_artist ? req.query.input_artist : 'Queen'
    connection.query(`WITH Input_Song AS (
        SELECT Songs.name_, A.artist, Songs.artist_id
        FROM Songs JOIN Artists A on Songs.artist_id = A.artist_id
        WHERE Songs.name_ = '${input_song}' AND A.artist LIKE '%${input_artist}%'
        LIMIT 1
    ), Input_Song_Genre AS (
        SELECT Genre.artist_mb, SUBSTRING_INDEX(tags_lastfm, ';', 2) as genre_tags
        FROM Genre JOIN Input_Song ON Genre.artist_mb = artist
        LIMIT 1
    ), Similar_Artists AS (
        SELECT Genre.artist_mb, Genre.tags_lastfm, listeners_lastfm
        FROM Genre, Input_Song_Genre
        WHERE Genre.tags_lastfm LIKE CONCAT('%', Input_Song_Genre.genre_tags, '%') AND
          Genre.artist_mb != Input_Song_Genre.artist_mb
        ORDER BY listeners_lastfm DESC
        LIMIT 5 # this parameter can also be user determined
    ), Similar_Artists_Songs AS (
        SELECT title, artist, COUNT(title) as chart_freq
        FROM Charts USE INDEX (chart_title_artist) JOIN Similar_Artists ON Charts.artist = Similar_Artists.artist_mb
        GROUP BY title, artist
        ORDER BY chart_freq DESC
    )
    SELECT * FROM Similar_Artists_Songs GROUP BY(artist);`, function (error, results, fields) {

    if (error) {
        console.log(error)
        res.json({ error: error })
    } else if (results) {
        res.json({ results: results })
    }
    });
}

// QUERY 7:
async function get_top_artists_in_region(req, res) {
    const region = req.query.region ? req.query.region : 'United States'
    const date = req.query.date ? req.query.date : '2020'
    connection.query(`SELECT artist, COUNT(artist) AS artist_freq
                    FROM Charts USE INDEX(chart_all_but_title)
                    WHERE SUBSTR(date_, 1, 4) = '${date}'
                    AND region = '${region}'
                    GROUP BY artist
                    ORDER BY artist_freq DESC
                    LIMIT 5;`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Query 8
async function get_song_key_time(req, res) {
    const input_song = req.query.input_song ? req.query.input_song : 'Bohemian Rhapsody'
    const input_artist = req.query.input_artist ? req.query.input_artist : 'Queen'
    connection.query(`WITH Input_Song AS (
                SELECT Songs.artist_id, Songs.key_, Songs.time_signature
                                    FROM Songs USE INDEX (songs_artist_key_time) JOIN Artists A on Songs.artist_id = A.artist_id
                                    WHERE name_ = '${input_song}' and A.artist LIKE '%${input_artist}%'
                                    LIMIT 1
            ), new_songs AS (
                SELECT Songs.name_, Songs.key_, Songs.time_signature, Songs.artist_id
                FROM Songs USE INDEX (songs_artist_key_time), Input_Song
                WHERE Songs.key_ = Input_Song.key_ AND Songs.time_signature = Input_Song.time_signature
                AND SUBSTR(Songs.name_, 1, 1) REGEXP '^[A-z]+$'
            )
            SELECT DISTINCT new_songs.name_, Artists.artist
            FROM new_songs JOIN Artists ON new_songs.artist_id = Artists.artist_id, Input_Song
            WHERE SUBSTR(Artists.artist, 1, 1) REGEXP '^[A-z]+$'
            LIMIT 500`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Query 9
async function artist_song_type_popularity(req, res) {
    const artist = req.query.artist ? req.query.artist : 'Eminem'
    const similarity = req.query.similarity ? req.query.similarity : 0.1
    connection.query(`WITH Input_Song AS (
                    SELECT Songs.artist_id, A.artist, Songs.danceability, Songs.key_, Songs.time_signature
                    FROM Songs USE INDEX (songs_artist_key_time) JOIN Artists A on Songs.artist_id = A.artist_id
                    WHERE A.artist = '${artist}'
                    LIMIT 1
                ),
                Input_Song_Region AS (
                    SELECT country_mb, Input_Song.danceability
                    FROM Genre USE INDEX (genre_artist) JOIN Input_Song ON Genre.artist_mb = Input_Song.artist
                ),
                Genre_By_country AS (
                    SELECT artist_mb
                    FROM Genre USE INDEX (genre_artist_country) JOIN Input_Song_Region ON Genre.country_mb = Input_Song_Region.country_mb
                ),
                Songs_By_Danceability AS (
                SELECT name_ as name, artist_id
                FROM Songs USE INDEX (songs_artist_dance_name), Input_Song_Region
                WHERE Songs.danceability >= Input_Song_Region.danceability - ${similarity}# User defined similarity score
                AND Songs.danceability <= Input_Song_Region.danceability + ${similarity}
                AND Songs.name_ REGEXP '^[A-Za-z0-9.,-]+$'
            ),
            Songs_Same_Danceability_Region AS (
                SELECT DISTINCT name
                FROM Songs_By_Danceability
                JOIN Artists USE INDEX (artists_all_attr) ON Songs_By_Danceability.artist_id = Artists.artist_id JOIN Genre_By_country G on Artists.artist = G.artist_mb
            ),
            Freq_Song_On_Chart AS (
                SELECT chart, region, title, COUNT(date_) as chart_appearances
                FROM Charts USE INDEX (chart_all_attr) JOIN Songs_Same_Danceability_Region ON Charts.title = Songs_Same_Danceability_Region.name
                GROUP BY title, chart, region
                ORDER BY chart_appearances DESC
            )
            SELECT chart, region, AVG(chart_appearances) as avg_appearances
            FROM Freq_Song_On_Chart
            GROUP BY chart, region
            ORDER BY avg_appearances DESC;`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Query 10
async function albums_region_chart(req, res) {
    const region = req.query.region ? req.query.region : 'United States'
    const chart = req.query.chart ? req.query.chart : 'viral50'
    const year = req.query.year ? req.query.year : '2017'
    connection.query(`WITH song_count AS (
        SELECT title, artist, COUNT(date_) as chart_appearances
        FROM Charts USE INDEX (chart_all_attr)
        WHERE region = '${region}' AND chart = '${chart}'
        GROUP BY title, artist
    ),
    Album_year AS (
        SELECT album_id, album, release_date
        FROM Album_Info
        WHERE SUBSTR(release_date, 1, 4) = '${year}'
    ),
    Albums_Of_Chart_Songs AS (
        SELECT song_count.title, song_count.artist, album, release_date, song_count.chart_appearances
        FROM Album_year
        JOIN Songs S USE INDEX (songs_album_artist) ON Album_year.album_id = S.album_id
        JOIN Artists A USE INDEX (artists_all_attr) on S.artist_id = A.artist_id
        JOIN song_count on A.artist = song_count.artist AND S.name_ = song_count.title
    ),
    Freq_Song_And_Album_On_Chart AS (
        SELECT album, artist, release_date, SUM(chart_appearances) as album_chart_appearances
        FROM Albums_Of_Chart_Songs
        GROUP BY album
    )
    SELECT * FROM Freq_Song_And_Album_On_Chart
    ORDER BY album_chart_appearances DESC
    LIMIT 5;`, function (error, results, fields) {

    if (error) {
        console.log(error)
        res.json({ error: error })
    } else if (results) {
        res.json({ results: results })
    }
    });
}

module.exports = {
    get_similar_artists,
    artists_from,
    get_song_key_time,
    get_song_attribute_range,
    get_related_songs,
    top_year_albums,
    albums_region_chart,
    get_top_artists_in_region,
    tags_by_region,
    artist_song_type_popularity
}