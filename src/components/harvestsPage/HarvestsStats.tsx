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
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
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
  formatHarvestsDuration,
  getHarvestsDuration,
  getHarvestsYears,
  getMostFruitfulHarvest,
} from "../../service/BlueFarmService";
import { CropModel, HarvestModel } from "../../service/BlueFarm.service.const";

export const HarvestsStats = ({
  isLoading,
  crops,
}: {
  isLoading: boolean;
  crops: Array<CropModel> | null;
}) => {
  const {
    state: {
      crops: {
        selectedCrop: selectedCropId,
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
  const selectedCrop = crops
    ? crops.find((crop: CropModel) => crop.id === selectedCropId)
    : undefined;
  const totalHarvested = filteredHarvestsEvents?.reduce(
    (acc: number, curr: HarvestModel) => acc + curr.crop_amount,
    0
  );
  const harvestsDuration = formatHarvestsDuration(
    getHarvestsDuration(filteredHarvestsEvents)
  );
  const mostFruitfulHarvest = getMostFruitfulHarvest(filteredHarvestsEvents);

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

  const renderTitleGridItem = (text: string): JSX.Element => (
    <GridItem bg={"gray.300"} rounded={"lg"} padding={3}>
      <Center w={"100%"} h={"100%"} fontWeight={"bold"} color={"gray.600"}>
        {text}
      </Center>
    </GridItem>
  );

  const renderContendGridItem = (text: string | JSX.Element): JSX.Element => (
    <GridItem>
      <Center w={"100%"} h={"100%"}>
        {text}
      </Center>
    </GridItem>
  );

  const renderCropDescription = (description?: string): JSX.Element => {
    if (description && description.length > 15) {
      return (
        <Tooltip label={description}>{`${description.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{description}</>;
  };

  return (
    <Center>
      <Flex direction={"column"} w={"95%"} mt={5}>
        <Flex>
          <Flex direction={"column"} h={"100%"} w={"47%"} mb={7}>
            <Center w={"100%"} h={"100%"}>
              <Box h={"2.5em"} w={"15vw"} bg={"gray.300"} rounded={"lg"}>
                <Center h={"100%"} color={"gray.600"} fontWeight={"bold"}>
                  Dane uprawy:
                </Center>
              </Box>
            </Center>
            <Center w={"100%"} minH={"40vh"}>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={6}
              >
                {renderTitleGridItem("Nazwa:")}
                {renderContendGridItem(
                  String(!isLoading && selectedCrop?.name)
                )}
                <GridItem />
                <GridItem />
                {renderTitleGridItem("Rodzaj:")}
                {renderContendGridItem(
                  String(!isLoading && selectedCrop?.type)
                )}
                {renderTitleGridItem("Odmiana:")}
                {renderContendGridItem(
                  String(!isLoading && selectedCrop?.variety)
                )}
                {renderTitleGridItem("Powierzchnia:")}
                {renderContendGridItem(
                  <>
                    {String(!isLoading && selectedCrop?.area)} m<sup>2</sup>
                  </>
                )}
                {renderTitleGridItem("Opis:")}
                {renderContendGridItem(
                  renderCropDescription(selectedCrop?.description)
                )}
              </Grid>
            </Center>
          </Flex>
          <Divider
            borderColor={"gray.800"}
            w={"10px"}
            h={"50vh"}
            orientation="vertical"
          />
          <Flex direction={"column"} h={"100%"} w={"47%"} mb={7}>
            <Center w={"100%"} h={"100%"}>
              <Box h={"2.5em"} w={"15vw"} bg={"gray.300"} rounded={"lg"}>
                <Center h={"100%"} color={"gray.600"} fontWeight={"bold"}>
                  Szczegóły:
                </Center>
              </Box>
            </Center>
            <Center w={"100%"} minH={"40vh"}>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={6}
              >
                {renderTitleGridItem("Rok:")}
                {renderContendGridItem(String(!isLoading && selectedYear))}
                <GridItem />
                <GridItem />
                {renderTitleGridItem("Zebrano łącznie:")}
                {renderContendGridItem(
                  String(!isLoading && `${totalHarvested} kg`)
                )}
                {renderTitleGridItem("Czas zbioru:")}
                {renderContendGridItem(String(!isLoading && harvestsDuration))}
                {renderTitleGridItem("Najbardziej plenny:")}
                {renderContendGridItem(
                  String(!isLoading && mostFruitfulHarvest.name)
                )}
                {renderTitleGridItem("Zebrano:")}
                {renderContendGridItem(
                  String(!isLoading && mostFruitfulHarvest.crop_amount)
                )}
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
