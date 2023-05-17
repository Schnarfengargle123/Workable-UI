import { useEffect, useState } from "react";
import "./styles.css";

import axios from "axios";

import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";
import HolidayView from "./components/HolidayView/HolidayView";
import MyProfile from "./components/MyProfile/MyProfile";
import ShiftView from "./components/ShiftView/ShiftView";

import Test from "./components/Test/Test";

axios.defaults.baseURL = "https://g5jd7s-8080.csb.app";
// axios.defaults.baseURL = "http://localhost:8080";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [loggedInUser, setLoggedInUser] = useState({
  //   email: "",
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const [loggedInUser, setLoggedInUser] = useState();

  const [currentPage, setCurrentPage] = useState("auth");
  const [employeeData, setEmployeeData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [holidaysData, setHolidaysData] = useState();

  useEffect(() => {
    axios
      .get("/staff")
      .then((response) => {
        console.log("Fetching employeeData: ", response);
        setEmployeeData(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/shifts")
      .then((response) => {
        console.log("Fetching shiftsData: ", response);
        setShiftsData(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/holidays")
      .then((response) => {
        console.log("Fetching holidaysData: ", response);
        setHolidaysData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => axios
  //     .get("/shifts")
  //     .then((response) => {
  //       console.log("Fetching shiftsData: ", response);
  //       setShiftsData(response.data);
  //     })
  //     .catch((err) => console.log(err)), [createShiftHandler, handleUpdateShift, handleRevertShift, handleDeleteShift]);

  console.log("Employee Data: ", employeeData);
  console.log("Shifts Data: ", shiftsData);
  console.log("Holidays Data: ", holidaysData);

  return (
    <div className="App">
      {/* <h2>Test</h2> */}
      <Test />

      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      {currentPage === "auth" && (
        <Auth
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          isLoggedIn
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {currentPage === "welcome" && <Welcome loggedInUser={loggedInUser} />}
      {currentPage === "my_profile" && (
        <MyProfile
          holidaysData={holidaysData}
          employeeData={employeeData}
          loggedInUser={loggedInUser}
        />
      )}
      {currentPage === "holidays" && (
        <HolidayView
          holidaysData={holidaysData}
          setHolidaysData={setHolidaysData}
          employeeData={employeeData}
        />
      )}
      {currentPage === "shift_manager" && (
        <ShiftView shiftsData={shiftsData} employeeData={employeeData} />
      )}
    </div>
  );
}
