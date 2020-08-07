export function iterate(stats){
  let major = 0;
  let minor = 0;
  let popularityTotal = 0;
  let mostPopular;
  let mostPopularArtist;
  let mostPopularNum = -1;
  let leastPopular;
  let leastPopularArtist;
  let leastPopularNum = 101;
  let valence = 0;
  let duration = 0;
  let timeSigs = []

  stats.track_features.audio_features.forEach(function(track){
    // time sig
    timeSigs.push(track.time_signature)

    // duration
    duration += track.duration_ms

    // valence
    valence += track.valence

    // mode tracking
    if (track.mode){
      major++;
    }
    else {
      minor++;
    }
  })

  stats.track_objects.items.forEach(function(item){
    if (mostPopularNum < item.track.popularity) {
      mostPopularNum = item.track.popularity
      mostPopular = item.track.name
      mostPopularArtist = item.track.artists[0].name
    }

    if (leastPopularNum > item.track.popularity) {
      leastPopularNum = item.track.popularity
      leastPopular = item.track.name
      leastPopularArtist = item.track.artists[0].name
    }
    popularityTotal += item.track.popularity
  })

  let data = {
    major: major,
    minor: minor,
    avgPopularity: Math.floor(popularityTotal / stats.track_features.audio_features.length),
    mostPopular: mostPopular,
    mostPopularArtist: mostPopularArtist,
    leastPopular: leastPopular,
    leastPopularArtist: leastPopularArtist,
    avgDurationMin: Math.round(((duration / stats.track_features.audio_features.length) / 60000)),
    avgDurationSec: Math.round((((duration / stats.track_features.audio_features.length) / 60000) % 1) * 60),
    avgValence: (valence / stats.track_features.audio_features.length).toFixed(3),
    timeSigs: [...new Set(timeSigs)],
    sigCount: processTimeSigs(timeSigs)
  }
  return data
}

function processTimeSigs(sigArray) {
  let unique = [...new Set(sigArray)]
  let sigCount = {}
  unique.forEach(function(sig){
    sigCount[sig] = sigArray.filter(x => x == sig).length;
  })
  return sigCount;
}
