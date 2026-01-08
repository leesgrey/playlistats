import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Component } from "react";
import * as calls from "./calls";
import * as stats from "./Stats.js";
import ModeDoughnut from "./charts/ModeDoughnut.js";
import TimeSigDoughnut from "./charts/TimeSigDoughnut.js";
import KeyDoughnut from "./charts/KeyDoughnut.js";
import CustomGraph from "./charts/CustomGraph.js";
import GenreDoughnut from "./charts/GenreDoughnut.js";
import { KEYNAMES } from "./charts/KeyDoughnut.js";

class StatsOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_objects: [],
      track_features: [],
      stats: null,
      genres: [],
      startup: true,
      customX: null,
      customY: null,
      collapseCustom: true,
    };
    this.storeTrackObjects = this.storeTrackObjects.bind(this);
    this.storeTrackFeatures = this.storeTrackFeatures.bind(this);
    this.storeStats = this.storeStats.bind(this);
    this.storeGenres = this.storeGenres.bind(this);
    this.getModeString = this.getModeString.bind(this);
    this.getGenreString = this.getGenreString.bind(this);
    this.getTimeSigString = this.getTimeSigString.bind(this);
    this.getCustomTitle = this.getCustomTitle.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.playlist_id !== prevProps.playlist_id) {
      calls.getObjects(
        this.props.token,
        this.props.playlist_id,
        this.storeTrackObjects
      );
    }
  }
  storeTrackObjects(tracks) {
    this.setState({
      track_objects: tracks,
    });
    this.storeGenres();
    calls.getFeatures(
      this.props.token,
      this.state.track_objects,
      this.storeTrackFeatures
    );
  }
  storeTrackFeatures(features) {
    this.setState({
      track_features: features,
    });
    this.storeStats();
  }
  storeStats() {
    this.setState({
      stats: stats.iterate(this.state),
      startup: false,
    });
  }
  storeGenres() {
    const genres = [];
    const artists = this.state.track_objects.items.map(
      (t) => t.track.artists[0]
    );
    artists.forEach((artist) =>
      calls.getArtistGenres(
        this.props.token,
        artist.href,
        (newGenres) => newGenres && genres.push(newGenres)
      )
    );
    console.log(genres);
    this.setState({
      genres: genres,
    });
  }
  getModeString() {
    let result = "";
    if (this.state.stats.major === this.state.stats.minor) {
      result += "equally major and minor ";
    } else if (this.state.stats.major > this.state.stats.minor) {
      result += "mostly major ";
    } else {
      result += "mostly minor ";
    }
    return result;
  }
  getTimeSigString() {
    let result = "[";
    this.state.stats.timeSigs.forEach(function (sig) {
      result += sig.toString();
      result += ", ";
    });
    result = result.slice(0, -2);
    result += "]";
    return result;
  }
  getKeyString() {
    let result = "[";
    Object.keys(this.state.stats.keyCount).forEach(function (key) {
      result += KEYNAMES[key].toString();
      result += ", ";
    });
    result = result.slice(0, -2);
    result += "]";
    return result;
  }
  getGenreString() {
    let result = "";
    Object.keys(this.state.stats.genres).forEach((genre) => {
      result += genre;
      result += ", ";
    });
    return result.slice(0, -2);
  }
  getCustomTitle() {
    const { customX, customY } = this.state;
    if (!customX && !customY) return "Custom Chart";
    return `${customX ? customX[0].toUpperCase() + customX.slice(1) : ""}${
      customX && customY ? " vs. " : ""
    }${customY ? customY[0].toUpperCase() + customY.slice(1) : ""}`;
  }
  render() {
    return _jsx("div", {
      id: "statsOutput",
      children: !this.state.stats
        ? _jsx("h3", {
            id: "select",
            children: !!this.state.startup
              ? "< select a playlist to begin"
              : `${this.props.name} is empty :(`,
          })
        : _jsxs("div", {
            id: "infoContainer",
            children: [
              _jsx("div", {
                id: "header",
                children: _jsx("h3", { children: this.props.name }),
              }),
              _jsx("div", {
                id: "statsContainer",
                children: _jsxs("div", {
                  id: "graphContainer",
                  children: [
                    _jsxs("div", {
                      className: "graphBlock",
                      children: [
                        _jsxs("p", {
                          className: "chartLabel",
                          children: [
                            "This playlist is",
                            " ",
                            _jsx("span", {
                              className: "bold",
                              children: this.getModeString(),
                            }),
                            " with",
                            " ",
                            _jsxs("span", {
                              className: "bold",
                              children: [
                                this.state.stats.major,
                                " major song",
                                this.state.stats.major !== 1 && "s",
                              ],
                            }),
                            " ",
                            "and",
                            " ",
                            _jsxs("span", {
                              className: "bold",
                              children: [
                                this.state.track_objects.items.length -
                                  this.state.stats.major,
                                " ",
                                "minor song",
                                this.state.track_objects.items.length -
                                  this.state.stats.major !==
                                  1 && "s",
                              ],
                            }),
                            ".",
                          ],
                        }),
                        _jsx(ModeDoughnut, {
                          id: this.props.playlist_id,
                          major: this.state.stats.major,
                          minor: this.state.stats.minor,
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "graphBlock",
                      children: [
                        _jsxs("p", {
                          className: "chartLabel",
                          children: [
                            "This playlist has songs in the following",
                            " ",
                            _jsx("span", {
                              className: "under",
                              children: "time signatures",
                            }),
                            ":",
                            " ",
                            _jsx("span", {
                              className: "bold",
                              children: this.getTimeSigString(),
                            }),
                            ".",
                          ],
                        }),
                        _jsx(TimeSigDoughnut, {
                          id: this.props.playlist_id,
                          sigCount: this.state.stats.sigCount,
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "graphBlock full",
                      children: [
                        _jsxs("p", {
                          className: "chartLabel",
                          children: [
                            "This playlist has songs in the following",
                            " ",
                            _jsx("span", {
                              className: "under",
                              children: "keys",
                            }),
                            ":",
                            " ",
                            _jsx("span", {
                              className: "bold",
                              children: this.getKeyString(),
                            }),
                          ],
                        }),
                        _jsx(KeyDoughnut, {
                          sigCount: this.state.stats.sigCount,
                          id: this.props.playlist_id,
                          data: this.state.stats.keyCount,
                        }),
                      ],
                    }),
                    _jsx("div", {
                      className: "graphBlock full",
                      children:
                        this.state.genres.length > 0
                          ? _jsxs(React.Fragment, {
                              children: [
                                _jsxs("p", {
                                  className: "chartLabel",
                                  children: [
                                    "This playlist has artists associated with the following",
                                    " ",
                                    _jsx("span", {
                                      className: "under",
                                      children: "genres",
                                    }),
                                    ":",
                                    " ",
                                    _jsx("span", {
                                      className: "bold",
                                      children: this.getGenreString(),
                                    }),
                                  ],
                                }),
                                _jsx(GenreDoughnut, {
                                  genres: this.state.stats.genres,
                                }),
                              ],
                            })
                          : _jsx("p", {
                              className: "chartLabel",
                              children:
                                "This playlist has no artists with associated genres :(",
                            }),
                    }),
                    _jsxs("div", {
                      className: "graphBlock",
                      children: [
                        _jsxs("p", {
                          className: "stat",
                          children: [
                            "The average song duration is",
                            " ",
                            _jsxs("span", {
                              className: "bold",
                              children: [
                                this.state.stats.avgDurationMin,
                                " minutes and",
                                " ",
                                this.state.stats.avgDurationSec,
                                " seconds.",
                              ],
                            }),
                          ],
                        }),
                        _jsxs("p", {
                          className: "stat",
                          children: [
                            "This playlist has an average",
                            " ",
                            _jsx("span", {
                              className: "under",
                              children: "popularity",
                            }),
                            " of",
                            " ",
                            _jsx("span", {
                              className: "bold",
                              children: this.state.stats.avgPopularity,
                            }),
                            ", with the most popular song being",
                            " ",
                            _jsxs("span", {
                              className: "bold",
                              children: [
                                '"',
                                this.state.stats.mostPopular,
                                '" by',
                                " ",
                                this.state.stats.mostPopularArtist,
                              ],
                            }),
                            " ",
                            "and the least popular song being",
                            " ",
                            _jsxs("span", {
                              className: "bold",
                              children: [
                                '"',
                                this.state.stats.leastPopular,
                                '" by',
                                " ",
                                this.state.stats.leastPopularArtist,
                              ],
                            }),
                            ".",
                          ],
                        }),
                        _jsx("p", {
                          hidden: true,
                          className: "explanation",
                          children:
                            '"The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."',
                        }),
                        _jsxs("p", {
                          className: "stat",
                          children: [
                            "This playlist has an average",
                            " ",
                            _jsx("span", {
                              className: "under",
                              children: "valence",
                            }),
                            " of",
                            " ",
                            _jsx("span", {
                              className: "bold",
                              children: this.state.stats.avgValence,
                            }),
                            ".",
                          ],
                        }),
                        _jsxs("p", {
                          hidden: true,
                          className: "explanation",
                          children: [
                            " ",
                            'Valence is "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."',
                          ],
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "graphBlock full",
                      children: [
                        _jsx("p", {
                          className: "chartLabel",
                          children: this.getCustomTitle(),
                        }),
                        _jsxs("div", {
                          style: {
                            margin: "0 auto",
                            width: "20rem",
                            marginBottom: "0.5rem",
                          },
                          children: [
                            _jsxs("select", {
                              value: this.state.customX,
                              style: { width: "10rem" },
                              onChange: (e) =>
                                this.setState({ customX: e.target.value }),
                              children: [
                                _jsx("option", { value: "", children: "none" }),
                                _jsx("option", {
                                  value: "acousticness",
                                  children: "acousticness",
                                }),
                                _jsx("option", {
                                  value: "danceability",
                                  children: "danceability",
                                }),
                                _jsx("option", {
                                  value: "energy",
                                  children: "energy",
                                }),
                                _jsx("option", {
                                  value: "instrumentalness",
                                  children: "instrumentalness",
                                }),
                                _jsx("option", {
                                  value: "liveness",
                                  children: "liveness",
                                }),
                                _jsx("option", {
                                  value: "loudness",
                                  children: "loudness",
                                }),
                                _jsx("option", {
                                  value: "speechiness",
                                  children: "speechiness",
                                }),
                                _jsx("option", {
                                  value: "tempo",
                                  children: "tempo",
                                }),
                                _jsx("option", {
                                  value: "valence",
                                  children: "valence",
                                }),
                              ],
                            }),
                            _jsxs("select", {
                              value: this.state.customY,
                              style: { width: "10rem" },
                              onChange: (e) =>
                                this.setState({ customY: e.target.value }),
                              children: [
                                _jsx("option", { value: "", children: "none" }),
                                _jsx("option", {
                                  value: "acousticness",
                                  children: "acousticness",
                                }),
                                _jsx("option", {
                                  value: "danceability",
                                  children: "danceability",
                                }),
                                _jsx("option", {
                                  value: "energy",
                                  children: "energy",
                                }),
                                _jsx("option", {
                                  value: "instrumentalness",
                                  children: "instrumentalness",
                                }),
                                _jsx("option", {
                                  value: "liveness",
                                  children: "liveness",
                                }),
                                _jsx("option", {
                                  value: "loudness",
                                  children: "loudness",
                                }),
                                _jsx("option", {
                                  value: "speechiness",
                                  children: "speechiness",
                                }),
                                _jsx("option", {
                                  value: "tempo",
                                  children: "tempo",
                                }),
                                _jsx("option", {
                                  value: "valence",
                                  children: "valence",
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsx(CustomGraph, {
                          id: this.props.playlist_id,
                          customX: this.state.track_features.audio_features.map(
                            (i) => i && i[this.state.customX]
                          ),
                          customY: this.state.track_features.audio_features.map(
                            (i) => i && i[this.state.customY]
                          ),
                          labels: this.state.track_objects.items.map(
                            (i) =>
                              `${i.track.name} - ${i.track.artists[0].name}`
                          ),
                          xLabel: this.state.customX,
                          yLabel: this.state.customY,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
    });
  }
}
export default StatsOutput;
//# sourceMappingURL=StatsOutput.js.map
