import {
  Box,
  Center,
  Flex,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { WeatherEventModel } from "../../service/BlueFarm.service.const";
import { formatOnlyDate } from "../../service/BlueFarmService";
import "../../styles/styles.css";
import { EditWeatherEventDrawer } from "./EditWeatherEventDrawer";

export const WeatherTile = ({
  weatherEventOrDate,
}: {
  weatherEventOrDate: WeatherEventModel | string;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const renderTileTitleBox = (text: string): JSX.Element => (
    <Center>
      <Center
        rounded={"lg"}
        bg={"gray.500"}
        w={"100%"}
        mt={1}
        fontWeight={"bold"}
      >
        {text}
      </Center>
    </Center>
  );

  const renderMinMaxTempTiles = (min: number, max: number): JSX.Element => (
    <>
      <Flex w={"100%"}>
        <Center
          rounded={"lg"}
          bg={"gray.500"}
          w={"48%"}
          mt={1}
          fontWeight={"bold"}
        >
          Min
        </Center>
        <Spacer />
        <Center
          rounded={"lg"}
          bg={"gray.500"}
          w={"48%"}
          mt={1}
          fontWeight={"bold"}
        >
          Max
        </Center>
      </Flex>
      <Flex w={"100%"}>
        <Center w={"48%"} mt={1}>
          {min}°C
        </Center>
        <Spacer />
        <Center w={"48%"} mt={1}>
          {max}°C
        </Center>
      </Flex>
    </>
  );

  const renderTextTooltip = (text: string) => (
    <Box w={"100%"}>
      {text.length > 15 ? (
        <Tooltip label={text} aria-label={"tooltip"}>
          {`${text.slice(0, 12)}...`}
        </Tooltip>
      ) : (
        <>{text}</>
      )}
    </Box>
  );

  const renderTileContent =
    typeof weatherEventOrDate == "object" ? (
      <Flex
        direction={"column"}
        w={"95%"}
        h={"100%"}
        pb={1}
        onClick={onOpen}
        className={"weatherTile"}
      >
        {renderTileTitleBox(formatOnlyDate(weatherEventOrDate.date))}
        {renderMinMaxTempTiles(
          weatherEventOrDate.min_temp,
          weatherEventOrDate.max_temp
        )}
        {renderTileTitleBox("Rainfall")}
        {renderTextTooltip(weatherEventOrDate.rainfall)}
        {renderTileTitleBox("Description")}
        {renderTextTooltip(weatherEventOrDate.description)}
      </Flex>
    ) : (
      <Flex direction={"column"} w={"95%"} h={"100%"} pb={1}>
        {renderTileTitleBox(formatOnlyDate(weatherEventOrDate))}
        <Center w={"100%"} h={"100%"}>
          no weather defined yet
        </Center>
      </Flex>
    );

  return (
    <>
      <Center w={"100%"} bg="gray.400" rounded={"lg"}>
        {renderTileContent}
      </Center>

      {typeof weatherEventOrDate === "object" && (
        <EditWeatherEventDrawer
          event={weatherEventOrDate}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
