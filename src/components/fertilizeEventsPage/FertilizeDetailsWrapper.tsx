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
  Spinner,
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

export const FertilizeDetailsWrapper = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
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

  const renderUpcomingEventGrid = (): JSX.Element => {
    if (isLoading) {
      return (
        <Center h={"100%"} w={"100%"}>
          <Spinner
            thickness="4px"
            emptyColor="teal.50"
            color="teal.500"
            size="xl"
          />
        </Center>
      );
    } else if (nearestEvent) {
      return (
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
              Nazwa:
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
              Rodzaj:
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
              Data:
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
              Ilość:
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
              Opis:
            </Center>
          </GridItem>
          <GridItem colSpan={3}>
            <Center h={"100%"}>{nearestEvent.description}</Center>
          </GridItem>
        </Grid>
      );
    } else {
      return (
        <Center h={"100%"} w={"100%"} fontWeight={"bold"} color={"gray.600"}>
          Nie masz żadnych wydarzeń dotyczących nawożenia.
        </Center>
      );
    }
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
                <Center h={"100%"} w={"100%"}>
                  Nadchodzące
                </Center>
              </Heading>
            </Center>
            <Box h={"100%"} w={"100%"}>
              {renderUpcomingEventGrid()}
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
                <Center h={"100%"} w={"100%"}>
                  Filtry
                </Center>
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
                  Wybierz nawożenia:
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
                    Wybierz rok:
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
