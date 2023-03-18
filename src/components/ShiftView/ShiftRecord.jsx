import { Tbody, Tr, Td, Avatar } from "@chakra-ui/react";

export default ({ employee, date, startTime, finishTime, duration }) => {
  return (
    <Tbody>
      <Tr>
        <Td>
          <Avatar />
        </Td>

        <Td>{date}</Td>

        <Td>{startTime}</Td>

        <Td>{finishTime}</Td>

        <Td>{duration}</Td>
      </Tr>
    </Tbody>
  );
};
