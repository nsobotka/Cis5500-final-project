import config from './config.json'

const getSimilarArtists = async (artist_mb, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?artist_mb=${artist_mb}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('fetcher: getSimilarArtists')
    return res.json()
}

const getArtists = async (artist_mb, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?artist_mb=${artist_mb}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('fetcher: getArtists')
    return res.json()
}

const getSongKeyTime = async (input_song, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?input_song=${input_song}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('Result')
    return res.json()
}

export {
    getSimilarArtists,
    getSongKeyTime
}