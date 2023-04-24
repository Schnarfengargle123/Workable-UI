import { useState, useRef } from "react";
import { Tbody, Tr, Td, Avatar, Button, Select, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

export default ({ employeeData, startDate, endDate, approved, employeeId }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [currentRecord, setCurrentRecord] = useState();
  const [updatedRecord, setUpdatedRecord] = useState();

  const currentEmployee = useRef();
  const currentStartDate = useRef();
  const currentEndDate = useRef();
  const currentApproved = useRef();

  const updatedEmployee = useRef();
  const updatedStartDate = useRef();
  const updatedEndDate = useRef();

  const getCurrentRecordValues = () => {
    tempCurrentRecord = {
      employee: currentEmployee.current.innerHTML,
      startDate: currentStartDate.current.innerHTML,
      endDate: currentEndTime.current.innerHTML,
      approved: currentApproved.current.innerHTML,
    };

    console.log(tempCurrentRecord);
    setCurrentRecord(tempCurrentRecord);
  };

  const handleUpdateHoliday = () => {
    // let holidayId = id;

    setUpdatedRecord({
      employee: currentEmployee.current.innerHTML,
      startDate: currentStartDate.current.innerHTML,
      endDate: currentEndTime.current.innerHTML,
      approved: currentApproved.current.innerHTML,
    });

    axios({
      method: "put",
      url: "/update_holiday",
      data: updatedRecord,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));

    console.log("Record Updated!");
    setIsEdit(false);
  };

  const handleDeleteHoliday = () => {
    let holidayId = id;

    console.log(typeof shiftId);
    // shiftId = parseInt(shiftId);

    axios({
      method: "delete",
      url: `/delete_holiday/${holidayId}`,
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
            {/* <Avatar ref={currentEmployee} name={employee} /> */}
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
          <Input ref={updatedStartDate} type="date" w="10rem" mr="2rem" />
        ) : (
          <Td ref={currentStartDate} id="shift-date">
            {startDate}
          </Td>
        )}

        {isEdit ? (
          <Input ref={updatedEndDate} type="time" w="6rem" mr="4rem" />
        ) : (
          <Td ref={currentEndDate} id="start-time">
            {endDate}
          </Td>
        )}

        <Td id="duration" ref={currentApproved}>
          {approved}
        </Td>

        <Td>
          <Button
            onClick={
              isEdit
                ? handleUpdateHoliday()
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
          <DeleteIcon onClick={handleDeleteHoliday} />
        </Td>
      </Tr>
    </Tbody>
  );
};
