import { Box, Center, Flex, Grid, Spacer } from "@chakra-ui/react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import React, { ChangeEvent, useContext, useEffect } from "react";
import { AddWeatherEventDrawer } from "./AddWeatherEventDrawer";
import { WeatherEventModel } from "../../service/BlueFarm.service.const";
import { WeatherTile } from "./WeatherTile";
import {
  filterWeatherEvents,
  getWeatherEvents,
  getWeatherEventsToRender,
} from "../../service/BlueFarmService";
import {
  setFilteredWeatherEvents,
  setWeatherEvents,
  setWeatherEventsFilters,
} from "../../actions/BlueFarmActions";
import { format } from "date-fns";
import "../../styles/styles.css";

export const WeatherPageContent = () => {
  const {
    state: {
      auth: { token },
      weather: {
        weatherEvents,
        filteredWeatherEvents,
        filters: { startTimestamp },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  useEffect(() => {
    getWeatherEvents(token).then((res: Array<WeatherEventModel>) => {
      dispatch(setWeatherEvents(res));
    });
  }, []);

  useEffect(() => {
    dispatch(
      setFilteredWeatherEvents(
        filterWeatherEvents(weatherEvents, startTimestamp)
      )
    );
  }, [startTimestamp, weatherEvents]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setWeatherEventsFilters(+new Date(event.target.value)));
  };

  const renderWeatherTiles = (): Array<JSX.Element> | undefined => {
    const weatherEventsToRender = getWeatherEventsToRender(
      filteredWeatherEvents,
      startTimestamp
    );
    return weatherEventsToRender.map(
      (eventOrDate: WeatherEventModel | string, index: number) => (
        <WeatherTile key={index} weatherEventOrDate={eventOrDate} />
      )
    );
  };

  return (
    <Flex direction={"column"} w={"100%"} h={"100%"}>
      <Center>
        <Flex w={"70%"}>
          <Box w={"40%"} h={"3em"} rounded={"lg"} bg={"gray.400"} mt={7} mb={7}>
            <Center
              h={"100%"}
              w={"100%"}
              fontWeight={"bold"}
              color={"gray.700"}
            >
              Select a week starting from:
            </Center>
          </Box>
          <Spacer />
          <Center
            w={"40%"}
            h={"3em"}
            mt={7}
            mb={7}
            rounded={"lg"}
            bg={"gray.400"}
          >
            <input
              type="date"
              className={"date"}
              value={format(startTimestamp, "yyyy-MM-dd")}
              onChange={handleDateChange}
            />
          </Center>
        </Flex>
      </Center>
      <Center mb={5}>
        <AddWeatherEventDrawer />
      </Center>
      <Center w={"100%"}>
        <Grid templateColumns="repeat(7, 1fr)" w={"98%"} gap={2} mb={3}>
          {renderWeatherTiles()}
        </Grid>
      </Center>
    </Flex>
  );
};
