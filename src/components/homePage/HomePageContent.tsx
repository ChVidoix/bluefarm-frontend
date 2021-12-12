import React, { useContext, useEffect, useState } from "react";
import {
  EventModel,
  FertilizeEventModel,
  HarvestModel,
} from "../../service/BlueFarm.service.const";
import {
  formatDate,
  getAllFertilizeEvents,
  getAllHarvests,
  getEvents,
  getSortedAllUpcomingEvents,
  getThisWeekEventsCount,
  sortEvents,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { eventType, homeEventsCount } from "../common/components.const";

export const HomePageContent = () => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [harvests, setHarvests] = useState<Array<HarvestModel>>([]);
  const [events, setEvents] = useState<Array<EventModel>>([]);
  const [fertilizeEvents, setFertilizeEvents] = useState<
    Array<FertilizeEventModel>
  >([]);
  const [selectedEventsType, setSelectedEventsType] = useState(eventType.all);
  const [eventsNumToShow, setEventsNumToShow] = useState(5);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const sortedEvents = {
    [eventType.all]: getSortedAllUpcomingEvents(
      events,
      fertilizeEvents,
      harvests
    ),
    [eventType.events]: sortEvents(events),
    [eventType.harvests]: sortEvents(harvests),
    [eventType.fertilizeEvents]: sortEvents(fertilizeEvents),
  };

  const weekSelectedEventsCount = getThisWeekEventsCount(
    sortedEvents[selectedEventsType]
  );

  useEffect(() => {
    setIsTableLoading(true);
    getAllFertilizeEvents(token).then((res: Array<FertilizeEventModel>) => {
      setFertilizeEvents(res);
    });
    getAllHarvests(token).then((res: Array<HarvestModel>) => {
      setHarvests(res);
    });
    getEvents(token).then((res: Array<EventModel>) => {
      setEvents(res);
      setIsTableLoading(false);
    });
  }, []);

  const descriptionRowContent = (description: string): JSX.Element => {
    if (description.length > 15) {
      return (
        <Tooltip label={description}>{`${description.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{description}</>;
  };

  const renderTableCaption = () => {
    return isTableLoading ? (
      <Center>
        <Spinner
          thickness="4px"
          emptyColor="teal.50"
          color="teal.500"
          size="xl"
        />
      </Center>
    ) : (
      <>Upcoming</>
    );
  };

  const renderTableBody = (eventsToRender: Array<any>) =>
    eventsToRender.map((event: any, index: number) => (
      <Tr key={index}>
        <Td isNumeric>{index + 1}</Td>
        <Td>{event.name}</Td>
        <Td>{formatDate(event.date || event.start_date)}</Td>
        <Td>{event.event_type}</Td>
        <Td>{descriptionRowContent(event.description || event.notes)}</Td>
      </Tr>
    ));

  const renderEventTypeMenuList = () => {
    return Object.keys(eventType).map((type: string) => (
      <MenuItem
        key={type}
        onClick={() => setSelectedEventsType(eventType[type])}
      >
        {eventType[type]}
      </MenuItem>
    ));
  };

  const renderEventsNumMenuList = () => {
    return homeEventsCount.map((number: number) => (
      <MenuItem key={number} onClick={() => setEventsNumToShow(number)}>
        {`First ${number}`}
      </MenuItem>
    ));
  };

  const renderGridItem = (
    value: string,
    colSpan = 1,
    isLabel = true
  ): JSX.Element => {
    const color = isLabel ? "gray.300" : "";
    return (
      <GridItem colSpan={colSpan}>
        <Center w={"100%"} h={"100%"}>
          <Box h={"2.5em"} w={"15vw"} bg={color} rounded={"lg"}>
            <Center h={"100%"} color={"gray.700"} fontWeight={"bold"}>
              {value}
            </Center>
          </Box>
        </Center>
      </GridItem>
    );
  };

  return (
    <Flex w={"100%"} h={"100%"} mt={5} direction={"column"}>
      <Flex>
        <Center w={"100%"}>
          <Grid
            w={"95%"}
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            {renderGridItem("This week", 2)}
            {renderGridItem("Number of events:")}
            {renderGridItem(String(weekSelectedEventsCount), 1, false)}
            {renderGridItem("First upcoming:")}
            {renderGridItem(
              String(
                !isTableLoading && sortedEvents[selectedEventsType][0]
                  ? `${sortedEvents[selectedEventsType][0].event_type}, 
                  ${sortedEvents[selectedEventsType][0].name}`
                  : ""
              ),
              1,
              false
            )}
          </Grid>
        </Center>
        <Center w={"100%"}>
          <Box w={"95%"}>
            <Grid
              h="200px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              {renderGridItem("Type:")}
              <GridItem>
                <Center w={"100%"} h={"100%"}>
                  <Menu>
                    <MenuButton h={"2.5em"} w={"15vw"} as={Button}>
                      {selectedEventsType}
                    </MenuButton>
                    <MenuList>{renderEventTypeMenuList()}</MenuList>
                  </Menu>
                </Center>
              </GridItem>
              {renderGridItem("Number of events:")}
              <GridItem>
                <Center w={"100%"} h={"100%"}>
                  <Menu>
                    <MenuButton
                      h={"2.5em"}
                      w={"15vw"}
                      as={Button}
                    >{`First ${eventsNumToShow}`}</MenuButton>
                    <MenuList>{renderEventsNumMenuList()}</MenuList>
                  </Menu>
                </Center>
              </GridItem>
            </Grid>
          </Box>
        </Center>
      </Flex>
      <Center w={"100%"} mt={10} mb={2}>
        <Box bg={"gray.300"} rounded={"lg"} w={"95%"}>
          <Table variant="striped">
            <TableCaption>{renderTableCaption()}</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>No.</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isTableLoading &&
                renderTableBody(
                  sortedEvents[selectedEventsType].slice(0, eventsNumToShow)
                )}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </Flex>
  );
};
