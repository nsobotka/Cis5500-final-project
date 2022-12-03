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


// async function top_artist_count(req, res) {
//     //handle /top_artist_count query

//     if (req.query.page && !isNaN(req.query.page)) {
//         //if a page attribute (with an optional pagesize attribute) was passed
//         const page = req.query.page
//         const pagesize = (req.query.pagesize && !isNaN(req.query.pagesize))  ? req.query.pagesize : 10
//         connection.query(`SELECT region, COUNT(artist) AS top_artist_count
//         FROM Charts
//         GROUP BY region
//         ORDER BY top_artist_count DESC
//         LIMIT ${pagesize} OFFSET ${(page - 1) * pagesize}`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
   
//     } else {
//         // we have implemented this for you to see how to return results by querying the database
//         connection.query(`SELECT region, COUNT(artist) AS top_artist_count
//         FROM Charts
//         GROUP BY region
//         ORDER BY top_artist_count DESC`, function (error, results, fields) {
//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
//     }
// }

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
        // we have implemented this for you to see how to return results by querying the database
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

module.exports = {
    get_similar_artists,
}