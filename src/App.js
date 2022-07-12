import React, { Component } from 'react';
import PlaylistSidebar from "./PlaylistSidebar"
import hash from "./hash";
import './App.css';
import * as calls from "./Calls.js"

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "308136625304484d92879d69e98ccd89";

export const PAGE_SIZE = 50;

const redirectUri = "http://leesgrey.github.io/playlistats";

const scopes = [
  "ugc-image-upload",
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-read-private"
]

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      playlists: [],
      previous: null,
      next: null,
      no_data: false,
      pageNum: 0
    }
    this.setPlaylists = this.setPlaylists.bind(this);
    this.onPrevious= this.onPrevious.bind(this);
    this.onNext= this.onNext.bind(this);
  }

  setPlaylists(data, previous, next) {
    this.setState({
      playlists: data,
      previous: previous,
      next: next
    })
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    calls.getPlaylists(_token, this.setPlaylists, PAGE_SIZE * this.state.pageNum);
    }
  }

  onNext() {
    this.setState((prevState) => {
      calls.getPlaylists(hash.access_token, this.setPlaylists, this.state.next);

      return { pageNum: prevState.pageNum + 1 }
    })
  }

  onPrevious() {
    this.setState((prevState) => {
      calls.getPlaylists(hash.access_token, this.setPlaylists, this.state.previous);

      return { pageNum: prevState.pageNum - 1 }
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.token ? 
            <div id="loginDisplay">
              <PlaylistSidebar
                token={this.state.token}
                playlists={this.state.playlists}
                next={this.state.next}
                previous={this.state.previous}
                onNext={this.onNext}
                onPrevious={this.onPrevious}
                pageNum={this.state.pageNum + 1}
              />
            </div> :
            <div id="landing">
              <h1>playlistats</h1>
              <p>generate spotify playlist statistics (and some more features eventually maybe)</p>
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                log into spotify
              </a>
            </div>
          }
        </header>
      </div>
    )
  }
}

export default App;
