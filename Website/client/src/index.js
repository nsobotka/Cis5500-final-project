import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import SongsPage from './pages/SongsPage';
import AlbumPage from './pages/AlbumPage';
import MapPage from './pages/MapPage';

// renders the pages at the following urls
ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
          path="/map"
          render={() => (
            <MapPage />
          )} />
        <Route exact
            path="/artists"
            render={() => (
              <ArtistsPage />
            )} />
        <Route exact
          path="/songs"
          render={() => (
            <SongsPage />
          )} />
        <Route exact
          path="/albums"
          render={() => (
            <AlbumPage />
          )} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

