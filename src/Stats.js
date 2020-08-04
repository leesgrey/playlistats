export function iterate(stats){
  let major = 0;
  let minor = 0;
  let popularityTotal = 0;
  let mostPopular;
  let mostPopularNum = -1;
  let leastPopular;
  let leastPopularNum = 101;
  stats.track_features.audio_features.forEach(function(track){
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
    }

    if (leastPopularNum > item.track.popularity) {
      leastPopularNum = item.track.popularity
      leastPopular = item.track.name
    }
    popularityTotal += item.track.popularity
  })

  let data = {
    major: major,
    minor: minor,
    avgPopularity: Math.floor(popularityTotal / stats.track_features.audio_features.length),
    mostPopular: mostPopular,
    leastPopular: leastPopular
  }
  console.log(data)
  return data
}

