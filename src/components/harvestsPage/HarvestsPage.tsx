import {
  Box,
  Button,
  Center,
  Flex,
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
import { useContext, useEffect, useState } from "react";
import { CropModel, HarvestModel } from "../../service/BlueFarm.service.const";
import {
  filterHarvests,
  formatDate,
  getCrops,
  getHarvests,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { PageHeader } from "../common/PageHeader";
import {
  setFilteredHarvests,
  setHarvests,
  setSelectedCrop,
} from "../../actions/BlueFarmActions";
import { AddHarvestDrawer } from "./AddHarvestDrawer";
import { HarvestOptions } from "./HarvestOptions";
import { HarvestsStats } from "./HarvestsStats";

export const HarvestsPage = () => {
  const [crops, setCrops] = useState<Array<CropModel> | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const {
    state: {
      auth: { token },
      crops: {
        selectedCrop,
        harvests: { filteredHarvestsEvents },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  useEffect(() => {
    setIsTableLoading(true);
    getCrops(token).then((cropsResponse: Array<CropModel>) => {
      setCrops(cropsResponse);
      dispatch(setSelectedCrop(cropsResponse[0].id));
    });
  }, [token]);

  useEffect(() => {
    if (selectedCrop !== 0) {
      getHarvests(token, selectedCrop).then(
        (harvestsArray: Array<HarvestModel>) => {
          dispatch(setHarvests(harvestsArray));
          dispatch(
            setFilteredHarvests(
              filterHarvests({
                events: harvestsArray,
                startTimestamp: +new Date(`${new Date().getFullYear()}-01-01`),
                endTimestamp: +new Date(`${new Date().getFullYear()}-12-31`),
              })
            )
          );
          setIsTableLoading(false);
        }
      );
    }
  }, [selectedCrop]);

  const renderCropsMenuItems = (): JSX.Element => {
    return (
      <>
        {crops?.map((crop: CropModel) => (
          <MenuItem key={crop.id} value={crop.id}>
            {crop.name}
          </MenuItem>
        ))}
      </>
    );
  };

  const handleCropsMenuList = (value: string) => {
    setIsTableLoading(true);
    const cropId =
      crops?.find((crop: CropModel) => crop.id === +value)?.id || 0;
    dispatch(setSelectedCrop(cropId));
  };

  const harvestNotesRowContent = (
    harvestName: string,
    harvestNotes: string
  ): JSX.Element => {
    if (harvestNotes.length > 15) {
      return (
        <Tooltip label={harvestNotes}>{`${harvestNotes.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{harvestNotes}</>;
  };

  const renderTableCaption = isTableLoading ? (
    <Center>
      <Spinner
        thickness="4px"
        emptyColor="teal.50"
        color="teal.500"
        size="xl"
      />
    </Center>
  ) : (
    <AddHarvestDrawer />
  );

  const renderTableBody = () =>
    filteredHarvestsEvents?.map((harvest: HarvestModel, index: number) => (
      <Tr key={index}>
        <Td isNumeric>{index + 1}</Td>
        <Td>{harvest.name}</Td>
        <Td>{formatDate(harvest.start_date)}</Td>
        <Td>{formatDate(harvest.end_date)}</Td>
        <Td isNumeric>{harvest.crop_amount}</Td>
        <Td>{harvestNotesRowContent(harvest.name, harvest.notes)}</Td>
        <Td>
          <HarvestOptions eventId={harvest.id} />
        </Td>
      </Tr>
    ));

  return (
    <Center>
      <Box w={"95%"} bg={"gray.200"} rounded={"lg"} mt={2} minH={"90vh"} mb={2}>
        <Flex direction={"column"}>
          <Center w={"100%"}>
            <Flex mt={2} w={"90%"}>
              <Center w={"15%"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    w={"15em"}
                  >
                    {crops?.find((crop: CropModel) => crop.id === selectedCrop)
                      ?.name || <Spinner />}
                  </MenuButton>
                  <MenuList
                    bg={"gray.200"}
                    _hover={{ bg: "gray.300" }}
                    onClick={(e: any) => handleCropsMenuList(e.target.value)}
                  >
                    {renderCropsMenuItems()}
                  </MenuList>
                </Menu>
              </Center>
              <Box w={"70%"}>
                <Center>
                  <PageHeader title={"Harvests"} />
                </Center>
              </Box>
            </Flex>
          </Center>
          <HarvestsStats isLoading={isTableLoading} crops={crops} />
          <Center w={"100%"} mt={5} mb={2}>
            <Box bg={"gray.300"} rounded={"lg"} w={"95%"}>
              <Table variant="striped">
                <TableCaption>{renderTableCaption}</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>No.</Th>
                    <Th>Name</Th>
                    <Th>Start date</Th>
                    <Th>End date</Th>
                    <Th isNumeric>Amount [kg]</Th>
                    <Th>Notes</Th>
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>{!isTableLoading && renderTableBody()}</Tbody>
              </Table>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Center>
  );
};
