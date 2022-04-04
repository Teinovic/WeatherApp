import logo from "./logo.svg";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return <div>{API_KEY}</div>;
}

export default App;
