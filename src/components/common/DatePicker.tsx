import { DatePickerProps } from "./components.const";
import { ChangeEvent } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import "../../styles/styles.css";

export const DatePicker = ({
  date,
  time,
  setDate,
  setTime,
  min,
}: DatePickerProps) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  return (
    <Box bg={"gray.200"} rounded={"lg"} w={"100%"} h={"2em"}>
      <Flex>
        <Spacer />
        <input
          type="date"
          className={"datePicker"}
          value={date}
          min={min}
          onChange={handleDateChange}
        />
        <Spacer />
        <input
          type="time"
          className={"timePicker"}
          value={time}
          onChange={handleTimeChange}
        />
        <Spacer />
      </Flex>
    </Box>
  );
};
