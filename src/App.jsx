import { useState } from "react";
import "./styles.css";

import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Navigation />

      {isLoggedIn ? <Welcome /> : <Auth />}
    </div>
  );
}
