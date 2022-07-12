import React, { Component } from "react";
import * as calls from './Calls.js';
import * as stats from './Stats.js';
import ModeDoughnut from './ModeDoughnut.js';
import TimeSigDoughnut from './TimeSigDoughnut.js';
import KeyDoughnut from './KeyDoughnut.js';
import { KEYNAMES } from "./KeyDoughnut.js";

class StatsOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      track_objects: [],
      track_features: [],
      stats: null,
      startup: true
    }
    this.storeTrackObjects = this.storeTrackObjects.bind(this);
    this.storeTrackFeatures = this.storeTrackFeatures.bind(this);
    this.storeStats = this.storeStats.bind(this);
    this.getModeString = this.getModeString.bind(this);
    this.getTimeSigString = this.getTimeSigString.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.bleh !== prevProps.bleh){
      calls.getObjects(this.props.token, this.props.bleh, this.storeTrackObjects)
    }
  }

  storeTrackObjects(tracks){
    console.log(tracks);
    this.setState({
      track_objects: tracks
    })
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

  render() {
    return(
      <div id="statsOutput">
        {!this.state.stats && (<h3 id="select">{!!this.state.startup ? "< select a playlist to begin" : `${this.props.name} is empty :(`}</h3>)}
        {this.state.stats && (
        <div id="infoContainer">
          <h3>{this.props.name}</h3>
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
              <div className="graphBlock">
                <p className="chartLabel">This playlist is has songs in the following <span className="under">keys</span>: <span className="bold">{this.getKeyString()}</span></p>
                <KeyDoughnut sigCount={this.state.stats.sigCount} id={this.props.bleh} data={this.state.stats.keyCount}/>
              </div>
            </div>
            <div id="numStats">
              <p className="stat">The average song duration is <span className="bold">{this.state.stats.avgDurationMin} minutes and {this.state.stats.avgDurationSec} seconds.</span></p>
              <p className="stat">This playlist has an average <span className="under">popularity</span> of <span className="bold">{this.state.stats.avgPopularity}</span>, with the most popular song being <span className="bold">"{this.state.stats.mostPopular}" by {this.state.stats.mostPopularArtist}</span> and the least popular song being <span className="bold">"{this.state.stats.leastPopular}" by {this.state.stats.leastPopularArtist}</span>.</p>
              <p hidden className="explanation">"The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."</p>
              <p className="stat">This playlist has an average <span className="under">valence</span> of <span className="bold">{this.state.stats.avgValence}</span>.</p>
              <p hidden className="explanation">	Valence is "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."</p>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
}

export default StatsOutput;