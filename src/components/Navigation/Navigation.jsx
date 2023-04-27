import { Box, Flex, Link } from "@chakra-ui/react";

export default ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  loggedInUser,
  setLoggedInUser,
}) => {
  const handleLogout = () => setCurrentPage("auth");

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
            isLoggedIn ? setCurrentPage("welcome") : setCurretPage("auth")
          }
        >
          Workable
        </Link>

        {isLoggedIn && (
          <Box w="15%">
            <Flex direction="row" justify="space-around" align="center">
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
