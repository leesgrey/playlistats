import axios from "axios";
import { PAGE_SIZE } from "utils/constants";
import type { Playlist } from "types";
import { clientId, redirectUri } from "utils/constants";

const tokenEndpoint = "https://accounts.spotify.com/api/token";

export interface SpotifyTrack {
  track: {
    id: string;
    name: string;
    popularity: number;
    artists: { name: string; href: string; id?: string }[];
  };
}

export interface SpotifyTrackResponse {
  items: SpotifyTrack[];
}

export interface AudioFeature {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface AudioFeatureResponse {
  audio_features: (AudioFeature | null)[];
}

type GetPlaylistsCallback = (
  data: Playlist[],
  previous: string | null,
  next: string | null,
) => void;

export function getPlaylists(
  token: string,
  callback: GetPlaylistsCallback,
  pagLink: string | number | null,
) {
  const url =
    typeof pagLink === "string"
      ? pagLink
      : `https://api.spotify.com/v1/me/playlists?limit=${PAGE_SIZE}&offset=${pagLink}`;

  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => callback(res.data.items, res.data.previous, res.data.next))
    .catch((error) => console.error("Error fetching playlists:", error));
}

export function getObjects(
  token: string,
  playlistId: string | number | null,
  callback: (tracks: SpotifyTrackResponse) => void,
) {
  const url = !playlistId
    ? "https://api.spotify.com/v1/me/playlists?limit=${PAGE_SIZE}"
    : `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${PAGE_SIZE}`;
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => callback(res.data))
    .catch((error) => console.error(error));
}

function getTrackString(trackObjects: SpotifyTrackResponse) {
  return trackObjects.items
    .map((item) => item.track?.id)
    .filter((id) => !!id)
    .join(",");
}

export function getFeatures(
  token: string,
  objects: SpotifyTrackResponse,
  callback: (features: AudioFeatureResponse) => void,
) {
  const ids = getTrackString(objects);
  if (!ids) return;

  axios
    .get("https://api.spotify.com/v1/audio-features", {
      headers: { Authorization: "Bearer " + token },
      params: { ids: ids },
    })
    .then((res) => callback(res.data))
    .catch((error) => console.error(error));
}

export function getArtistGenres(
  token: string,
  artistEndpoint: string,
  callback: (genre: string) => void,
) {
  axios
    .get(artistEndpoint, { headers: { Authorization: "Bearer " + token } })
    .then((res) => callback(res.data.genres[0]))
    .catch((error) => console.error(error));
}

// auth
export async function getToken(code: string) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: code_verifier || "",
    }),
  });

  return await response.json();
}

export async function refreshToken(currentToken: {
  refresh_token: string | null;
}) {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token || "",
    }),
  });

  return await response.json();
}
