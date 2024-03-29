import axios from 'axios';
import { PAGE_SIZE } from './App.js';

export function getPlaylists(token, callback, pagLink) {
  axios.get(pagLink || `https://api.spotify.com/v1/me/playlists?limit=${PAGE_SIZE}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((res) => {
    callback(res.data.items, res.data.previous, res.data.next)
  })
  .catch((error) => {
    console.error(error);
  })
}

export function getObjects(token, playlistId, callback) {
  if (playlistId){
    axios.get('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((res) => {
      callback(res.data)
    })
    .catch((error) => {
      console.error(error);
    })
  }
  else {
    axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((res) => {
      callback(res.data)
    })
    .catch((error) => {
      console.error(error);
    })
  }
}

function getTrackString(trackObjects) {
  let result = "";
  trackObjects.items.forEach(function(track) {
    result += track.track.id + ","
  })
  return result;
}

export function getFeatures(token, objects, callback) {
  let list = getTrackString(objects);

  axios.get('https://api.spotify.com/v1/audio-features', {
    headers: {
      'Authorization': 'Bearer ' + token
    },
    params: {
      ids: list
    }
  })
  .then((res) => {
    callback(res.data)
  })
  .catch((error) => {
    console.error(error)
  })
}


export function getArtistGenres(token, artistEndpoint, callback) {
  axios.get(artistEndpoint, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((res) => {
    callback(...res.data.genres)
  })
  .catch((error) => {
    console.error(error)
  })
}