import React, { Component } from "react";
import * as calls from './Calls.js';
import * as stats from './Stats.js';
import ModeDoughnut from './charts/ModeDoughnut.js';
import TimeSigDoughnut from './charts/TimeSigDoughnut.js';
import KeyDoughnut from './charts/KeyDoughnut.js';
import CustomGraph from './charts/CustomGraph.js';
import GenreDoughnut from './charts/GenreDoughnut';
import { KEYNAMES } from "./charts/KeyDoughnut.js";

class StatsOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      track_objects: [],
      track_features: [],
      stats: null,
      genres: [],
      startup: true,
      customX: null,
      customY: null,
      collapseCustom: true,
    }
    this.storeTrackObjects = this.storeTrackObjects.bind(this);
    this.storeTrackFeatures = this.storeTrackFeatures.bind(this);
    this.storeStats = this.storeStats.bind(this);
    this.storeGenres= this.storeGenres.bind(this);
    this.getModeString = this.getModeString.bind(this);
    this.getGenreString = this.getGenreString.bind(this);
    this.getTimeSigString = this.getTimeSigString.bind(this)
    this.getCustomTitle= this.getCustomTitle.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.bleh !== prevProps.bleh){
      calls.getObjects(this.props.token, this.props.bleh, this.storeTrackObjects)
    }
  }

  storeTrackObjects(tracks){
    this.setState({
      track_objects: tracks
    })
    this.storeGenres();
    calls.getFeatures(this.props.token, this.state.track_objects, this.storeTrackFeatures)
  }

  storeTrackFeatures(features){
    this.setState({
      track_features: features
    })
    this.storeStats();
  }

  storeStats(){
    this.setState({
      stats: stats.iterate(this.state),
      startup: false
    })
  }

  storeGenres() {
    const genres = []
    const artists = this.state.track_objects.items.map((t) => t.track.artists[0])
    artists.forEach(artist => calls.getArtistGenres(this.props.token, artist.href, (newGenres) => newGenres && genres.push(newGenres)))
    console.log(genres)
    this.setState({
      genres: genres
    })
  }

  getModeString() {
    let result = ""
    if (this.state.stats.major === this.state.stats.minor) {
      result += "equally major and minor "
    }
    else if (this.state.stats.major > this.state.stats.minor) {
      result += "mostly major "
    }
    else {
      result += "mostly minor "
    }
    return result;
  }

  getTimeSigString() {
    let result = "["
    this.state.stats.timeSigs.forEach(function(sig){
      result += sig.toString()
      result += ", "
    })
    result = result.slice(0, -2)
    result += "]"
    return result;
  }

  getKeyString() {
    let result = "["
    Object.keys(this.state.stats.keyCount).forEach(function(key){
      result += KEYNAMES[key].toString()
      result += ", "
    })
    result = result.slice(0, -2)
    result += "]"
    return result;
  }

  getGenreString() {
    let result = "";
    Object.keys(this.state.stats.genres).forEach((genre) => {
      result += genre
      result += ", "
    });
    return result.slice(0, -2)
  }

  getCustomTitle() {
    const {customX, customY} = this.state;
    if (!customX && !customY) return "Custom Chart";
    return `${customX ? customX[0].toUpperCase() + customX.slice(1) : ''}${(customX && customY) ? ' vs. ' : ''}${customY ? customY[0].toUpperCase() + customY.slice(1) : ''}`;
  }

  render() {
    return(
      <div id="statsOutput">
        {!this.state.stats ?
          <h3 id="select">{!!this.state.startup ? "< select a playlist to begin" : `${this.props.name} is empty :(`}</h3>
          : <div id="infoContainer">
              <div id="header">
                <h3>{this.props.name}</h3>
              </div>
              <div id="statsContainer">
                <div id="graphContainer">
                  <div className="graphBlock">
                    <p className="chartLabel">This playlist is <span className="bold">{this.getModeString()}</span> with <span className="bold">{this.state.stats.major} major song{this.state.stats.major !== 1 && "s"}</span> and <span className="bold">{this.state.track_objects.items.length - this.state.stats.major} minor song{this.state.track_objects.items.length - this.state.stats.major !== 1 && "s"}</span>.</p>
                    <ModeDoughnut id={this.props.bleh} major={this.state.stats.major} minor={this.state.stats.minor}/>
                  </div>
                  <div className="graphBlock">
                    <p className="chartLabel">This playlist has songs in the following <span className="under">time signatures</span>: <span className="bold">{this.getTimeSigString()}</span>.</p>
                    <TimeSigDoughnut id={this.props.bleh} sigCount={this.state.stats.sigCount}/>
                  </div>
                  <div className="graphBlock full">
                    <p className="chartLabel">This playlist has songs in the following <span className="under">keys</span>: <span className="bold">{this.getKeyString()}</span></p>
                    <KeyDoughnut sigCount={this.state.stats.sigCount} id={this.props.bleh} data={this.state.stats.keyCount}/>
                  </div>
                  <div className="graphBlock full">
                    {this.state.genres.length > 0 ?
                      <React.Fragment>
                        <p className="chartLabel">This playlist has artists associated with the following <span className="under">genres</span>: <span className="bold">{this.getGenreString()}</span></p>
                        <GenreDoughnut genres={this.state.stats.genres} />
                      </React.Fragment> : 
                      <p className="chartLabel">This playlist has no artists with associated genres :(</p>
                    }
                  </div>
                  <div className="graphBlock">
                    <p className="stat">The average song duration is <span className="bold">{this.state.stats.avgDurationMin} minutes and {this.state.stats.avgDurationSec} seconds.</span></p>
                    <p className="stat">This playlist has an average <span className="under">popularity</span> of <span className="bold">{this.state.stats.avgPopularity}</span>, with the most popular song being <span className="bold">"{this.state.stats.mostPopular}" by {this.state.stats.mostPopularArtist}</span> and the least popular song being <span className="bold">"{this.state.stats.leastPopular}" by {this.state.stats.leastPopularArtist}</span>.</p>
                    <p hidden className="explanation">"The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."</p>
                    <p className="stat">This playlist has an average <span className="under">valence</span> of <span className="bold">{this.state.stats.avgValence}</span>.</p>
                    <p hidden className="explanation">	Valence is "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."</p>
                  </div>
                  <div className="graphBlock full">
                    <p className="chartLabel">{this.getCustomTitle()}</p>
                    <div style={{ margin: '0 auto', width: '20rem', marginBottom: '0.5rem' }}>
                      <select value={this.state.customX} style={{ width: '10rem' }} onChange={(e) => this.setState({ customX: e.target.value })}>
                        <option value=''>none</option>
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
                      <select value={this.state.customY} style={{ width: '10rem' }} onChange={(e) => this.setState({ customY: e.target.value })}>
                        <option value=''>none</option>
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
                    <CustomGraph id={this.props.bleh} customX={this.state.track_features.audio_features.map((i) => i && i[this.state.customX])} customY={this.state.track_features.audio_features.map((i) => i && i[this.state.customY])} labels={this.state.track_objects.items.map((i) => `${i.track.name} - ${i.track.artists[0].name}`)} xLabel={this.state.customX} yLabel={this.state.customY} />
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
    )
  }
}

export default StatsOutput;