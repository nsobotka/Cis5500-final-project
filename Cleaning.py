import numpy as np
import pandas as pd


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

    songsNew = pd.DataFrame(columns = ['id', 'name', 'album', 'album_id', 'artists', 'artist_ids',
                'explicit', 'danceability', 
                'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness',
                'instrumentalness', 'liveness', 'valence', 'tempo',
                'duration_ms', 'time_signature', 'release_date'])

    count = 0
    for i in songs.index:
        print(i)
        print(songs.loc[[i]])
        print(songs['id'][i], songs['name'][i])
        length = len(songs['artists'][i].split(","))
        if length > 1:
            print(songs['artists'][i].split(","))
            # add a new row per artist name
            # songsNew = songsNew.append(songs[i])
        else: 
            songsNew = songsNew.append(songs.loc[[i]])
        #     continue
        
        count = count + 1
        if count > 4:
            break

    # print(songs.head())
    print(songsNew.head())
    pass

songs()

def artists():
    pass

def album_info():
    pass



def charts():
    # This is complicated because we want to add song_id and artist_id from the previous two tables into this table.
    pass

