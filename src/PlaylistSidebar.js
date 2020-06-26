import React, { Component } from "react";
import "./PlaylistSidebar.css";
import * as $ from "jquery";
import StatsOutput from "./StatsOutput";

class PlaylistSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      token: this.props.token,
      no_data: false,
      playlist_data: null
    }
  this.handleClick = this.handleClick.bind(this);
  this.getTracks = this.getTracks.bind(this)
  }

  handleClick(id) {
    this.setState({
      selected: id
    })
    this.getTracks(id)
  }

  getTracks(id) {
    $.ajax({
      url: "https://api.spotify.com/v1/playlists/" + id,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true
          });
          return;
        }
        this.setState({
          playlist_data: data
        })
      console.log(data)
      }
    })
  }

  render() {
    return (
      <div>
        <div className="PlaylistSidebar">
          <ul>
            {Array.from(this.props.playlists).map( i => (
            <li onClick={() => this.handleClick(i.id)} className="playlist_item" key={i.id}>{i.name}</li>
            ))}
          </ul>
        </div>
        {this.state.selected && <StatsOutput current={this.state.selected} tracks={this.state.playlist_data}/>}
      </div>
    )
  }
}

export default PlaylistSidebar