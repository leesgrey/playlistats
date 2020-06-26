import React, { Component } from "react";
import "./PlaylistSidebar.css";

class PlaylistSidebar extends Component {
  constructor() {
    super();
    this.state = {
      selected: null
    }
  }

  render() {
    return (
      <div className="PlaylistSidebar">
        <ul>
          {Array.from(this.props.playlists).map( i => (
          <li key={i.id}>{i.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PlaylistSidebar