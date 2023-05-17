import { useEffect, useState, useRef } from "react";
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

  let employeeInput = "";

  // const currentEmployee = useRef();
  // const currentEmployee = useRef();
  const currentShiftDate = useRef();
  const currentStartTime = useRef();
  const currentEndTime = useRef();
  const currentDuration = useRef();

  const updatedId = useRef("");
  const updatedEmployee = useRef("");
  const updatedShiftDate = useRef("");
  const updatedStartTime = useRef("");
  const updatedEndTime = useRef("");
  // const updatedDuration = useRef();

  let tempCurrentRecord;

  useEffect(
    () => console.log("Current Record (useEffect): ", currentRecord),
    [currentRecord]
  );

  useEffect(
    () => console.log("Updated Record: (useEffect): ", updatedRecord),
    [updatedRecord]
  );

  useEffect(() => {
    if (updatedRecord)
      axios({
        method: "put",
        url: "/update_shift",
        data: updatedRecord,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.error(err));

    console.log("Updated Record: (useEffect): ", updatedRecord);
  }, [updatedRecord]);

  // if (updatedRecord)
  //     axios({
  //       method: "put",
  //       url: "/update_shift",
  //       data: updatedRecord,
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((err) => console.error(err));

  // useEffect(() => {
  //   console.log("Current Employee: ", id);
  //   console.log("Current Shift Date: ", currentShiftDate.current.innerHTML);
  //   console.log("Current Start Time: ", currentStartTime.current.innerHTML);
  //   console.log("Current End Time: ", currentEndTime.current.innerHTML);
  //   console.log("Current Duration: ", currentDuration.current.innerHTML);
  //   console.log("Current Record", currentRecord);
  // }, [
  //   id,
  //   currentShiftDate,
  //   currentStartTime,
  //   currentEndTime,
  //   currentDuration,
  //   currentRecord,
  // ]);

  // useEffect(() => {
  //   setUpdatedRecord({
  //     id,
  //     shiftDate: updatedShiftDate.current.innerHTML, // Acessed prior to being set
  //     startTime: updatedStartTime.current.value, // All return undefined
  //     endTime: updatedEndTime.current.value,
  //     duration: getShiftDuration(),
  //     employee: parseInt(employeeInput),
  //   });
  // }, [id, updatedShiftDate, updatedStartTime, updatedEndTime, employeeInput]);

  const getCurrentRecordValues = () => {
    // const tempRecord = {
    //   id,
    //   shiftDate: currentShiftDate.current.innerHTML,
    //   startTime: currentStartTime.current.innerHTML,
    //   endTime: currentEndTime.current.innerHTML,
    //   duration: currentDuration.current.innerHTML,
    //   employee,
    // };

    // console.log("Temp Record: ", tempRecord);

    setCurrentRecord({
      id,
      shiftDate: currentShiftDate.current.innerHTML,
      startTime: currentStartTime.current.innerHTML,
      endTime: currentEndTime.current.innerHTML,
      duration: currentDuration.current.innerHTML,
      employee,
    });

    console.log("Current Record: ", currentRecord);

    // tempCurrentRecord = {
    //   id,
    //   shiftDate: currentShiftDate.current.innerHTML,
    //   startTime: currentStartTime.current.innerHTML,
    //   endTime: currentEndTime.current.innerHTML,
    //   duration: currentDuration.current.innerHTML,
    //   employee: currentEmployee.current.innerHTML,
    // };

    // console.log(tempCurrentRecord);
    // setCurrentRecord(tempCurrentRecord);
  };

  const getShiftDuration = () => {
    // BUG: Shift duration calculates incorrect shift durations, if endtime is during
    // the next day, i.e, a night shift will of 22:00 - 06:00 will resolve to "16h"

    // FIX: Implement a start date, AND an end date, to compensate for night shifts.
    // { id: 10, shiftDate: "2023-05-14", startTime: "23:00", endTime: "01:00", duration: "22h", employee: 1 }

    const startDateTime = new Date(
      `${updatedShiftDate.current.value} ${updatedStartTime.current.value}:00`
    );

    console.log("Start Date Time: ", startDateTime);

    const endDateTime = new Date(
      `${updatedShiftDate.current.value} ${updatedEndTime.current.value}:00`
    );

    console.log("End Date Time: ", endDateTime);

    const shiftDuration = `${Math.floor(
      Math.abs(startDateTime.getTime() - endDateTime.getTime()) / 3600000
    )}h`;

    return shiftDuration;
  };

  // Let's test this logic using Jest

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

  const handleEditShift = () => {
    // const currentShiftId = e.target.value;
    getCurrentRecordValues();
    setIsEdit(true);
    console.log("isEdit: ", isEdit);

    // return currentShiftId;
  };

  const handleUpdateShift = () => {
    // We need to make an API call to the backend, by sending the ID of the shift,
    // and then return a response, which contains the user, along with their username,
    // and then store the username into the to be updated shift username.

    setUpdatedRecord({
      id,
      shiftDate: updatedShiftDate.current.value, // Acessed prior to being set
      startTime: updatedStartTime.current.value,
      endTime: updatedEndTime.current.value,
      duration: getShiftDuration(),
      employee: parseInt(employeeInput),
    });

    console.log("Updated Record: ", updatedRecord);

    // if (updatedRecord) {
    //   console.log("Updated the shift record!");
    // } else {
    //   console.log("Not updated yet!");
    // }

    // if (updatedRecord)
    //   axios({
    //     method: "put",
    //     url: "/update_shift",
    //     data: updatedRecord,
    //   })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => console.error(err));

    // axios({
    //   method: "put",
    //   url: "/update_shift",
    //   data: updatedRecord,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.error(err));

    console.log("Record Updated!");
    setIsEdit(false);
  };

  const handleRevertShift = () => {
    console.log("Undo update shift");
  };

  const handleDeleteShift = () => {
    let shiftId = id;

    console.log(typeof shiftId);

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
        {isEdit ? (
          <Select
            onChange={handleSelectEmployee}
            placeholder="Choose Employee"
            ref={updatedId}
            name={id}
            w="10rem"
          >
            {employeeData.map((employee) => (
              <option ref={updatedEmployee} value={employee.id}>
                {employee.username}
              </option>
            ))}
          </Select>
        ) : (
          <Td id="employee">
            <Avatar name={employee} title={id} />
            {/* <Avatar ref={currentEmployee} name={employee} title={id} /> */}
            {/* <label style={{ display: "block" }}>{employee.username}</label> */}
            {/*
             `ref` needs to be set to the aria-label attribute of the 
             <div>, which is rendered in the real DOM, in order to obtain
             the actual username. 
             */}
          </Td>
        )}

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
          <Button onClick={isEdit ? handleUpdateShift : handleEditShift}>
            {isEdit ? "Update" : "Edit"}
          </Button>
        </Td>

        <Td>
          <Button onClick={isEdit ? () => setIsEdit(false) : handleRevertShift}>
            {isEdit ? "Cancel" : "Undo"}
          </Button>
        </Td>

        <Td>
          <DeleteIcon onClick={handleDeleteShift} />
        </Td>
      </Tr>
    </Tbody>
  );
};
