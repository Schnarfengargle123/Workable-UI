import { useState, useRef } from "react";
import { Tbody, Tr, Td, Avatar, Button, Select, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

export default ({
  id,
  employee,
  date,
  startTime,
  finishTime,
  duration,
  employeeData,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState();
  const [updatedRecord, setUpdatedRecord] = useState();

  const currentEmployee = useRef();
  const currentShiftDate = useRef();
  const currentStartTime = useRef();
  const currentEndTime = useRef();
  const currentDuration = useRef();

  const updatedEmployee = useRef();
  const updatedShiftDate = useRef();
  const updatedStartTime = useRef();
  const updatedEndTime = useRef();
  const updatedDuration = useRef();

  let tempCurrentRecord;

  const getCurrentRecordValues = () => {
    tempCurrentRecord = {
      employee: currentEmployee.current.innerHTML,
      shiftDate: currentShiftDate.current.innerHTML,
      startTime: currentStartTime.current.innerHTML,
      endTime: currentEndTime.current.innerHTML,
      duration: currentDuration.current.innerHTML,
    };

    console.log(tempCurrentRecord);
    setCurrentRecord(tempCurrentRecord);
  };

  const handleUpdateShift = () => {
    let shiftId = id;
    // shiftId = parseInt(shiftId);

    setUpdatedRecord({
      employee: currentEmployee.current.innerHTML,
      shiftDate: currentShiftDate.current.value,
      startTime: currentStartTime.current.value,
      endTime: currentEndTime.current.value,
      duration: currentDuration.current.innerHTML,
    });

    axios({
      method: "put",
      url: "/update_shift",
      data: updatedRecord,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));

    console.log("Record Updated!");
    setIsEdit(false);
  };

  const handleDeleteShift = () => {
    let shiftId = id;

    console.log(typeof shiftId);
    // shiftId = parseInt(shiftId);

    axios({
      method: "delete",
      url: `/delete_shift/${shiftId}`,
    })
      .then((response) => {
        console.log(response);

        // const token = response.json();
        // console.log("TOKEN: ", token);

        // document.cookie = `token=${token}`;
      })
      .catch((err) => console.error(err));
  };

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
