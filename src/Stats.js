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
    leastPopularArtist: leastPopularArtist
  }
  console.log(data)
  return data
}

