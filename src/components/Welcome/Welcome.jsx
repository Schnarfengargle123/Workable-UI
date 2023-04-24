import { Box } from "@chakra-ui/react";

export default ({ loggedInUser }) => {
  return (
    <Box mt="2">
      <h1>Welcome {loggedInUser.username}</h1>
      <p>
        Your next shift is on<span>shift date</span> at <span>shift time.</span>
      </p>
    </Box>
  );
};
