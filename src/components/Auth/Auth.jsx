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

export default () => {
  const [authState, setAuthState] = useState("Login");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [loggedInUser, setLoggedInUser] = useState({
  //   email,
  //   username,
  //   password,
  //   confirmPassword,
  // });

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
  // const loggedInUser = {
  //   email: email,
  //   username: username,
  //   password: password,
  //   confirmPassword: confirmPassword,
  // }

  const authenticate = (authState) => {
    // const loggedInUser = { email, username, password, confirmPassword };

    fetch("https://g5jd7s-8080.csb.app/auth", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loggedInUser),
      // body: JSON.stringify({
      //   email: "test@email.com",
      //   username: "test",
      //   password: "secret",
      //   confirmPassword: "secret",
      // }),
      // // // body: JSON.stringify({
      // // //   email: loggedInUser.email,
      // // //   username: loggedInUser.username,
      // // //   password: loggedInUser.password,
      // // //   confirmPassword: loggedInUser.confirmPassword,
      // // // }),
      // // // body: JSON.stringify({
      // // //   email: "test@email.com",
      // // //   username: "test",
      // // //   password: "secret",
      // // //   confirmPassword: "secret",
      // // // }),
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    // {authState === "Login" ? loggedInUser = {username, email} : loggedInUser = {username, email}}
    // setLoggedInUser({email: })
    // console.log(email);

    // setLoggedInUser({ email: email, username, password, confirmPassword });

    console.log("loggedInUser");
    console.log(loggedInUser);

    //   axios
    //     .post("/auth", {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       // data: {
    //       //   loggedInUser,
    //       // },
    //       data: { user: "Mr Bean" },
    //     })
    //     .then((response) => console.log(response))
    //     .catch((err) => console.error(err));
  };

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
