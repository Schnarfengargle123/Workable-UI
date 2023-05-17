import { useEffect, useState, useRef } from "react";
import {
  Checkbox,
  Tbody,
  Tr,
  Td,
  Avatar,
  Button,
  Select,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

export default ({
  id,
  startDate,
  endDate,
  approved,
  employeeId,
  employeeData,
  employee,
  holidaysData,
  setHolidaysData,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState();
  const [updatedRecord, setUpdatedRecord] = useState();

  let employeeInput = "";

  // const currentEmployee = useRef();
  const currentStartDate = useRef();
  const currentEndDate = useRef();
  const currentApproved = useRef();

  const updatedId = useRef("");
  const updatedEmployee = useRef("");
  const updatedStartDate = useRef("");
  const updatedEndDate = useRef("");
  const updatedApproved = useRef("");

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
        url: "/update_holiday",
        data: updatedRecord,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.error(err));

    console.log("Updated Record: (useEffect): ", updatedRecord);
  }, [updatedRecord]);

  useEffect(() => {
    console.log("isEdit: ", isEdit);
  }, [isEdit]);

  const getCurrentRecordValues = () => {
    let approvalStatus;

    if (currentApproved.current.innerHTML === "Approved") {
      approvalStatus = true;
    } else {
      approvalStatus = false;
    }

    setCurrentRecord({
      id,
      // Suggestion: Rename to `initialStartDate` to avoid confusion
      startDate: currentStartDate.current.innerHTML,
      endDate: currentEndDate.current.innerHTML,
      approved: approvalStatus,
      employee,
    });

    console.log("Current Record: ", currentRecord);
  };

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

  // const handleEditHoliday = () => {
  //   getCurrentRecordValues();
  //   setIsEdit(true);
  //   console.log("isEdit: ", isEdit);
  // };

  const handleUpdateHoliday = () => {
    // We need to make an API call to the backend, by sending the ID of the shift,
    // and then return a response, which contains the user, along with their username,
    // and then store the username into the to be updated shift username.

    let approvalStatus;

    if (updatedApproved.current.value) approvalStatus = true;
    else approvalStatus = false;

    setUpdatedRecord({
      id,
      startDate: updatedStartDate.current.value,
      endDate: updatedEndDate.current.value,
      // approved: updatedApproved.current.innerHTML,
      approved: approvalStatus,
      employee: parseInt(employeeInput),
      // employee: parseInt(employeeInput),
    });

    console.log("Updated Record: ", updatedRecord);

    console.log("Record Updated!");
    setIsEdit(false);
  };

  const handleRevertHoliday = () => {
    console.log("Undo update holiday");
  };

  const handleDeleteHoliday = () => {
    let holidayId = id;

    setHolidaysData(holidaysData.filter((holiday) => holiday.id !== holidayId));

    console.log(typeof holidayId);

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
                <Avatar size="2xs" />
              </option>
            ))}
          </Select>
        ) : (
          <Td id="employee">
            {/* <Avatar name={employee} title={id} /> */}
            <h1>{employee}</h1>
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
          <Td ref={currentStartDate} id="start-date">
            {startDate}
          </Td>
        )}

        {isEdit ? (
          <Input ref={updatedEndDate} type="date" w="6rem" mr="4rem" />
        ) : (
          <Td ref={currentEndDate} id="end-date">
            {endDate}
          </Td>
        )}

        {/* BUG: useRef */}

        {isEdit ? (
          <Checkbox ref={updatedApproved} size="lg" value />
        ) : (
          <Td id="approved" ref={currentApproved}>
            {approved ? "Approved" : "Pending"}
          </Td>
        )}

        <Td>
          <Button
            onClick={
              isEdit
                ? handleUpdateHoliday
                : () => {
                    getCurrentRecordValues();
                    setIsEdit(true);
                    // console.log("isEdit: ", isEdit);
                  }
            }
          >
            {isEdit ? "Update" : "Edit"}
          </Button>
        </Td>

        <Td>
          <Button
            onClick={isEdit ? () => setIsEdit(false) : handleRevertHoliday}
          >
            {isEdit ? "Cancel" : "Undo"}
          </Button>
        </Td>

        <Td>
          <DeleteIcon onClick={handleDeleteHoliday} />
        </Td>
      </Tr>
    </Tbody>
  );
};
