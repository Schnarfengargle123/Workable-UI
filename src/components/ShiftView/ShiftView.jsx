import { useState, useEffect } from "react";

import axios from "axios";

import ShiftFilter from "./ShiftFilter";
import CreateShift from "./CreateShift";
import ShiftRecord from "./ShiftRecord";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

// Table,Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer

export default () => {
  const [shiftData, setShiftData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  // // const [employeeInputValue, setEmployeeInputValue] = useState();
  // // const [shiftDateInputValue, setShiftDateInputValue] = useState();
  // // const [startTimeInputValue, setStartTimeInputValue] = useState();
  // // const [endTimeInputValue, setEndTimeInputValue] = useState();

  useEffect(() => {
    let tempShiftData;

    fetch("https://g5jd7s-8080.csb.app/shifts")
      .then((response) => response.json())
      .then((data) => {
        tempShiftData = data;
      })
      .then(() => {
        console.log(tempShiftData);
        setShiftData(tempShiftData);
      })
      .catch((err) => console.error(err));

    let tempData;

    axios
      .get("/staff")
      .then((response) => {
        console.log(response);
        tempData = response.data;
      })
      .then(() => {
        console.log(tempData);
        setEmployeeData(tempData);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <Center mt="4rem">
      <Box w="90%" px="1rem">
        <Flex direction="column">
          {/* <ShiftFilter /> */}
          <CreateShift
            employeeData={employeeData}
            employeeInput
            shiftDateInput
            startTimeInput
            endTimeInput
          />
        </Flex>

        <TableContainer mt="8rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Employee</Th>
                <Th>Shift Date</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Duration</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>

            {shiftData.map((shift) => (
              <ShiftRecord
                id={shift.id}
                date={shift.date}
                startTime={shift.start_time}
                finishTime={shift.finish_time}
                duration={shift.duration}
                employeeId={shift.employee.employeeId}
                employee={shift.employee.username}
                // employeeData
                employeeData={employeeData}
              />
              // <h2>{shift.duration}</h2>
            ))}

            {/* <Tbody>
            <Tr>
              <Td>
                <Avatar />
              </Td>

              <Td>Monday 20th</Td>

              <Td>09:00</Td>

              <Td>17:00</Td>

              <Td>8h</Td>
            </Tr>
          </Tbody> */}

            {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
            <TableCaption>Shift Manager View</TableCaption>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};
