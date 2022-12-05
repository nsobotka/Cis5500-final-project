// import { count } from 'console'
import config from './config.json'

const getSimilarArtists = async (artist_mb, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?artist_mb=${artist_mb}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('fetcher: getSimilarArtists')
    return res.json()
}

const getArtistsFrom = async (country, date, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists_from?country=${country}&date=${date}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('fetcher: getArtistsFrom')
    return res.json()
}

const getSongAttributeRange = async (minDanceability, maxDanceability, minEnergy, maxEnergy, minLoudness, maxLoudness, minSpeechiness, maxSpeechiness) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs_range?min_danceability=${minDanceability}&max_danceability=${maxDanceability}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_loudness=${minLoudness}&max_loudness=${maxLoudness}&min_speechiness=${minSpeechiness}&max_speechiness=${maxSpeechiness}`, {
        method: 'GET',
    })
    console.log('fetcher: getSongAttributeRange')
    return res.json()
};

const getSongKeyTime = async (input_song, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?input_song=${input_song}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('fetcher: getSongKeyTime')
    return res.json()
}

const getRelatedSongs = async (input_song) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/related_songs?input_song=${input_song}`, {
        method: 'GET',
    })
    console.log('fetcher: getRelatedSongs')
    return res.json()
}

const getTopYearAlbums = async (year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top_year_albums?year=${year}`, {
        method: 'GET',
    })
    console.log('fetcher: getTopYearAlbums')
    return res.json()
}

const getAlbumsRegionChart = async(region, chart) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/albums_region_chart?region=${region}&chart=${chart}`, {
        method: 'GET',
    })
    console.log('fetcher: getAlbumsRegionChart')
    return res.json()
}

export {
    getSimilarArtists,
    getArtistsFrom,
    getSongKeyTime,
    getSongAttributeRange,
    getRelatedSongs,
    getTopYearAlbums,
    getAlbumsRegionChart
}