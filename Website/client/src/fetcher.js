import config from './config.json'

// const getTopArtistCount = async (page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/top_artist_count/?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     console.log('Result')
//     return res.json()
// }

const getSimilarArtists = async (artist_mb, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?artist_mb=${artist_mb}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    console.log('Result')
    return res.json()
}

export {
    getSimilarArtists
}