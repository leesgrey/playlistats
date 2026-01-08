import { useState, useEffect } from "react";
import * as calls from "./calls";
import * as statsLogic from "./stats";
import type {
  SpotifyTrackResponse,
  AudioFeatureResponse,
  AudioFeature,
} from "./calls";
import type { IteratedStats } from "./stats";

import ModeDoughnut from "./charts/ModeDoughnut";
import TimeSigDoughnut from "./charts/TimeSigDoughnut";
import KeyDoughnut, { KEYNAMES } from "./charts/KeyDoughnut";
import CustomGraph from "./charts/CustomGraph";
import GenreDoughnut from "./charts/GenreDoughnut";

interface StatsOutputProps {
  token: string;
  name: string;
  playlist_id: string | null;
}

const StatsOutput = ({ token, name, playlist_id }: StatsOutputProps) => {
  const [trackObjects, setTrackObjects] = useState<SpotifyTrackResponse | null>(
    null
  );
  const [trackFeatures, setTrackFeatures] =
    useState<AudioFeatureResponse | null>(null);
  const [stats, setStats] = useState<IteratedStats | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [startup, setStartup] = useState(true);
  const [customX, setCustomX] = useState<string>("");
  const [customY, setCustomY] = useState<string>("");

  useEffect(() => {
    if (playlist_id) {
      calls.getObjects(token, playlist_id, (tracks) => {
        setTrackObjects(tracks);

        const currentGenres: string[] = [];
        const artists = tracks.items.map((t: any) => t.track.artists?.[0]);

        artists.forEach((artist) => {
          if (artist) {
            calls.getArtistGenres(token, artist.href, (newGenres: string) => {
              if (newGenres) {
                currentGenres.push(newGenres);
                setGenres([...currentGenres]);
              }
            });
          }
        });

        calls.getFeatures(token, tracks, (features) => {
          setTrackFeatures(features);

          const calculatedStats = statsLogic.iterate({
            track_objects: tracks,
            track_features: features,
            genres: [],
          });

          setStats(calculatedStats);
          setStartup(false);
        });
      });
    }
  }, [token, playlist_id]);

  const getModeString = () => {
    if (!stats) return "";
    if (stats.major === stats.minor) return "equally major and minor";
    return stats.major > stats.minor ? "mostly major" : "mostly minor";
  };

  const getTimeSigString = () => `[${stats?.timeSigs.join(", ")}]`;

  const getKeyString = () => {
    if (!stats) return "";
    return `[${Object.keys(stats.keyCount)
      .map((key) => KEYNAMES[key])
      .join(", ")}]`;
  };

  const getGenreString = () =>
    stats ? Object.keys(stats.genres).join(", ") : "";

  const getCustomTitle = () => {
    if (!customX && !customY) return "Custom Chart";
    const xLabel = customX
      ? customX.charAt(0).toUpperCase() + customX.slice(1)
      : "";
    const yLabel = customY
      ? customY.charAt(0).toUpperCase() + customY.slice(1)
      : "";
    return `${xLabel}${xLabel && yLabel ? " vs. " : ""}${yLabel}`;
  };

  return (
    <div id="statsOutput">
      {!stats ? (
        <h3 id="select">
          {startup ? "< select a playlist to begin" : `${name} is empty :(`}
        </h3>
      ) : (
        <div id="infoContainer">
          <div id="header">
            <h3>{name}</h3>
          </div>
          <div id="statsContainer">
            <div id="graphContainer">
              <div className="graphBlock">
                <p className="chartLabel">
                  This playlist is{" "}
                  <span className="bold">{getModeString()}</span> with{" "}
                  <span className="bold">
                    {stats.major} major song{stats.major !== 1 && "s"}
                  </span>{" "}
                  and{" "}
                  <span className="bold">
                    {trackObjects ? trackObjects.items.length - stats.major : 0}{" "}
                    minor song
                    {!trackObjects ||
                      (trackObjects.items.length - stats.major !== 1 && "s")}
                  </span>
                  .
                </p>
                <ModeDoughnut
                  id={playlist_id}
                  major={stats.major}
                  minor={stats.minor}
                />
              </div>
              <div className="graphBlock">
                <p className="chartLabel">
                  This playlist has songs in the following{" "}
                  <span className="under">time signatures</span>:{" "}
                  <span className="bold">{getTimeSigString()}</span>.
                </p>
                <TimeSigDoughnut id={playlist_id} sigCount={stats.sigCount} />
              </div>
              <div className="graphBlock full">
                <p className="chartLabel">
                  This playlist has songs in the following{" "}
                  <span className="under">keys</span>:{" "}
                  <span className="bold">{getKeyString()}</span>
                </p>
                <KeyDoughnut
                  sigCount={stats.sigCount}
                  id={playlist_id}
                  data={stats.keyCount}
                />
              </div>
              <div className="graphBlock full">
                {genres.length > 0 ? (
                  <>
                    <p className="chartLabel">
                      This playlist has artists associated with the following{" "}
                      <span className="under">genres</span>:{" "}
                      <span className="bold">{getGenreString()}</span>
                    </p>
                    <GenreDoughnut genres={stats.genres} />
                  </>
                ) : (
                  <p className="chartLabel">
                    This playlist has no artists with associated genres :(
                  </p>
                )}
              </div>
              <div className="graphBlock">
                <p className="stat">
                  The average song duration is{" "}
                  <span className="bold">
                    {stats.avgDurationMin} minutes and {stats.avgDurationSec}{" "}
                    seconds.
                  </span>
                </p>
                <p className="stat">
                  This playlist has an average{" "}
                  <span className="under">popularity</span> of{" "}
                  <span className="bold">{stats.avgPopularity}</span>, with the
                  most popular song being{" "}
                  <span className="bold">
                    "{stats.mostPopular}" by {stats.mostPopularArtist}
                  </span>{" "}
                  and the least popular song being{" "}
                  <span className="bold">
                    "{stats.leastPopular}" by {stats.leastPopularArtist}
                  </span>
                  .
                </p>
                <p hidden className="explanation">
                  "The popularity of a track is a value between 0 and 100, with
                  100 being the most popular. The popularity is calculated by
                  algorithm and is based, in the most part, on the total number
                  of plays the track has had and how recent those plays are."
                </p>
                <p className="stat">
                  This playlist has an average{" "}
                  <span className="under">valence</span> of{" "}
                  <span className="bold">{stats.avgValence}</span>.
                </p>
                <p hidden className="explanation">
                  {" "}
                  Valence is "a measure from 0.0 to 1.0 describing the musical
                  positiveness conveyed by a track. Tracks with high valence
                  sound more positive (e.g. happy, cheerful, euphoric), while
                  tracks with low valence sound more negative (e.g. sad,
                  depressed, angry)."
                </p>
              </div>
              <div className="graphBlock full">
                <p className="chartLabel">{getCustomTitle()}</p>
                <div
                  style={{
                    margin: "0 auto",
                    width: "20rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <select
                    value={customX}
                    style={{ width: "10rem" }}
                    onChange={(e) => setCustomX(e.target.value)}
                  >
                    <option value="">none</option>
                    <option value="acousticness">acousticness</option>
                    <option value="danceability">danceability</option>
                    <option value="energy">energy</option>
                    <option value="instrumentalness">instrumentalness</option>
                    <option value="liveness">liveness</option>
                    <option value="loudness">loudness</option>
                    <option value="speechiness">speechiness</option>
                    <option value="tempo">tempo</option>
                    <option value="valence">valence</option>
                  </select>
                  <select
                    value={customY}
                    style={{ width: "10rem" }}
                    onChange={(e) => setCustomY(e.target.value)}
                  >
                    <option value="">none</option>
                    <option value="acousticness">acousticness</option>
                    <option value="danceability">danceability</option>
                    <option value="energy">energy</option>
                    <option value="instrumentalness">instrumentalness</option>
                    <option value="liveness">liveness</option>
                    <option value="loudness">loudness</option>
                    <option value="speechiness">speechiness</option>
                    <option value="tempo">tempo</option>
                    <option value="valence">valence</option>
                  </select>
                </div>
                <CustomGraph
                  id={playlist_id}
                  customX={trackFeatures?.audio_features.map(
                    (i: AudioFeature) => i && i[customX]
                  )}
                  customY={trackFeatures?.audio_features.map(
                    (i: any) => i && i[customY]
                  )}
                  labels={trackObjects?.items.map(
                    (i: any) => `${i.track.name} - ${i.track.artists[0].name}`
                  )}
                  xLabel={customX}
                  yLabel={customY}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsOutput;
