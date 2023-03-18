import { useState, useEffect } from "react";

import ShiftFilter from "./ShiftFilter";
import CreateShift from "./CreateShift";
import ShiftRecord from "./ShiftRecord";

import {
  Avatar,
  Box,
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
  }, []);

  return (
    <Box>
      <Flex direction="row">
        <ShiftFilter />
        <CreateShift />
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Employee</Th>
              <Th>Shift Date</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Duration</Th>
            </Tr>
          </Thead>

          {shiftData.map((shift) => (
            <ShiftRecord
              employee={shift.employee}
              date={shift.date}
              startTime={shift.start_time}
              finishTime={shift.finish_time}
              duration={shift.duration}
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
  );
};
