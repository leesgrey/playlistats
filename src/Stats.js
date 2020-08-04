export function iterate(features){
  let major = 0;
  features.audio_features.forEach(function(track){
    if (track.mode){
      major++;
    }
  })

  let data = {
    major: major
  }
  return data
}