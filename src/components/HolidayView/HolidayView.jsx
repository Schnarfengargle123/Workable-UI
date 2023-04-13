import { useEffect, useState, useRef } from "react";
import axios from "axios";

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

import { DeleteIcon } from "@chakra-ui/icons";

import CreateHoliday from "./CreateHoliday";
import HolidayRecord from "./HolidayRecord";

export default () => {
  const [holidayData, setHolidayData] = useState();

  useEffect(() => {
    let tempHolidayData;

    axios
      .get("/holidays")
      .then((response) => (tempHolidayData = response.data))
      .then(() => {
        console.log("tempHolidayData: ", tempHolidayData);
        setHolidayData([...tempHolidayData]);
        // setHolidayData(tempHolidayData);
      })
      .then(() => console.log(holidayData));
  }, []);

  return (
    // <h2>Content</h2>

    <Center mt="4rem">
      <Box w="90%" px="1rem">
        <Flex direction="column">
          <CreateHoliday
            holidayData
            employeeInput
            holidayStartDateInput
            holidayEndDateInput
          />
        </Flex>

        <TableContainer mt="8rem">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Employee</Th>
                <Th>Holiday Start Date</Th>
                <Th>Holiday End Date</Th>
                <Th>Approved</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>

            {holidayData.map((holiday) => (
              <HolidayRecord
                id={holiday.id}
                startDate={holiday.start_date}
                endDate={holiday.end_date}
                employeeId={holiday.employee.employeeId}
                // employee={shift.employee.username}
                // holidayData={holidayData}
                holidayData
              />
            ))}

            <TableCaption>Employee Holiday View</TableCaption>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};
