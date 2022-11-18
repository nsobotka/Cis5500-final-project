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