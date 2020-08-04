import React, { Component } from "react";
import StatsOutput from "./StatsOutput.js"

class PlaylistSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      token: this.props.token,
      no_data: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({
      selected: id
    })
    console.log(id);
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <ul>
            {Array.from(this.props.playlists).map( i => (
            <li onClick={() => this.handleClick(i.id)} className="playlist_item" key={i.id}>{i.name}</li>
            ))}
          </ul>
        </div>
        <StatsOutput token={this.state.token} bleh={this.state.selected}/>
      </div>
    )
  }
}

export default PlaylistSidebar;