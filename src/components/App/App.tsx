import "./App.css";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import { useAuth } from "../../contexts/AuthContext";
// import { PAGE_SIZE } from "../../utils/constants";

function App() {
  const { token } = useAuth() || {};

  return <div className="App">{token ? <Dashboard /> : <Login />}</div>;
}

export default App;
