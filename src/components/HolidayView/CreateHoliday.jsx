import { useEffect, useState, useRef } from "react";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

import axios from "axios";

export default ({ employeeData, holidaysData, setHolidaysData }) => {
  let employeeInput = "";

  const startDateInput = useRef();
  const endDateInput = useRef();
  const approvedInput = useRef();

  const [approvedStatus, setApprovedStatus] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState();
  const [filteredHolidayData, setFilteredHolidayData] = useState();

  useEffect(() =>
    console.log("Holidays Data (Create Holiday): ", holidaysData)
  );

  const createHolidayHandler = () => {
    let approvalStatus;

    if (approvedInput.current.value) approvalStatus = true;
    else approvalStatus = false;

    const createdHoliday = {
      // BUG: Obtains LAST option value, and not selected value.
      startDate: startDateInput.current.value,
      endDate: endDateInput.current.value,
      approved: approvalStatus,
      // employee: parseInt(employeeInput.current.value),
      employeeId: parseInt(employeeInput),
    };

    console.log("Created Holiday: ", createdHoliday);

    console.log("INPUTS");
    // console.log(employeeInput.current);
    console.log(startDateInput.current);
    console.log(endDateInput.current);
    console.log(approvedInput.current);

    axios({
      method: "post",
      url: "/create_holiday",
      data: createdHoliday,
    });

    // setHolidaysData(holidaysData.push(createdHoliday))
  };

  const filterHolidays = () => {
    let tempFilteredData;

    // Filters
    let employee;
    let startDate;
    let endDate;
    let approved;

    // Query String
    let queryString;

    if (employeeInput) employee = `employee=${employeeInput}&`;
    // else if (employeeInput === "Choose Employee") employee = "";
    else employee = "";

    if (startDateInput.current.value)
      startDate = `startDate=${startDateInput.current.value}&`;
    else startDate = "";

    if (endDateInput.current.value)
      endDate = `endDate=${endDateInput.current.value}&`;
    else endDate = "";

    approved = `approved=${approvedStatus}&`;

    // if (approvedStatus) approved = `approved=${approvedInput.current.value}&`;
    // else approved = false;

    queryString = `?${employee}${startDate}${endDate}${approved}`;

    console.log("Query String: ", queryString);

    // parseInt(employeeInput)

    // if (employee || startDateInput || endDateInput || approvedInput) {
    //   queryString = `?${employee}${startDate}${endDate}${approved}`;
    //   console.log("Query String: ", queryString);
    //   console.log(typeof queryString);
    // }

    // } else {
    //   employee = "";
    //   startDate = "";
    //   endDate = "";
    //   approved = "";
    // }

    // queryString = `?${employee}${startDate}${endDate}${approved}`;

    axios({
      method: "get",
      url: `/holidays${queryString}`,
    })
      .then((response) => {
        tempFilteredData = response.data;
      })
      .then(() => {
        console.log(tempFilteredData);
        setHolidaysData(tempFilteredData);
        // setFilteredHolidayData(tempFilteredData);
      })
      .then(() => console.log("Filtered Shift Data", holidaysData))
      .catch((err) => console.error(err));
  };

  const handleSelectEmployee = (e) => {
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

        <Input ref={startDateInput} type="date" w="10rem" mr="2rem" />
        <Input ref={endDateInput} type="date" w="8rem" mr="4rem" />
        <Checkbox
          ref={approvedInput}
          size="lg"
          value
          onChange={() => {
            {
              approvedStatus && setApprovedStatus(false);
            }
            {
              !approvedStatus && setApprovedStatus(true);
            }
          }}
        />
      </Stack>

      <Stack direction="row" spacing="1rem">
        <Button width="6rem" onClick={createHolidayHandler}>
          Add Shift
        </Button>
        <Button width="6rem" onClick={filterHolidays}>
          Filter
        </Button>
        <Button width="6rem">Reset</Button>
      </Stack>
    </Flex>
  );
};
