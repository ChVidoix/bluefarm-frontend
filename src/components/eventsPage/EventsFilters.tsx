import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiltersMap } from "../common/components.const";
import { DatePicker } from "../common/DatePicker";
import { setFilteredEvents, setFilters } from "../../actions/BlueFarmActions";
import { filterEvents } from "../../service/BlueFarmService";

export const EventsFilters = () => {
  const {
    state: {
      filters: { startTimestamp, endTimestamp },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterStartTime, setFilterStartTime] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterEndTime, setFilterEndTime] = useState("");
  const [timePeriod, setTimePeriod] = useState(String(FiltersMap.all));

  const {
    state: { events },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const handleMenuList = (value: string) => {
    if (value === FiltersMap.all) {
      dispatch(setFilters({ start: +new Date(), end: 2147483648000 }));
    } else if (value === FiltersMap.week) {
      dispatch(
        setFilters({
          start: +new Date(),
          end: +new Date() + 7 * 24 * 60 * 60 * 1000,
        })
      );
    } else if (value === FiltersMap.twoWeeks) {
      dispatch(
        setFilters({
          start: +new Date(),
          end: +new Date() + 14 * 24 * 60 * 60 * 1000,
        })
      );
    } else if (value === FiltersMap.month) {
      dispatch(
        setFilters({
          start: +new Date(),
          end: +new Date() + 31 * 24 * 60 * 60 * 1000,
        })
      );
    } else if (value === FiltersMap.previous) {
      dispatch(
        setFilters({
          start: 0,
          end: +new Date(),
        })
      );
    }

    setTimePeriod(value);
  };

  useEffect(() => {
    if (timePeriod === FiltersMap.custom) {
      const parsedStartTimestamp = Date.parse(
        `${filterStartDate} ${filterStartTime}`
      );
      const parsedEndTimestamp = Date.parse(
        `${filterEndDate} ${filterEndTime}`
      );

      if (!parsedStartTimestamp && !parsedEndTimestamp) {
        dispatch(
          setFilters({
            start: 0,
            end: 2147483648000,
          })
        );
      } else if (parsedStartTimestamp && !parsedEndTimestamp) {
        dispatch(
          setFilters({
            start: parsedStartTimestamp,
            end: 2147483648000,
          })
        );
      } else if (!parsedStartTimestamp && parsedEndTimestamp) {
        dispatch(
          setFilters({
            start: 0,
            end: parsedEndTimestamp,
          })
        );
      } else {
        dispatch(
          setFilters({
            start: parsedStartTimestamp,
            end: parsedEndTimestamp,
          })
        );
      }
    }
  }, [filterStartDate, filterStartTime, filterEndDate, filterEndTime]);

  useEffect(() => {
    if (events) {
      if (startTimestamp === 0 && endTimestamp === 0) {
        dispatch(
          setFilteredEvents(
            filterEvents({
              events,
              startTimestamp: 0,
              endTimestamp: 2147483648000,
            })
          )
        );
      } else {
        dispatch(
          setFilteredEvents(
            filterEvents({ events, startTimestamp, endTimestamp })
          )
        );
      }
    }
  }, [startTimestamp, endTimestamp]);

  useEffect(() => {
    setTimePeriod(FiltersMap.all);
  }, [events]);

  const renderMenuItems = () => {
    return Object.keys(FiltersMap).map((key: string) => (
      <MenuItem key={key} value={FiltersMap[key]}>
        {FiltersMap[key]}
      </MenuItem>
    ));
  };

  return (
    <Flex direction={"column"} w={"75%"} mt={10} minH={"5em"}>
      <Spacer />
      <Flex w={"100%"} h={"4em"} mb={5} rounded={"lg"} bg={"gray.300"}>
        <Spacer />
        <Center color={"gray.700"} height={"100%"}>
          Wybierz wydarzenia:
        </Center>
        <Spacer />
        <Center color={"gray.700"} height={"100%"}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"15em"}>
              {timePeriod}
            </MenuButton>
            <MenuList onClick={(e: any) => handleMenuList(e.target.value)}>
              {renderMenuItems()}
            </MenuList>
          </Menu>
        </Center>
        <Spacer />
      </Flex>
      <Spacer />
      {timePeriod === FiltersMap.custom && (
        <Flex w={"100%"} h={"4em"}>
          <Flex
            direction={"column"}
            h={"100%"}
            w={"46%"}
            rounded={"lg"}
            bg={"gray.300"}
          >
            <Center h={"2em"}>Wydarzenia rozpoczynające się od:</Center>
            <DatePicker
              date={filterStartDate}
              setDate={setFilterStartDate}
              time={filterStartTime}
              setTime={setFilterStartTime}
            />
          </Flex>
          <Spacer />
          <Flex
            direction={"column"}
            h={"100%"}
            w={"46%"}
            rounded={"lg"}
            bg={"gray.300"}
          >
            <Center h={"2em"}>Wydarzenia rozpoczynające się przed:</Center>
            <DatePicker
              date={filterEndDate}
              setDate={setFilterEndDate}
              min={filterStartDate}
              time={filterEndTime}
              setTime={setFilterEndTime}
            />
          </Flex>
        </Flex>
      )}
      <Spacer />
    </Flex>
  );
};
