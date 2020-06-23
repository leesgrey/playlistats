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
  "user-read-currently-playing";
  "user-read-playback-state";
]

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images
        }
      }
    }
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token;
      });
    }
  }

}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          //spotify player goes here
        )}
      </header>
    </div>
  )
}

export default App;
