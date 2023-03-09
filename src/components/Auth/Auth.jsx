import { useState } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Highlight,
  Input,
  Text,
} from "@chakra-ui/react";

export default () => {
  const [authState, setAuthState] = useState("Login");

  // const secondaryButton = document.querySelector("#button");

  // if (authState === "Login") {
  //   // const secondaryButton = document.querySelector("#secondary-button");
  //   secondaryButton.innerHTML = "or Register";
  // } else {
  //   secondaryButton.innerHTML = "or Login";
  // }

  return (
    <Center>
      <Box w="25%" mt="2rem">
        <Flex direction="column">
          <Heading mt="12" mb="4">
            <Highlight query="Workable" styles={{ color: "orange.300" }}>
              Welcome to Workable
            </Highlight>
          </Heading>

          <Center>
            <Box
              w="80%"
              minH={authState === "Login" ? "28rem" : "42rem"}
              // minH="42rem"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="user1@email.com" />
                <FormHelperText color="orange.300" mt="1rem">
                  Please enter your email here.
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" placeholder="user1" />
                  <FormHelperText color="orange.300" mt="1rem">
                    Please enter your email here.
                  </FormHelperText>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="••••••••••••" />
                <FormHelperText color="orange.300" mt="1rem">
                  Please enter your password here.
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="email" placeholder="••••••••••••" />
                  <FormHelperText color="orange.300" mt="1rem">
                    Please enter your email here.
                  </FormHelperText>
                </FormControl>
              )}

              <Box w="20rem" alignSelf="center" mt="4">
                <Button width="20rem">{authState}</Button>
              </Box>

              <Button
                bgColor="transparent"
                _hover={"background: transparent;"}
                _active={"background: transparent;"}
                fontWeight="medium"
                onClick={() => {
                  {
                    authState === "Login"
                      ? setAuthState("Register")
                      : setAuthState("Login");
                  }
                }}
              >
                {authState === "Login" ? "or Register" : "or Login"}
              </Button>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Center>
  );
};
