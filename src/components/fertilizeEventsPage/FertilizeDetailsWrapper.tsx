import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  filterFertilizeEvents,
  formatDate,
  getFertilizeEventsYears,
  getNearestFertilizeEvent,
} from "../../service/BlueFarmService";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  CashFiltersMap,
  FertilizeFiltersMap,
} from "../common/components.const";
import {
  setFertilizeEventsFilters,
  setFilteredFertilizeEvents,
} from "../../actions/BlueFarmActions";

export const FertilizeDetailsWrapper = () => {
  const {
    state: {
      crops: {
        fertilization: {
          fertilizeEvents,
          filters: { startTimestamp, endTimestamp },
        },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [timePeriod, setTimePeriod] = useState(String(FertilizeFiltersMap.all));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const yearsList = getFertilizeEventsYears(fertilizeEvents);

  const nearestEvent = getNearestFertilizeEvent(fertilizeEvents);

  useEffect(() => {
    dispatch(
      setFilteredFertilizeEvents(
        filterFertilizeEvents({
          events: fertilizeEvents,
          startTimestamp,
          endTimestamp,
        })
      )
    );
  }, [startTimestamp, endTimestamp]);

  const handleMenuChange = (value: string) => {
    if (value === CashFiltersMap.all) {
      dispatch(
        setFertilizeEventsFilters(
          +new Date(),
          +new Date(`${new Date().getFullYear()}-12-31`)
        )
      );
    } else if (value === CashFiltersMap.week) {
      dispatch(
        setFertilizeEventsFilters(
          +new Date(),
          +new Date() + 7 * 24 * 60 * 60 * 1000
        )
      );
    } else if (value === CashFiltersMap.twoWeeks) {
      dispatch(
        setFertilizeEventsFilters(
          +new Date(),
          +new Date() + 14 * 24 * 60 * 60 * 1000
        )
      );
    } else if (value === CashFiltersMap.month) {
      dispatch(
        setFertilizeEventsFilters(
          +new Date(),
          +new Date() + 31 * 24 * 60 * 60 * 1000
        )
      );
    } else if (value === CashFiltersMap.previous) {
      dispatch(setFertilizeEventsFilters(0, +new Date()));
    } else if (value === CashFiltersMap.byYear) {
      const startDate = +new Date(`${selectedYear}-01-01`);
      dispatch(
        setFertilizeEventsFilters(
          startDate,
          startDate + 365 * 24 * 60 * 60 * 1000
        )
      );
    }
    setTimePeriod(value);
  };

  const handleYearsMenuChange = (year: string) => {
    const startDate = +new Date(`${year}-01-01`);
    dispatch(
      setFertilizeEventsFilters(
        startDate,
        startDate + 365 * 24 * 60 * 60 * 1000
      )
    );
    setSelectedYear(+year);
  };

  const renderMenuItems = () => {
    return Object.keys(CashFiltersMap).map((key: string) => (
      <MenuItem key={key} value={CashFiltersMap[key]}>
        {CashFiltersMap[key]}
      </MenuItem>
    ));
  };

  const renderYearsMenuItems = () => {
    return yearsList.map((key: string) => (
      <MenuItem key={key} value={key}>
        {key}
      </MenuItem>
    ));
  };

  return (
    <Center w={"100%"} h={"20em"} mt={5}>
      <Flex w={"95%"} h={"100%"} bg={"gray.200"} rounded={"lg"}>
        <Center w={"50%"} h={"100%"}>
          <Flex direction={"column"} w={"95%"} h={"100%"}>
            <Center w={"100%"} mb={5}>
              <Heading
                w={"25vw"}
                h={"7vh"}
                color={"gray.600"}
                rounded={"lg"}
                bg={"gray.300"}
              >
                <Center>Upcoming</Center>
              </Heading>
            </Center>
            <Box w={"100%"}>
              {nearestEvent ? (
                <Grid
                  h="200px"
                  templateRows="repeat(3, 1fr)"
                  templateColumns="repeat(4, 1fr)"
                  gap={4}
                >
                  <GridItem bg={"gray.300"} rounded={"lg"}>
                    <Center
                      w={"100%"}
                      h={"100%"}
                      fontWeight={"bold"}
                      color={"gray.600"}
                    >
                      Name:
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center w={"100%"} h={"100%"}>
                      {nearestEvent.name}
                    </Center>
                  </GridItem>
                  <GridItem bg={"gray.300"} rounded={"lg"}>
                    <Center
                      w={"100%"}
                      h={"100%"}
                      fontWeight={"bold"}
                      color={"gray.600"}
                    >
                      Type:
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center w={"100%"} h={"100%"}>
                      {nearestEvent.type}
                    </Center>
                  </GridItem>
                  <GridItem bg={"gray.300"} rounded={"lg"}>
                    <Center
                      w={"100%"}
                      h={"100%"}
                      fontWeight={"bold"}
                      color={"gray.600"}
                    >
                      Date:
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center w={"100%"} h={"100%"}>
                      {formatDate(nearestEvent.date)}
                    </Center>
                  </GridItem>
                  <GridItem bg={"gray.300"} rounded={"lg"}>
                    <Center
                      w={"100%"}
                      h={"100%"}
                      fontWeight={"bold"}
                      color={"gray.600"}
                    >
                      Amount:
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center w={"100%"} h={"100%"}>
                      {nearestEvent.amount}kg
                    </Center>
                  </GridItem>
                  <GridItem bg={"gray.300"} rounded={"lg"}>
                    <Center
                      w={"100%"}
                      h={"100%"}
                      fontWeight={"bold"}
                      color={"gray.600"}
                    >
                      Description:
                    </Center>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Center h={"100%"}>{nearestEvent.description}</Center>
                  </GridItem>
                </Grid>
              ) : (
                <Center
                  h={"100%"}
                  w={"100%"}
                  fontWeight={"bold"}
                  color={"gray.600"}
                >
                  You don't have any fertilization events added yet.
                </Center>
              )}
            </Box>
          </Flex>
        </Center>
        <Divider borderColor={"gray.700"} orientation="vertical" />
        <Center w={"50%"}>
          <Flex direction={"column"} w={"95%"} h={"100%"}>
            <Center w={"100%"} mb={5}>
              <Heading
                as={"h5"}
                w={"25vw"}
                h={"7vh"}
                color={"gray.600"}
                rounded={"lg"}
                bg={"gray.300"}
              >
                <Center>Filters</Center>
              </Heading>
            </Center>
            <Grid
              w={"100%"}
              h={"4em"}
              mb={5}
              rounded={"lg"}
              bg={"gray.300"}
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(2, 1fr)"
            >
              <GridItem>
                <Center fontWeight={"bold"} color={"gray.600"} height={"100%"}>
                  Select your events from:
                </Center>
              </GridItem>
              <GridItem>
                <Center color={"gray.600"} height={"100%"}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      w={"15em"}
                    >
                      {timePeriod}
                    </MenuButton>
                    <MenuList
                      onClick={(e: any) => handleMenuChange(e.target.value)}
                    >
                      {renderMenuItems()}
                    </MenuList>
                  </Menu>
                </Center>
              </GridItem>
            </Grid>
            {timePeriod === CashFiltersMap.byYear && (
              <Grid
                w={"100%"}
                h={"4em"}
                mb={5}
                rounded={"lg"}
                bg={"gray.300"}
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(2, 1fr)"
              >
                <GridItem>
                  <Center
                    fontWeight={"bold"}
                    color={"gray.600"}
                    height={"100%"}
                  >
                    Select year:
                  </Center>
                </GridItem>
                <GridItem>
                  <Center color={"gray.700"} height={"100%"}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        w={"15em"}
                      >
                        {selectedYear}
                      </MenuButton>
                      <MenuList
                        onClick={(e: any) =>
                          handleYearsMenuChange(e.target.value)
                        }
                      >
                        {renderYearsMenuItems()}
                      </MenuList>
                    </Menu>
                  </Center>
                </GridItem>
              </Grid>
            )}
          </Flex>
        </Center>
      </Flex>
    </Center>
  );
};
