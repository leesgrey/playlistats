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
        <ul>
          <p>{this.props.selected}</p>
          <p>{this.props.energy}</p>
        </ul>
      </div>
    )
  }
}

export default StatsOutput;