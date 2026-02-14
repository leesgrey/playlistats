import type { AudioFeature } from "./calls";
import type { SpotifyTrackResponse, AudioFeatureResponse } from "./calls";

interface RawStatsInput {
  track_objects: SpotifyTrackResponse;
  track_features: AudioFeatureResponse;
  genres: string[];
}

export interface IteratedStats {
  major: number;
  minor: number;
  avgPopularity: number;
  mostPopular: string;
  mostPopularArtist: string;
  leastPopular: string;
  leastPopularArtist: string;
  avgDurationMin: number;
  avgDurationSec: number;
  avgValence: string;
  timeSigs: number[];
  sigCount: Record<string, number>;
  uniqueKeys: string[];
  keyCount: Record<string, number>;
  genres: Record<string, number>;
}

export function iterate(stats: RawStatsInput): IteratedStats | null {
  if (!stats.track_objects.items.length) {
    return null;
  }

  let major = 0;
  let minor = 0;
  let popularityTotal = 0;
  let mostPopular = "";
  let mostPopularArtist = "";
  let mostPopularNum = -1;
  let leastPopular = "";
  let leastPopularArtist = "";
  let leastPopularNum = 101;
  let valence = 0;
  let duration = 0;
  let timeSigs: number[] = [];
  let keys: string[] = [];

  const validFeatures = stats.track_features.audio_features.filter(
    (f): f is AudioFeature => f !== null,
  );

  validFeatures.forEach((track) => {
    timeSigs.push(track.time_signature);
    duration += track.duration_ms;
    valence += track.valence;

    if (track.mode) {
      keys.push(track.key.toString() + "+");
      major++;
    } else {
      keys.push(track.key.toString() + "-");
      minor++;
    }
  });

  stats.track_objects.items.forEach((item) => {
    if (mostPopularNum < item.track.popularity) {
      mostPopularNum = item.track.popularity;
      mostPopular = item.track.name;
      mostPopularArtist = item.track.artists[0]?.name || "";
    }

    if (leastPopularNum > item.track.popularity) {
      leastPopularNum = item.track.popularity;
      leastPopular = item.track.name;
      leastPopularArtist = item.track.artists[0]?.name || "";
    }
    popularityTotal += item.track.popularity;
  });

  const featureCount = validFeatures.length || 1;

  return {
    major,
    minor,
    avgPopularity: Math.floor(
      popularityTotal / stats.track_objects.items.length,
    ),
    mostPopular,
    mostPopularArtist,
    leastPopular,
    leastPopularArtist,
    avgDurationMin: Math.floor(duration / featureCount / 60000),
    avgDurationSec: Math.round(((duration / featureCount / 60000) % 1) * 60),
    avgValence: (valence / featureCount).toFixed(3),
    timeSigs: [...new Set(timeSigs)],
    sigCount: processArray(timeSigs),
    uniqueKeys: [...new Set(keys.sort((a, b) => parseInt(a) - parseInt(b)))],
    keyCount: processArray(keys),
    genres: processArray(stats.genres),
  };
}

function processArray<T extends string | number>(
  rawArray: T[],
): Record<string, number> {
  const count: Record<string, number> = {};
  rawArray.forEach((item) => {
    const key = item.toString();
    count[key] = (count[key] || 0) + 1;
  });
  return count;
}
