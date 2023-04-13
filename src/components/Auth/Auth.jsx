import { useState } from "react";
import axios from "axios";

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
} from "@chakra-ui/react";

export default ({ currentPage, setCurrentPage }) => {
  // export default (props) => {
  const [authState, setAuthState] = useState("Login");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const loggedInUser = { email, username, password, confirmPassword };

  const authenticate = () => {
    // Using FetchAPI

    // fetch("https://g5jd7s-8080.csb.app/auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(loggedInUser),
    // })
    //   .then((response) => {
    //     console.log("Response: ", response);

    //     // const token = response.json();
    //     // console.log("TOKEN: ", token);

    //     // document.cookie = `token=${token}`;
    //   })
    //   .catch((err) => console.error(err));

    // ==================================================

    // Using Axios

    // axios
    //   .post("/auth", loggedInUser, {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);

    //     // const token = response.json();
    //     // console.log("TOKEN: ", token);

    //     // document.cookie = `token=${token}`;
    //   })
    //   .catch((err) => console.error(err));

    // ==================================================

    // Using Axios (Alternative Syntax)

    axios({
      method: "post",
      url: "/auth",
      data: loggedInUser,
    })
      .then((response) => {
        console.log(response);

        const token = response.data.token;
        console.log("TOKEN: ", token);

        document.cookie = `token=${token}`;
      })
      .catch((err) => console.error(err));

    setCurrentPage("welcome");

    console.log("loggedInUser");
    console.log(loggedInUser);
  };

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
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="user1@email.com"
                  onChange={handleEmail}
                  value={loggedInUser.email}
                />
                <FormHelperText color="orange.300" mt="1rem">
                  Please enter your email here.
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="user1"
                    onChange={handleUsername}
                    value={loggedInUser.username}
                  />
                  <FormHelperText color="orange.300" mt="1rem">
                    Please enter your email here.
                  </FormHelperText>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  onChange={handlePassword}
                  value={loggedInUser.password}
                />
                <FormHelperText color="orange.300" mt="1rem">
                  Please enter your password here.
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="email"
                    placeholder="••••••••••••"
                    onChange={handleConfirmPassword}
                    value={loggedInUser.confirmPassword}
                  />
                  <FormHelperText color="orange.300" mt="1rem">
                    Please enter your email here.
                  </FormHelperText>
                </FormControl>
              )}

              <Box w="20rem" alignSelf="center" mt="4">
                <Button width="20rem" onClick={authenticate}>
                  {authState}
                </Button>
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
