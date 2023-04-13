import { useState, useRef } from "react";
import { Tbody, Tr, Td, Avatar, Button, Select, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

export default () => {
  return (
    <Tbody>
      <Tr>
        {/* <Select placeholder="Choose Employee" w="12rem">
          {employeeData.map((employee) => (
            <option value="Employee">
              {employee.username}
              <Avatar size="2xs" />
            </option>
          ))}
        </Select>

        <Input type="date" w="10rem" mr="2rem" />
        <Input type="time" w="8rem" mr="4rem" />
        <Input type="time" w="8rem" mr="6rem" /> */}

        {/* IS EDIT */}

        {isEdit ? (
          <Select placeholder="Choose Employee" w="10rem">
            {employeeData.map((employee) => (
              <option ref={updatedEmployee} value="Employee">
                {employee.username}
                <Avatar size="2xs" />
              </option>
            ))}
          </Select>
        ) : (
          <Td id="employee">
            <Avatar ref={currentEmployee} name={employee} />
            {/*
             `ref` needs to be set to the aria-label attribute of the 
             <div>, which is rendered in the real DOM, in order to obtain
             the actual username. 
             */}
          </Td>
        )}

        {/* <Td>
          <Avatar />
        </Td> */}

        {isEdit ? (
          <Input ref={updatedShiftDate} type="date" w="10rem" mr="2rem" />
        ) : (
          <Td ref={currentShiftDate} id="shift-date">
            {date}
          </Td>
        )}

        {isEdit ? (
          <Input ref={updatedStartTime} type="time" w="6rem" mr="4rem" />
        ) : (
          <Td ref={currentStartTime} id="start-time">
            {startTime}
          </Td>
        )}

        {isEdit ? (
          <Input ref={updatedEndTime} type="time" w="6rem" mr="6rem" />
        ) : (
          <Td ref={currentEndTime} id="end-time">
            {finishTime}
          </Td>
        )}

        <Td ref={currentDuration} id="duration">
          {duration}
        </Td>

        <Td>
          <Button
            onClick={
              isEdit
                ? handleUpdateShifthandleUpdateShift()
                : () => {
                    getCurrentRecordValues();
                    setIsEdit(true);
                    console.log("isEdit: ", isEdit);
                  }
            }
          >
            {isEdit ? "Update" : "Edit"}
          </Button>
        </Td>

        <Td>
          <DeleteIcon onClick={handleDeleteShift} />
        </Td>
      </Tr>
    </Tbody>
  );
};
