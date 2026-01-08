import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Component } from "react";
import StatsOutput from "./StatsOutput.js";
class PlaylistSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      token: this.props.token,
      no_data: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id, name) {
    this.setState({
      selected: id,
      name: name,
    });
  }
  render() {
    const { previous, onPrevious, next, onNext, pageNum } = this.props;
    return _jsxs("div", {
      id: "hasToken",
      children: [
        _jsxs("div", {
          className: "sidebar",
          children: [
            _jsx("h2", { children: "playlistats" }),
            _jsxs("ul", {
              children: [
                _jsx(
                  "li",
                  {
                    onClick: () => this.handleClick(0, "Recently Played"),
                    children: "Recently Played",
                  },
                  0
                ),
                Array.from(this.props.playlists).map((i) =>
                  _jsx(
                    "li",
                    {
                      onClick: () => this.handleClick(i.id, i.name),
                      className: "playlist_item",
                      children: i.name,
                    },
                    i.id
                  )
                ),
              ],
            }),
            _jsxs("div", {
              id: "footer",
              children: [
                _jsxs("p", { id: "pageCount", children: ["page ", pageNum] }),
                _jsxs("div", {
                  id: "pagination",
                  children: [
                    _jsxs("a", {
                      className: `pagBtn${previous ? " active" : ""}`,
                      onClick: onPrevious,
                      children: ["<", " previous"],
                    }),
                    _jsxs("a", {
                      className: `pagBtn${next ? " active" : ""}`,
                      onClick: onNext,
                      children: ["next ", ">"],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        _jsx(StatsOutput, {
          token: this.state.token,
          name: this.state.name,
          playlist_id: this.state.selected,
        }),
      ],
    });
  }
}
export default PlaylistSidebar;
//# sourceMappingURL=PlaylistSidebar.js.map
