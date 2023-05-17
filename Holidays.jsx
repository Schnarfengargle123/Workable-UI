import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

export default ({ employeeData }) => {
  const employeeInput = useRef();
  const startDateInput = useRef();
  const endDateInput = useRef();

  useEffect(() => console.log(employeeData), []);

  const createHoliday = () => {
    const createdHoliday = {
      
    };

    axios({
      method: "post",
      url: "/create_holiday",
      data: createdHoliday,
    });

    //  axios({
    //     method: "post",
    //     url: "/create_shift",
    //     data: createdShift,
    //   });
  };

  return (
    <Flex direction="row" justify="space-between" w="100%" px="1rem">
      <Stack direction="row" spacing="2rem">
        <Select
          // onChange={(e) => {
          //   // setSelectedEmployee(e.options[e.selectedIndex].text);
          //   setSelectedEmployee(e.target[e.selectedIndex].text);
          //   console.log(selectedEmployee);
          //   // console.log(e);
          // }}
          placeholder="Choose Employee"
          w="12rem"
        >
          {employeeData.map((employee) => (
            <option
              // onClick={(e) => {
              //   // setSelectedEmployee(e.target.innerHTML);
              //   setSelectedEmployee(e);
              //   console.log(selectedEmployee);
              //   console.log(e);
              // }}
              ref={employeeInput}
              value="Employee"
            >
              {employee.username}
              {/* <Avatar size="2xs" /> */}
            </option>
          ))}
        </Select>

        <Input ref={startDateInput} type="date" w="10rem" mr="2rem" />
        <Input ref={endDateInput} type="date" w="8rem" mr="4rem" />
      </Stack>

      <Stack direction="row" spacing="1rem">
        <Button width="10rem" onClick={createHoliday}>
          Create Holiday
        </Button>
        <Button width="6rem">Filter</Button>
        <Button width="6rem">Reset</Button>
      </Stack>
    </Flex>
  );
};
