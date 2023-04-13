import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

import axios from "axios";

export default ({ employeeData }) => {
  const employeeInput = useRef();
  const dateInput = useRef();
  const startTimeInput = useRef();
  const finishTimeInput = useRef();

  const [selectedEmployee, setSelectedEmployee] = useState();
  const [filteredShiftData, setFilteredShiftData] = useState();

  const createShiftHandler = () => {
    // Calculate shift duration

    const getShiftDuration = () => {
      const startDateTime = new Date(
        `${dateInput.current.value} ${startTimeInput.current.value}:00`
      );
      const endDateTime = new Date(
        `${dateInput.current.value} ${finishTimeInput.current.value}:00 `
      );

      const shiftDuration = `${Math.floor(
        Math.abs(startDateTime.getTime() - endDateTime.getTime()) / 3600000
      )}h`;

      return shiftDuration;
    };

    const shiftDuration = getShiftDuration();
    console.log("shiftDuration: ", shiftDuration);

    // const startDateTime = `${dateInput.current.value} ${startTimeInput.current.value}:00`;
    // const endDateTime = `${dateInput.current.value} ${startTimeInput.current.value}:00`;

    // console.log("startDateTime: ", startDateTime);
    // console.log("endDateTime: ", endDateTime);

    // const dateStart = new Date(startDateTime);
    // const dateEnd = new Date(endDateTime);

    // console.log("dateStart: ", dateStart);
    // console.log("dateEnd: ", dateEnd);

    // const timeDifference =
    //   // Math.abs(dateStart.getTime() - dateEnd.getTime()) / 36e5;
    //   Math.floor(Math.abs(dateStart.getTime() - dateEnd.getTime()) / 3600000);
    // const duration = `${timeDifference}h`;

    // console.log("Time Difference: ", timeDifference);
    // console.log("Duration: ", duration);

    // ============================================================

    const createdShift = {
      // BUG: Obtains LAST option value, and not selected value.
      date: dateInput.current.value,
      startTime: startTimeInput.current.value,
      finishTime: finishTimeInput.current.value,
      duration: shiftDuration,
      employee: parseInt(employeeInput.current.value),
      // date: dateInput.current.value,
      // startTime: startTimeInput.current.value,
      // finishTime: finishTimeInput.current.value,
    };

    console.log("Created Shift: ", createdShift);

    console.log("INPUTS");
    console.log(employeeInput.current);
    console.log(dateInput.current);
    console.log(startTimeInput.current);
    console.log(finishTimeInput.current);

    axios({
      method: "post",
      url: "/create_shift",
      data: createdShift,
    });
  };

  const filterShifts = () => {
    let tempFilteredData;

    // const filteredShiftData = {
    //   // BUG: Obtains LAST option value, and not selected value.
    //   employee: employeeInput.current.innerHTML,
    //   date: dateInput.current.value,
    //   startTime: startTimeInput.current.value,
    //   finishTime: finishTimeInput.current.value,
    //   duration: shiftDuration,
    //   // date: dateInput.current.value,
    //   // startTime: startTimeInput.current.value,
    //   // finishTime: finishTimeInput.current.value,
    // };

    const queryString = "?start_time=09:00&finish_time=18:00";

    axios({
      method: "get",
      url: `/shifts${queryString}`,
      // data: createdShift,
    })
      .then((response) => {
        tempFilteredData = response.data;
      })
      .then(() => {
        console.log(tempFilteredData);
        setFilteredShiftData(tempFilteredData);
      })
      .then(() => console.log("Filtered Shift Data", filteredShiftData))
      .catch((err) => console.error(err));

    // axios
    // .get("/staff")
    // .then((response) => {
    //   console.log(response);
    //   tempData = response.data;
    // })
    // .then(() => {
    //   console.log(tempData);
    //   setEmployeeData(tempData);
    // })
    // .catch((err) => console.log(err));
  };

  // const [employeeData, setemployeeData] = useState([]);

  // useEffect(() => {
  //   let tempData;

  //   axios
  //     .get("/staff")
  //     .then((response) => {
  //       console.log(response);
  //       tempData = response.data;
  //     })
  //     .then(() => {
  //       console.log(tempData);
  //       setemployeeData(tempData);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
              value={employee.id}
            >
              {employee.username}
              {/* <Avatar size="2xs" /> */}
            </option>
          ))}
        </Select>

        <Input ref={dateInput} type="date" w="10rem" mr="2rem" />
        <Input ref={startTimeInput} type="time" w="8rem" mr="4rem" />
        <Input ref={finishTimeInput} type="time" w="8rem" mr="6rem" />
      </Stack>

      <Stack direction="row" spacing="1rem">
        <Button width="6rem" onClick={createShiftHandler}>
          Add Shift
        </Button>
        <Button width="6rem" onClick={filterShifts}>
          Filter
        </Button>
        <Button width="6rem">Reset</Button>
      </Stack>
    </Flex>
  );
};
