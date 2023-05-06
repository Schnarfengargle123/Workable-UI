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
  let employeeInput = "";
  // const employeeInput = useRef();
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

    // ============================================================

    const createdShift = {
      // BUG: Obtains LAST option value, and not selected value.
      date: dateInput.current.value,
      startTime: startTimeInput.current.value,
      finishTime: finishTimeInput.current.value,
      duration: shiftDuration,
      // employee: parseInt(employeeInput.current.value),
      employee: parseInt(employeeInput),
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

    const queryString = "?start_time=09:00&finish_time=18:00&date=2023_05_26;";

    axios({
      method: "get",
      url: `/shifts${queryString}`,
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

  const handleSelectEmployee = (e) => {
    // POTENTIAL BUG: If employee `id` field is not equal to index position,
    // i.e, admin has id of 1, but 3rd element in array, then selectedInputValue
    // assigns the shift instance to the wrong user (the user with an id of 3).
    // id should in fact be equal to 1, to assign the shift to the correct user,
    // i.e, the admin user.

    const selectedInputValue = e.target[e.target.selectedIndex].value;

    console.log(
      "Value: " +
        e.target.value +
        "; Display: " +
        e.target[e.target.selectedIndex].text +
        "."
    );

    console.log(selectedInputValue);

    employeeInput = selectedInputValue;

    return selectedInputValue;
  };

  //   function getSelectedValue(event) {
  //    console.log("Value: " + event.target.value + "; Display: " + event.target[event.target.selectedIndex].text + ".");
  // }

  return (
    <Flex direction="row" justify="space-between" w="100%" px="1rem">
      <Stack direction="row" spacing="2rem">
        <Select
          onChange={handleSelectEmployee}
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
              // ref={employeeInput}
              value={employee.id}
            >
              {employee.username}
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
