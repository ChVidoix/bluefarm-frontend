import { Box, Flex } from "@chakra-ui/react";
import { WeatherEventModel } from "../../service/BlueFarm.service.const";

export const WeatherTile = ({
  weatherEvent,
}: {
  weatherEvent?: WeatherEventModel;
}) => {
  return (
    <Flex direction={"column"} w="100%" h="100%" bg="gray.400" rounded={"lg"}>
      <Box>{weatherEvent?.date}</Box>
      <Box>{weatherEvent?.max_temp}</Box>
      <Box>{weatherEvent?.min_temp}</Box>
      <Box>{weatherEvent?.rainfall}</Box>
      <Box>{weatherEvent?.description}</Box>
    </Flex>
  );
};
