import { useState } from "react";
import StatsOutput from "../StatsOutput/StatsOutput";
import type { Playlist } from "../../types";

interface PlaylistSidebarProps {
  token: string;
  playlists: Playlist[];
  previous: string | null;
  next: string | null;
  onNext: () => void;
  onPrevious: () => void;
  pageNum: number;
}

const PlaylistSidebar = ({
  token,
  playlists,
  previous,
  next,
  onNext,
  onPrevious,
  pageNum,
}: PlaylistSidebarProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const handleClick = (id: string | null, name: string) => {
    setSelected(id);
    setSelectedName(name);
  };

  return (
    <div id="hasToken">
      <div className="sidebar">
        <h2>playlistats</h2>
        <ul>
          <li onClick={() => handleClick(null, "Recently Played")} key={0}>
            Recently Played
          </li>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              onClick={() => handleClick(playlist.id, playlist.name)}
              className={`playlist_item ${
                selected === playlist.id ? "active" : ""
              }`}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
        <div id="footer">
          <p id="pageCount">page {pageNum}</p>
          <div id="pagination">
            <button
              disabled={!previous}
              className={`pagBtn${previous ? " active" : ""}`}
              onClick={onPrevious}
            >
              {"<"} previous
            </button>
            <button
              className={`pagBtn${next ? " active" : ""}`}
              onClick={onNext}
            >
              next {">"}
            </button>
          </div>
        </div>
      </div>
      <StatsOutput token={token} name={selectedName} playlist_id={selected} />
    </div>
  );
};

export default PlaylistSidebar;
