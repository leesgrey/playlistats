// tutorial by Joe Karlsson
import React, { Component } from 'react';
import * as $ from "jquery";
import Player from "./Player";
import hash from "./hash";
import logo from './logo.svg';
import './App.css';

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "308136625304484d92879d69e98ccd89";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state"
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: ""}],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false
    }
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    }

    this.tick();
    // poll every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization" , "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true
          });
          return;
        }
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player item={this.state.item} is_playing={this.state.is_playing} progress_ms={this.progress_ms}/>
          )}
        </header>
      </div>
    )
  }
}

export default App;
