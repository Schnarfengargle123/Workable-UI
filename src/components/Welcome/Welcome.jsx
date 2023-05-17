import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default ({ loggedInUser }) => {
  useEffect(() => {
    console.log("Logged In User: ", loggedInUser);
    console.log("Current Date: ", currentDate);
    console.log("Upcoming Shifts: ", loggedInUser.upcomingShifts);

    // const nextShift = loggedInUser.upcomingShifts.filter(
    //   (shift) => shift.date === currentDate
    // );
  }, [loggedInUser]);

  let currentDate = new Date();
  currentDate = `${currentDate.getFullYear()}-0${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  let nextShift;
  let nextHoliday;

  // BUG: `loggedInUser.upcomingShifts` initially returns undefined.

  if (loggedInUser.upcomingShifts) {
    console.log("Shifts");
    // nextShift = loggedInUser.upcomingShifts.filter(
    //   (shift) => shift.date === currentDate
    // );
    nextShift = loggedInUser.upcomingShifts[0];
    console.log(nextShift);
  }

  return (
    <Box mt="2">
      {/* 
        Needs to recieve response from backend with username related 
        to email, when logging in, rather than registering.
      */}
      <h1>Welcome {loggedInUser.username}</h1>
      <p>
        Your next shift is on <span>{nextShift && nextShift.date}</span> at{" "}
        <span>{nextShift && nextShift.start_time}</span>
      </p>
    </Box>
  );
};
