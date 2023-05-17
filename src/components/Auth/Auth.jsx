import { useEffect, useState } from "react";
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

export default ({
  currentPage,
  setCurrentPage,
  loggedInUser,
  setLoggedInUser,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  // export default (props) => {
  const [authState, setAuthState] = useState("Login");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [upcomingShifts, setUpcomingShifts] = useState("");
  const [upcomingHolidays, setUpcomingHolidays] = useState("");

  const [isValidEmail, setIsValidEmail] = useState();
  const [isValidUsername, setIsValidUsername] = useState();
  const [isValidPassword, setIsValidPassword] = useState();
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();

  const [emailValidationMessage, setEmailValidationMessage] = useState();
  const [usernameValidationMessage, setUsernameValidationMessage] = useState();
  const [passwordValidationMessage, setPasswordValidationMessage] = useState();
  const [
    confirmPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
  ] = useState();

  // useEffect(() => {
  //   setLoggedInUser({ email, username, password, confirmPassword });
  // }, [email, username, password, confirmPassword]);

  useEffect(() => {
    console.log("Email: ", email);
    console.log("Username: ", username);
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
    console.log("Upcoming Shifts: ", upcomingShifts);
    console.log("Upcoming Holidays: ", upcomingHolidays);

    setLoggedInUser({
      email,
      username,
      password,
      confirmPassword,
      upcomingShifts,
      upcomingHolidays,
    });
  }, [
    email,
    username,
    password,
    confirmPassword,
    // upcomingShifts,
    // upcomingHolidays,
  ]);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const debounce = (func, delay = 1000) => {
    let timeoutInstance;

    return (...args) => {
      console.log("User is typing...");
      clearTimeout(timeoutInstance);

      timeoutInstance = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);

    // setIsValidEmail(false);

    debounce(() => {
      console.log("Debounce function called!");

      if (email.length < 7) {
        // || email.includes('@')
        setIsValidEmail(false);
        setEmailValidationMessage("Please enter a valid email");
      } else if (!email) {
        setIsValidEmail(false);
        setEmailValidationMessage("Field must not be empty");
      }
    }, 1000);

    // setTimeout(() => {
    //   if (email.length < 7) {
    //     setIsValidEmail(false);
    //     setEmailValidationMessage("Please enter a valid email");
    //   } else if (!email) {
    //     setIsValidEmail(false);
    //     setEmailValidationMessage("Field must not be empty");
    //   }
    // }, 1000);

    // console.log(email);
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

  // const loggedInUser = { email, username, password, confirmPassword };
  // setLoggedInUser({ email, username, password, confirmPassword });

  const authenticate = () => {
    // Using Axios

    //     const {data} = await axios.post('https://httpbin.org/post', {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    //     orders: [1, 2, 3],
    //     photo: document.querySelector('#fileInput').files
    //   }, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // )

    axios({
      method: "post",
      url: "/auth",
      data: loggedInUser,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log(response.data.username);
        const fetchedUsername = response.data.username;
        // setUsername(response.data.username);
        // setUsername(fetchedUsername);
        setUsername(response.data.username);
        setUpcomingShifts(response.data.upcomingShifts);
        setUpcomingHolidays(response.data.upcomingHolidays);

        if (fetchedUsername) {
          setLoggedInUser({
            email,
            username: fetchedUsername,
            password,
            confirmPassword,
            // upcomingShifts,
            // upcomingHolidays,
            upcomingShifts: response.data.upcomingShifts,
            upcomingHolidays: response.data.upcomingHolidays,
          });
        }

        // setLoggedInUser({ email, username, password, confirmPassword });
      })
      .then(() => {
        // setLoggedInUser({ email, username, password, confirmPassword });
        console.log("THEN: ", loggedInUser);
      })
      .then(() => {
        console.log("THEN AGAIN: ", loggedInUser);
      });

    // setLoggedInUser({ email, username, password, confirmPassword });

    console.log("NO ERRORS!");
    setIsLoggedIn(true);
    console.log("isLoggedIn: ", isLoggedIn);
    console.log("loggedInUser: ", loggedInUser);
    setCurrentPage("welcome");

    // axios
    //   .post("/auth", loggedInUser, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((response) => {
    //     console.log("RESPONSE: ", response);
    //     console.log("We just logged in!");
    //   });

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

    // fetch("https://g5jd7s-8080.csb.app/auth", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(loggedInUser),
    // }).then((response) => {
    //   console.log("RESPONSE: ", response);
    // });

    // axios.post("/auth", loggedInUser).then((response) => {
    //   console.log("RESPONSE: ", response);
    //   console.log("We just logged in!");
    // });

    // axios
    //   .post("/auth", loggedInUser)
    //   .then((response) => {
    //     console.log("AUTH RESPONSE: ", response);

    //     const token = response.data.token;
    //     console.log("TOKEN: ", token);

    //     document.cookie = `token=${token}`;
    //   })
    //   .catch((err) => {
    //     console.log(err);

    // if (err) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // }

    // else {
    //   console.log("NO ERRORS!");
    //   setIsLoggedIn(true);
    //   console.log("isLoggedIn: ", isLoggedIn);
    //   console.log("loggedInUser: ", loggedInUser);
    //   setCurrentPage("welcome");
    // }
    // });

    // setLoggedInUser({ email, username, password, confirmPassword });

    // console.log("NO ERRORS!");
    // setIsLoggedIn(true);
    // console.log("isLoggedIn: ", isLoggedIn);
    // console.log("loggedInUser: ", loggedInUser);
    // setCurrentPage("welcome");

    //   axios.post('/user', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // .then((response) => {
    //   console.log(response);

    //   const token = response.data.token;
    //   console.log("TOKEN: ", token);

    //   document.cookie = `token=${token}`;
    // })
    // .catch((err) => {
    //   console.log(err.toJSON());

    //   if (err) {
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //   } else if (!err) {
    //     console.log("NO ERRORS!");
    //     setIsLoggedIn(true);
    //     console.log("isLoggedIn: ", isLoggedIn);
    //     console.log("loggedInUser: ", loggedInUser);
    //     setCurrentPage("welcome");
    //   }

    //     console.log("loggedInUser");
    // console.log(loggedInUser);

    // // This logic should be conditional, based on whether or not we recieved a 200 res
    // setIsLoggedIn(true);
    // console.log(isLoggedIn);

    // setCurrentPage("welcome");

    // console.error(err);
    // });

    // setIsLoggedIn(true);
    // console.log("isLoggedIn: ", isLoggedIn);
    // console.log("loggedInUser: ", loggedInUser);
    // setCurrentPage("welcome");

    // ==================================================

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

    // Using Axios (Alternative Syntax)

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
                  // value={loggedInUser.email}
                  value={email}
                />
                <FormHelperText
                  color="orange.400"
                  mt="1rem"
                  visibility={isValidEmail ? "hidden" : "visible"}
                >
                  {emailValidationMessage}
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="user1"
                    onChange={handleUsername}
                    // value={loggedInUser.username}
                    value={username}
                  />
                  <FormHelperText
                    color="orange.400"
                    mt="1rem"
                    visibility={isValidUsername ? "hidden" : "visible"}
                  >
                    {usernameValidationMessage}
                  </FormHelperText>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  onChange={handlePassword}
                  // value={loggedInUser.password}
                  value={password}
                />
                <FormHelperText
                  color="orange.400"
                  mt="1rem"
                  visibility={isValidPassword ? "hidden" : "visible"}
                >
                  {passwordValidationMessage}
                </FormHelperText>
              </FormControl>

              {authState === "Register" && (
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                  />
                  <FormHelperText
                    color="orange.400"
                    mt="1rem"
                    visibility={isValidConfirmPassword ? "hidden" : "visible"}
                  >
                    {/* {isValidConfirmPassword ? "" : "Passwords must match"} */}
                    {/* {!isValidConfirmPassword && "Passwords must match"} */}

                    {confirmPasswordValidationMessage}
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
                // _hover={"background: transparent;"} // Fails test
                // _active={"background: transparent;"} // Fails test
                background="transparent"
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
