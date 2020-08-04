import React, { Component } from 'react';
import PlaylistSidebar from "./PlaylistSidebar"
import hash from "./hash";
import './App.css';
import * as calls from "./Calls.js"

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "308136625304484d92879d69e98ccd89";

const redirectUri = "http://localhost:3000";
//*const redirectUri = "http://leesgrey.github.io/musichar";*//
const scopes = [
  "ugc-image-upload",
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private"
]

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      playlists: [],
      no_data: false
    }
    this.setPlaylists = this.setPlaylists.bind(this);
  }

  setPlaylists(data) {
    this.setState({
      playlists: data
    })
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    calls.getPlaylists(_token, this.setPlaylists);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <div id="landing">
              <h1>petalist</h1>
              <p>generate spotify playlist statistics and a bouquet to take with you</p>
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                log into spotify
              </a>
            </div>
          )}
          {this.state.token && (
            <div id="loginDisplay">
              <div id="header">
                <h1>petalist</h1>
              </div>
              <PlaylistSidebar token={this.state.token} playlists={this.state.playlists}/>
            </div>
          )}
        </header>
      </div>
    )
  }
}

export default App;
