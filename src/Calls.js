export function getTrackFeatures(token, id) {
  fetch('https://api.spotify.com/v1/audio-features')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error code ' + response.status);
          return;
        }
        console.log(data)
    });
}
