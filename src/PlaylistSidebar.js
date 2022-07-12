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

  handleClick(id, name) {
    this.setState({
      selected: id,
      name: name
    })
  }

  render() {
    const { previous, onPrevious, next, onNext, pageNum } = this.props;
    return (
      <div id="hasToken">
        <div className="sidebar">
          <h2>playlistats</h2>
          <ul>
            <li onClick={() => this.handleClick(0, "Recently Played")} className="playlist_item" key={0}>Recently Played</li>
            {Array.from(this.props.playlists).map( i => (
            <li onClick={() => this.handleClick(i.id, i.name)} className="playlist_item" key={i.id}>{i.name}</li>
            ))}
          </ul>
          <div id="footer">
            <p id="pageCount">page {pageNum}</p>
            <div id="pagination">
              <a className={`pagBtn${previous ? ' active' : ''}`} onClick={onPrevious}>{'<'} previous</a>
              <a className={`pagBtn${next ? ' active' : ''}`} onClick={onNext}>next {'>'}</a>
            </div>
          </div>
        </div>
        <StatsOutput token={this.state.token} name={this.state.name} bleh={this.state.selected}/>
      </div>
    )
  }
}

export default PlaylistSidebar;