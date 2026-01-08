import { useState, useEffect } from "react";
import PlaylistSidebar from "./PlaylistSidebar";
import hash from "./hash";
import "./App.css";
import * as calls from "./calls";
import type { Playlist } from "./types";

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

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [playlists, setPlaylistsData] = useState<Playlist[]>([]);
  const [previous, setPrevious] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState<number>(0);

  const updatePlaylists = (
    data: Playlist[],
    prevUrl: string | null,
    nextUrl: string | null
  ) => {
    setPlaylistsData(data);
    setPrevious(prevUrl);
    setNext(nextUrl);
  };

  useEffect(() => {
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      calls.getPlaylists(_token, updatePlaylists, PAGE_SIZE * pageNum);
    }
  }, []); // no dependencies == runs once on mount (componentDidMount)

  const onNext = () => {
    if (!token || !next) return;
    calls.getPlaylists(token, updatePlaylists, next);
    setPageNum((prev) => prev + 1);
  };

  const onPrevious = () => {
    if (!token || !next) return;
    calls.getPlaylists(token, updatePlaylists, previous);
    setPageNum((prev) => prev - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        {token ? (
          <div id="loginDisplay">
            <PlaylistSidebar
              token={token}
              playlists={playlists}
              next={next}
              previous={previous}
              onNext={onNext}
              onPrevious={onPrevious}
              pageNum={1}
            />
          </div>
        ) : (
          <div id="landing">
            <h1>Playlistats</h1>
            <p>generate spotify playlist statistics</p>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              log into spotify
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
