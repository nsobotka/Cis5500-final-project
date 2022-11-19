import numpy as np
import pandas as pd
from pandas import DataFrame


# first deal with genres
def genres():
    col_names = ['mbid', 'artist_mb', 'artist_lastfm', 'country_mb', 'country_lastfm', 'tags_mb',
                'tags_lastfm', 'listeners_lastfm', 'scrobbles_lastfm', 'ambiguous_artist']
    genres = pd.read_csv('artists.csv', header=None, names=col_names, dtype={'mbid': 'str', 'artist_mb': 'str', 'artist_lastfm': 'str', 'country_mb': 'str', 'countr_lastfm': 'str', 'tags_mb': 'str', 
    'tags_lastfm': 'str', 'listeners_lastfm': 'str', 'scrobbles_lastfm': 'str', 'ambiguous_artist': 'str'}, low_memory=False)

    genres = genres.drop(columns=['mbid', 'artist_lastfm', 'country_lastfm', 'tags_mb', 'scrobbles_lastfm', 'ambiguous_artist'])
    genres = genres.drop([0])
    genres = genres.dropna()
    # genres is already sorted by listeners_lastfm I believe
    # genres = genres.sort_values('listeners_lastfm', ascending=False)
    genres = genres.drop_duplicates(subset='artist_mb', keep='first')

    print(genres.head())
    genres.to_csv('genres_processed.csv', index=False)

# genres()

def songs():
    col_names = ['id', 'name', 'album', 'album_id', 'artists', 'artist_ids',
                'track_number', 'disk_number', 'explicit', 'danceability', 
                'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness',
                'instrumentalness', 'liveness', 'valence', 'tempo',
                'duration_ms', 'time_signature', 'year', 'release_date']
    songs = pd.read_csv('tracks_features.csv', header=None, names=col_names, low_memory=False)
    songs = songs.drop([0])
    songs = songs.drop(columns=['year', 'track_number', 'disk_number'])

    songs = songs.dropna()

    songsDict = {}
    songsNew = pd.DataFrame(columns = ['id', 'name', 'album_id', 'artist_id',
                'explicit', 'danceability', 
                'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness',
                'instrumentalness', 'liveness', 'valence', 'tempo',
                'duration_ms', 'time_signature'])

    albumsDict = {}
    albums = pd.DataFrame(columns = ['album', 'album_id', 'release_date'])

    artistDict = {}
    artists = pd.DataFrame(columns = ['artist', 'artist_id'])
    # split songs apart by multiple artists
    counter = 0
    for i in songs.index:
        splitArtists = songs['artists'][i].strip('\'`][')
        splitArtists = splitArtists.replace("'", "")
        splitArtists = splitArtists.split(",")
        splitArtistsId = songs['artist_ids'][i].strip('\'`][')
        splitArtistsId = splitArtistsId.replace("'", "")
        splitArtistsId = splitArtistsId.split(",")
        if (len(splitArtists) != len(splitArtistsId)):
            continue
        for j in range(len(splitArtists)):
            splitArtists[j] = splitArtists[j].lstrip()
            splitArtistsId[j] = splitArtistsId[j].lstrip()
        albumsDict[counter] = {'album': songs['album'][i], 'album_id': songs['album_id'][i], 'release_date': songs['release_date'][i]}
        if len(splitArtists) > 1:
            for j in range(len(splitArtists)):
                artistDict[counter] = {'artist': splitArtists[j], 'artist_id': splitArtistsId[j]}
                songsDict[counter] = {'id': songs['id'][i], 'name': songs['name'][i], 'album_id': songs['album_id'][i], 'artist_ids': splitArtistsId[j], 'explicit': songs['explicit'][i], 'danceability': songs['danceability'][i],
                                    'energy': songs['energy'][i], 'key': songs['key'][i], 'loudness': songs['loudness'][i], 'mode': songs['mode'][i], 'speechiness': songs['speechiness'][i], 'acousticness': songs['acousticness'][i], 'instrumentalness': songs['instrumentalness'][i], 
                                    'liveness': songs['liveness'][i], 'valence': songs['valence'][i], 'tempo': songs['tempo'][i], 'duration_ms': songs['duration_ms'][i], 'time_signature': songs['time_signature'][i]}
                counter = counter + 1
        else: 
            artistDict[counter] = {'artist': splitArtists[0], 'artist_id': splitArtistsId[0]}
            songsDict[counter] = {'id': songs['id'][i], 'name': songs['name'][i], 'album_id': songs['album_id'][i], 'artist_ids': splitArtistsId[0], 'explicit': songs['explicit'][i], 'danceability': songs['danceability'][i],
                                    'energy': songs['energy'][i], 'key': songs['key'][i], 'loudness': songs['loudness'][i], 'mode': songs['mode'][i], 'speechiness': songs['speechiness'][i], 'acousticness': songs['acousticness'][i], 'instrumentalness': songs['instrumentalness'][i], 
                                    'liveness': songs['liveness'][i], 'valence': songs['valence'][i], 'tempo': songs['tempo'][i], 'duration_ms': songs['duration_ms'][i], 'time_signature': songs['time_signature'][i]}
            counter = counter + 1

    albums = DataFrame.from_dict(albumsDict, "index")
    artists = DataFrame.from_dict(artistDict, "index")
    songsNew = DataFrame.from_dict(songsDict, "index")
    albums = albums.drop_duplicates()
    artists = artists.drop_duplicates()
    albums.to_csv('albums_processed.csv', index=False)
    artists.to_csv('artists_processed.csv', index=False)
    songsNew.to_csv('songs_processed.csv', index=False)
    return

# songs()

def artists():
    pass

def album_info():
    pass



def charts():
    # This is complicated because we want to add song_id and artist_id from the previous two tables into this table.
    pass

