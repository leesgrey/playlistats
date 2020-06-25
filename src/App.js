import React, { Component } from 'react';
import * as $ from "jquery";
import PlaylistSidebar from "./PlaylistSidebar"
import hash from "./hash";
import logo from './logo.svg';
import './App.css';

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "308136625304484d92879d69e98ccd89";
const redirectUri = "http://localhost:3000";
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
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getPlaylists(_token);
    }
  }

  getPlaylists(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true
          });
          return;
        }
        this.setState({
          playlists: data.items
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <PlaylistSidebar playlists={this.state.playlists}/>
          )}
        </header>
      </div>
    )
  }
}

export default App;
