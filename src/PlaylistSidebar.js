import React, { Component } from "react";

class PlaylistSidebar extends Component {
  render() {
    return (
      <div>
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