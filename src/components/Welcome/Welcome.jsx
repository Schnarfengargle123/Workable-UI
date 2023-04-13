import { Box } from "@chakra-ui/react";

export default () => {
  return (
    <Box mt="2">
      <h1>Welcome User</h1>
      <p>
        Your next shift is on<span>shift date</span> at <span>shift time.</span>
      </p>
    </Box>
  );
};
