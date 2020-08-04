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
  }

  componentDidUpdate(prevProps) {
    if (this.props.bleh != prevProps.bleh){
      // get track objects
      calls.getObjects(this.props.token, this.props.bleh, this.storeTrackObjects)
      // get track features
      // calculate stuff
    }
  }

  storeTrackObjects(tracks){
    this.setState({
      track_objects: tracks
    })
    calls.getFeatures(this.props.token, this.state.track_objects, this.storeTrackFeatures)
  }

  storeTrackFeatures(features){
    this.setState({
      track_features: features
    })
    this.setState({
      stats: stats.iterate(this.state.track_features)
    })
  }

  storeStats(stats){
    this.setState({
      stats: stats
    })
  }

  render() {
    return(
      <div id="statsOutput">
        {!this.state.stats && (<h3>select a playlist to begin</h3>)}
        {this.state.stats && (
        <div id="infoContainer">
          <h3>{this.props.bleh}</h3>
          <p>This playlist is mostly {this.state.stats.major > this.state.track_objects.items.length / 2 ? "major" : "minor"} with {this.state.stats.major} major song{this.state.stats.major != 1 && "s"} and {this.state.track_objects.items.length - this.state.stats.major} minor song{this.state.track_objects.items.length - this.state.stats.major != 1 && "s"}.</p>
          <ModeDoughnut id={this.props.bleh} major={this.state.stats.major} minor={this.state.track_objects.items.length - this.state.stats.major}/>
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