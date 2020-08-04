import React, { Component } from "react";
import * as calls from './Calls.js';
import * as stats from './Stats.js';
import ModeDoughnut from './ModeDoughnut.js';

class StatsOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      track_objects: [],
      track_features: [],
      stats: null
    }
    this.storeTrackObjects = this.storeTrackObjects.bind(this);
    this.storeTrackFeatures = this.storeTrackFeatures.bind(this);
    this.storeStats = this.storeStats.bind(this);
    this.getModeString = this.getModeString.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.bleh !== prevProps.bleh){
      console.log("Loading playlist stats")
      calls.getObjects(this.props.token, this.props.bleh, this.storeTrackObjects)
    }
  }

  storeTrackObjects(tracks){
    this.setState({
      track_objects: tracks
    })
    console.log("Track objects set")
    calls.getFeatures(this.props.token, this.state.track_objects, this.storeTrackFeatures)
  }

  storeTrackFeatures(features){
    this.setState({
      track_features: features
    })
    console.log("Track features set")
    console.log(this.state)
    this.storeStats();
  }

  storeStats(){
    this.setState({
      stats: stats.iterate(this.state)
    })
    console.log("stats stored")
    console.log(this.state)
  }

  getModeString() {
    let result = "This playlist is "
    if (this.state.stats.major == this.state.stats.minor) {
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

  render() {
    return(
      <div id="statsOutput">
        {!this.state.stats && (<h3>select a playlist to begin</h3>)}
        {this.state.stats && (
        <div id="infoContainer">
          <h3>{this.props.bleh}</h3>
          <p>{this.getModeString()} with {this.state.stats.major} major song{this.state.stats.major != 1 && "s"} and {this.state.track_objects.items.length - this.state.stats.major} minor song{this.state.track_objects.items.length - this.state.stats.major != 1 && "s"}.</p>
          <ModeDoughnut id={this.props.bleh} major={this.state.stats.major} minor={this.state.stats.minor}/>
          <p>This playlist has an average popularity of x with a variance of x.</p>
          <p>This playlist has an average valence of x with a variance of x.</p>
          <p>This playlist features x artists.</p>
        </div>
        )}
      </div>
    )
  }
}

export default StatsOutput;