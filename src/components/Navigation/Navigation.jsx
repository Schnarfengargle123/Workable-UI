import { Box, Flex, Link } from "@chakra-ui/react";

export default ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  loggedInUser,
  setLoggedInUser,
}) => {
  const handleLogout = () => {
    setCurrentPage("auth");
    setIsLoggedIn(false);
  };

  return (
    <Box
      bg="teal.200"
      w="100%"
      h="4rem"
      boxShadow="lg"
      borderBottom="2px"
      borderBottomColor="teal.700"
    >
      <Flex direction="row" justify="space-around" align="center" h="100%">
        <Link
          fontSize="x-large"
          onClick={() =>
            isLoggedIn ? setCurrentPage("welcome") : setCurrentPage("auth")
          }
        >
          Workable
        </Link>

        {isLoggedIn && (
          <Box w="20%">
            <Flex direction="row" justify="space-around" align="center">
              <Link onClick={() => setCurrentPage("my_profile")}>
                My Profile
              </Link>
              <Link onClick={() => setCurrentPage("holidays")}>Holidays</Link>
              <Link
                onClick={() => {
                  setCurrentPage("shift_manager");
                }}
              >
                Shift Manager
              </Link>
              <Link onClick={handleLogout}>Logout</Link>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
