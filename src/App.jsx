import { useState } from "react";
import "./styles.css";

import axios from "axios";

import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";

import ShiftView from "./components/ShiftView/ShiftView";

axios.defaults.baseURL = "https://g5jd7s-8080.csb.app";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Navigation />

      {/* {isLoggedIn ? <Welcome /> : <Auth />} */}

      <ShiftView />
    </div>
  );
}
