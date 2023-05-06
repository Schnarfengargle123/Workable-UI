import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default ({ loggedInUser }) => {
  useEffect(() => {
    console.log(loggedInUser);
  });

  return (
    <Box mt="2">
      {/* 
        Needs to recieve response from backend with username related 
        to email, when logging in, rather than registering.
      */}
      <h1>Welcome {loggedInUser.username}</h1>
      <p>
        Your next shift is on<span>shift date</span> at <span>shift time.</span>
      </p>
    </Box>
  );
};
