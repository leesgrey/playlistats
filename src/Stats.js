export function iterate(stats){
  if (!stats.track_objects.items.length) {
    return null;
  }

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
  let keys = []

  stats.track_features.audio_features.forEach(function(track){
    // time sig
    timeSigs.push(track.time_signature)

    // duration
    duration += track.duration_ms

    // valence
    valence += track.valence

    // key + mode tracking
    if (track.mode){
      keys.push(track.key.toString() + "+")
      major++;
    }
    else {
      keys.push(track.key.toString() + "-")
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
    sigCount: processArray(timeSigs),
    uniqueKeys: [...new Set(keys.sort(function(a, b){return parseInt(a.slice(0, -1)) - parseInt(b.slice(0, -1))}))],
    keyCount: processSortArray(keys)
  }
  return data
}

function processSortArray(rawArray) {
  let unique = [...new Set(rawArray)]
  let keyCount = {}
  unique.forEach(function(key){
    keyCount[key] = rawArray.filter(x => x === key).length;
  })
  return keyCount;
}

function processArray(rawArray) {
  let unique = [...new Set(rawArray)]
  let keyCount = {}
  unique.forEach(function(key){
    keyCount[key] = rawArray.filter(x => x === key).length;
  })
  return keyCount;
}
