getTrackFeatures(token, id) {
  fetch('https://api.spotify.com/v1/audio-features', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error code ' + response.status);
        return;
      }
      console.log(data)
  });
}

getAvgAcousticness() {
  pass;-
}

getAvgDanceability() {

}

getAvgEnergy() {

}

getAvgInstrumentalness() {

}

getModeKey() {

}

GetAvgLiveness() {

}

GetAvgLoudness(){

}



getExplicitPercentage() {

}

getAvgDuration() {

}

getAvgPopularity() {

}

getAllStats() {

}

module.exports = {

};