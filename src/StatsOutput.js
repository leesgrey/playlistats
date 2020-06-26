import React, { Component } from "react";
import "./StatsOutput.css"

class StatsOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: this.props.tracks
    }
  }

  componentDidUpdate() {
    console.log("update")
  }

  render() {
    return(
      <div className="StatsOutput">
        {this.state.tracks ? this.state.tracks.name : this.props.current}
      </div>
    )
  }
}

export default StatsOutput;