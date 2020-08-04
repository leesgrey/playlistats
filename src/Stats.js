export function iterate(stats){
  console.log("iterate receives")
  console.log(stats)
  let major = 0;
  let minor = 0;
  stats.track_features.audio_features.forEach(function(track){
    if (track.mode){
      major++;
    }
    else {
      minor++;
    }
  })

  let data = {
    major: major,
    minor: minor
  }
  return data
}