import { useState, useEffect, useReducer } from "react";
import type { Playlist } from "types";
import { getPlaylists } from "../../services/calls";
import { useAuth } from "../../contexts/AuthContext";
import { getUserInfo } from "../../services/calls";

type FilterState = {
  search: string;
  sort: "name" | "date";
  showOnlyOwned: boolean;
  showOnlyCollaborative: boolean;
};

type Action =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: "name" | "date" }
  | { type: "TOGGLE_OWNED" }
  | { type: "TOGGLE_COLLABORATIVE" };

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "TOGGLE_OWNED":
      return {
        ...state,
        showOnlyOwned: !state.showOnlyOwned,
      };
    case "TOGGLE_COLLABORATIVE":
      return { ...state, showOnlyCollaborative: !state.showOnlyCollaborative };
    default:
      return state;
  }
}

function Sidebar() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [filterState, dispatch] = useReducer(filterReducer, {
    search: "",
    sort: "name",
    showOnlyOwned: false,
    showOnlyCollaborative: false,
  });
  const token = useAuth()?.token;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getUserInfo(token).then((data) => {
      setUserId(data.id);
    });

    getPlaylists(
      token,
      (data) => {
        setPlaylists(data);
        setLoading(false);
      },
      null,
    );
  }, [token]);

  useEffect(() => {
    let filtered = [...playlists];

    if (filterState.showOnlyOwned) {
      filtered = filtered.filter((p) => p.owner.id === userId);
    }

    setFilteredPlaylists(filtered);
  }, [filterState.showOnlyOwned, playlists]);

  return (
    <div id="sidebar">
      <div>
        <button
          onClick={() => {
            dispatch({ type: "TOGGLE_OWNED" });
          }}
        >
          owned
        </button>
      </div>
      {loading ? (
        <div>Loading playlists...</div>
      ) : (
        <ul>
          {filteredPlaylists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
