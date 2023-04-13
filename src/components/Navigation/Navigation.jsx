import { Box, Flex, Link } from "@chakra-ui/react";

export default (props) => {
  // export default ({setCurrentPage}) => {
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
        <Link fontSize="x-large">Workable</Link>

        <Box w="15%">
          <Flex direction="row" justify="space-around" align="center">
            <Link onClick={() => props.setCurrentPage("holidays")}>
              Holidays
            </Link>
            <Link
              onClick={() => {
                props.setCurrentPage("shift_manager");
              }}
            >
              Shift Manager
            </Link>
            <Link>Logout</Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
