// import { count } from 'console'
import config from './config.json'

const getSimilarArtists = async (artist_mb, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?artist_mb=${artist_mb}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistsFrom = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists_from`, {
        method: 'GET',
    })
    return res.json()
}
const getArtistsFrom2 = async (country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists_from?country=${country}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongAttributeRange = async (minDanceability, maxDanceability, minEnergy, maxEnergy, minLoudness, maxLoudness, minSpeechiness, maxSpeechiness) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs_range?min_danceability=${minDanceability}&max_danceability=${maxDanceability}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_loudness=${minLoudness}&max_loudness=${maxLoudness}&min_speechiness=${minSpeechiness}&max_speechiness=${maxSpeechiness}`, {
        method: 'GET',
    })
    return res.json()
};

const getSongKeyTime = async (input_song, input_artist) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?input_song=${input_song}&input_artist=${input_artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getRelatedSongs = async (input_song, input_artist) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/related_songs?input_song=${input_song}&input_artist=${input_artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getTopYearAlbums = async (year, region1) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top_year_albums?year=${year}&region1=${region1}`, {
        method: 'GET',
    })
    return res.json()
}

const getAlbumsRegionChart = async(region, chart, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/albums_region_chart?region=${region}&chart=${chart}&year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const getTopArtistsInRegion = async (region, date) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top5_artists_in?region=${region}&date=${date}`, {
        method: 'GET',
    })
    return res.json()
}
const tagsByRegion = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tags_by_region`, {
        method: 'GET',
    })
    return res.json()
}
const tagsByRegion2 = async (country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tags_by_region?country=${country}`, {
        method: 'GET',
    })
    return res.json()
}

const artistSongTypePopularity = async (artist, similarity) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artist_song_type?artist=${artist}&similarity=${similarity}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getSimilarArtists,
    getArtistsFrom,
    getSongKeyTime,
    getSongAttributeRange,
    getRelatedSongs,
    getTopYearAlbums,
    getAlbumsRegionChart,
    getTopArtistsInRegion,
    tagsByRegion,
    artistSongTypePopularity, 
    tagsByRegion2, 
    getArtistsFrom2
}