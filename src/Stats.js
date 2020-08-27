export function iterate(stats, previousData){
  let datal
  if (!previousData){

  }
  let data = previousData;

  if (!data) {
    data = {
      popularityTotal: 0,
      popularityMax: -1,
      popularityMin: 101,

      valenceTotal: 0,
      danceabilityTotal: 0,
      energyTotal: 0,
      durationTotal: 0,

      timeSigs: [],
      keyModes: [],
      modes: [],
      keys: []
    }
  }

  stats.track_features.audio_features.forEach(function(track){
    data.valenceTotal += track.valence;
    data.danceabilityTotal += track.danceability;
    data.energyTotal += track.energy;
    data.durationTotal += track.duration_ms;

    data.timeSigs.push(track.time_signature);

    data.keys.push(track.key)
    data.keyModes.push(track.key.toString() + "+")
    data.modes.push(track.mode)
  })

  stats.track_objects.items.forEach(function(item){
    if (data.mostPopularNum < item.track.popularity) {
      data.mostPopularNum = item.track.popularity
      data.mostPopular = item.track
    }

    if (data.leastPopularNum > item.track.popularity) {
      data.leastPopularNum = item.track.popularity
      data.leastPopular = item.track
    }
    data.popularityTotal += item.track.popularity
  })
  console.log(data)
  return data
}

function arrayToDataset(rawArray) {
  let unique = [...new Set(rawArray)]
  let keyCount = {}
  unique.forEach(function(key){
    keyCount[key] = rawArray.filter(x => x === key).length;
  })
  return keyCount;
}
