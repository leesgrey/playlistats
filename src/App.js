import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Component } from "react";
import PlaylistSidebar from "./PlaylistSidebar.js";
import hash from "./hash.js";
import "./App.css";
import * as calls from "./calls";
// auth
export const authEndpoint = "https://accounts.spotify.com/authorize";
//const redirectUri = "https://leesgrey.github.io/playlistats";
const redirectUri = "http://127.0.0.1:3000";
const clientId = "308136625304484d92879d69e98ccd89";
const scopes = [
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-read-private",
];
export const PAGE_SIZE = 50;
class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      playlists: [],
      previous: null,
      next: null,
      no_data: false,
      pageNum: 0,
    };
    this.setPlaylists = this.setPlaylists.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }
  setPlaylists(data, previous, next) {
    this.setState({
      playlists: data,
      previous: previous,
      next: next,
    });
  }
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token,
      });
      calls.getPlaylists(
        _token,
        this.setPlaylists,
        PAGE_SIZE * this.state.pageNum
      );
    }
  }
  onNext() {
    this.setState((prevState) => {
      calls.getPlaylists(hash.access_token, this.setPlaylists, this.state.next);
      return { pageNum: prevState.pageNum + 1 };
    });
  }
  onPrevious() {
    this.setState((prevState) => {
      calls.getPlaylists(
        hash.access_token,
        this.setPlaylists,
        this.state.previous
      );
      return { pageNum: prevState.pageNum - 1 };
    });
  }
  render() {
    return _jsx("div", {
      className: "App",
      children: _jsx("header", {
        className: "App-header",
        children: this.state.token
          ? _jsx("div", {
              id: "loginDisplay",
              children: _jsx(PlaylistSidebar, {
                token: this.state.token,
                playlists: this.state.playlists,
                next: this.state.next,
                previous: this.state.previous,
                onNext: this.onNext,
                onPrevious: this.onPrevious,
                pageNum: this.state.pageNum + 1,
              }),
            })
          : _jsxs("div", {
              id: "landing",
              children: [
                _jsx("h1", { children: "Playlistats" }),
                _jsx("p", { children: "generate spotify playlist statistics" }),
                _jsx("a", {
                  className: "btn btn--loginApp-link",
                  href: `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                  )}&response_type=token&show_dialog=true`,
                  children: "log into spotify",
                }),
              ],
            }),
      }),
    });
  }
}
export default App;
//# sourceMappingURL=App.js.map
