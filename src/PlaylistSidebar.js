import React, { Component } from "react";
import "./PlaylistSidebar.css";
import * as $ from "jquery";
import StatsOutput from "./StatsOutput";
import * from './Calls.js';

class PlaylistSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      token: this.props.token,
      no_data: false,
      playlist_data: null,
      energy: null
    }
  this.handleClick = this.handleClick.bind(this);
  this.getTracks = this.getTracks.bind(this)
  this.processAverage = this.processAverage.bind(this);
  this.getTrackFeatures = getTrackFeatures.bind(this);
  }

  handleClick(id) {
    this.setState({
      selected: id
    })
    this.getTracks(id)
    this.getTrackFeatures(this.state.token, id)
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
          playlist_data: data,
          energy: this.processAverage("energy", data.tracks.items)
        })
      }
    })
  }

  processAverage(key, tracks){
    console.log(tracks)
    let sum = 0;
    let count = tracks.length;
    let track;
    for (let i = 0; i < count; i++){
      console.log(tracks[i])
      sum += tracks[i].track.popularity
    }
    return sum / count
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
        {this.state.selected && <StatsOutput selected={this.state.selected} energy={this.state.energy}/>}
      </div>
    )
  }
}

export default PlaylistSidebar