import { useEffect, useState } from "react";
import "./styles.css";

import axios from "axios";

import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";
import HolidayView from "./components/HolidayView/HolidayView";

import ShiftView from "./components/ShiftView/ShiftView";

axios.defaults.baseURL = "https://g5jd7s-8080.csb.app";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("auth");
  const [employeeData, setEmployeeData] = useState();

  useEffect(() => {
    let tempData;

    axios
      .get("/staff")
      .then((response) => {
        console.log(response);
        tempData = response.data;
      })
      .then(() => {
        console.log(tempData);
        setEmployeeData(tempData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* {isLoggedIn ? (
        <Welcome />
      ) : (
        <Auth currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )} */}

      {currentPage === "auth" && (
        <Auth currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "welcome" && <Welcome />}
      {currentPage === "holidays" && <HolidayView employeeData={employeeData} />}
      {currentPage === "shift_manager" && <ShiftView />}

      {/* {currentView === "home" && <Home />}
        {currentView === "about" && <About />}
        {currentView === "topics" && <Topics />} */}

      {/* <ShiftView /> */}
    </div>
  );
}
