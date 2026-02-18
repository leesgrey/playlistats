import { PlaylistProvider } from "../../contexts/PlaylistContext";
import Sidebar from "../Sidebar/Sidebar";

function Dashboard() {
  return (
    <PlaylistProvider>
      <Sidebar />
      <div id="content">content</div>
    </PlaylistProvider>
  );
}

export default Dashboard;
