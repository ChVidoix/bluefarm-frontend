import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  setFilteredHarvests,
  setHarvestsFilters,
} from "../../actions/BlueFarmActions";
import {
  filterHarvests,
  findMostFruitfulVariety,
  getHarvestsChartData,
  getHarvestsDuration,
  getHarvestsYears,
} from "../../service/BlueFarmService";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { HarvestModel } from "../../service/BlueFarm.service.const";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HarvestsStats = ({ isLoading }: { isLoading: boolean }) => {
  const {
    state: {
      crops: {
        harvests: {
          harvestsEvents,
          filteredHarvestsEvents,
          filters: { startTimestamp, endTimestamp },
        },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const yearsList = getHarvestsYears(harvestsEvents);
  const chartData = getHarvestsChartData(filteredHarvestsEvents);
  const maxVarietyCropAmount = Math.max(...Object.values(chartData));
  const totalHarvested = filteredHarvestsEvents?.reduce(
    (acc: number, curr: HarvestModel) => acc + curr.crop_amount,
    0
  );
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Harvests",
        data: Object.values(chartData),
        backgroundColor: Object.values(chartData).map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
        ),
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    dispatch(
      setFilteredHarvests(
        filterHarvests({
          events: harvestsEvents,
          startTimestamp,
          endTimestamp,
        })
      )
    );
  }, [startTimestamp, endTimestamp]);

  const handleYearsMenuChange = (year: string) => {
    const startDate = +new Date(`${year}-01-01`);
    dispatch(
      setHarvestsFilters(startDate, startDate + 365 * 24 * 60 * 60 * 1000)
    );
    setSelectedYear(+year);
  };

  const renderYearsMenuItems = () => {
    return yearsList.map((key: string) => (
      <MenuItem key={key} value={key}>
        {key}
      </MenuItem>
    ));
  };

  return (
    <Center>
      <Flex direction={"column"} w={"95%"} mt={5}>
        <Flex>
          <Flex direction={"column"} h={"100%"} w={"47%"} mb={7}>
            <Center w={"100%"}>
              <Center
                w={"30vw"}
                h={"7vh"}
                rounded={"lg"}
                bg={"gray.300"}
                mb={5}
              >
                <Heading as={"h5"} color={"gray.600"}>
                  By varieties:
                </Heading>
              </Center>
            </Center>
            <Center mt={3}>
              <Box w={"80%"}>
                <Doughnut data={data} />
              </Box>
            </Center>
          </Flex>
          <Flex direction={"column"} h={"100%"} w={"47%"} mb={7}>
            <Center w={"100%"}>
              <Center
                w={"30vw"}
                h={"7vh"}
                rounded={"lg"}
                bg={"gray.300"}
                mb={5}
              >
                <Heading as={"h5"} color={"gray.600"}>
                  Details:
                </Heading>
              </Center>
            </Center>
            <Center w={"100%"} minH={"70vh"}>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={6}
              >
                <GridItem bg={"gray.300"} rounded={"lg"} padding={3}>
                  <Center
                    w={"100%"}
                    h={"100%"}
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Year:
                  </Center>
                </GridItem>
                <GridItem>
                  <Center w={"100%"} h={"100%"}>
                    {!isLoading && selectedYear}
                  </Center>
                </GridItem>
                <GridItem />
                <GridItem />
                <GridItem bg={"gray.300"} rounded={"lg"} padding={3}>
                  <Center
                    w={"100%"}
                    h={"100%"}
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Total harvested:
                  </Center>
                </GridItem>
                <GridItem>
                  <Center w={"100%"} h={"100%"}>
                    {!isLoading && `${totalHarvested} kg`}
                  </Center>
                </GridItem>
                <GridItem bg={"gray.300"} rounded={"lg"}>
                  <Center
                    w={"100%"}
                    h={"100%"}
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Duration:
                  </Center>
                </GridItem>
                <GridItem>
                  <Center w={"100%"} h={"100%"}>
                    {!isLoading && getHarvestsDuration(filteredHarvestsEvents)}
                  </Center>
                </GridItem>
                <GridItem bg={"gray.300"} rounded={"lg"} padding={3}>
                  <Center
                    w={"100%"}
                    h={"100%"}
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Most fruitful:
                  </Center>
                </GridItem>
                <GridItem>
                  <Center w={"100%"} h={"100%"}>
                    {!isLoading && findMostFruitfulVariety(chartData)}
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
                    {!isLoading && `${maxVarietyCropAmount} kg`}
                  </Center>
                </GridItem>
              </Grid>
            </Center>
          </Flex>
        </Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"15em"}>
            {selectedYear}
          </MenuButton>
          <MenuList onClick={(e: any) => handleYearsMenuChange(e.target.value)}>
            {renderYearsMenuItems()}
          </MenuList>
        </Menu>
      </Flex>
    </Center>
  );
};
