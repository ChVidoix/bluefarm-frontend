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
import {
  CropModel,
  FertilizeEventModel,
} from "../../service/BlueFarm.service.const";
import {
  formatDate,
  getCrops,
  getFertilizationEvents,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { PageHeader } from "../common/PageHeader";
import {
  setFertilizeEvents,
  setSelectedCrop,
} from "../../actions/BlueFarmActions";
import { AddFertilizationEventDrawer } from "./AddFertilizationEventDrawer";
import { FertilizeEventOptions } from "./FertilizeEventOptions";
import { FertilizeDetailsWrapper } from "./FertilizeDetailsWrapper";

export const FertilizeEventsPage = () => {
  const [crops, setCrops] = useState<Array<CropModel> | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const {
    state: {
      auth: { token },
      crops: {
        selectedCrop,
        fertilization: { filteredFertilizeEvents },
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
      getFertilizationEvents(token, selectedCrop).then(
        (fertilizationArray: Array<FertilizeEventModel>) => {
          dispatch(setFertilizeEvents(fertilizationArray));
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

  const eventDescriptionRowContent = (
    eventName: string,
    eventDescription: string
  ): JSX.Element => {
    if (eventDescription.length > 15) {
      return (
        <Tooltip label={eventDescription}>{`${eventDescription.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{eventDescription}</>;
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
    <AddFertilizationEventDrawer />
  );

  const renderTableBody = () =>
    filteredFertilizeEvents?.map(
      (event: FertilizeEventModel, index: number) => (
        <Tr key={index}>
          <Td isNumeric>{index + 1}</Td>
          <Td>{event.name}</Td>
          <Td>{formatDate(event.date)}</Td>
          <Td>{event.type}</Td>
          <Td isNumeric>{event.amount}</Td>
          <Td>{eventDescriptionRowContent(event.name, event.description)}</Td>
          <Td>
            <FertilizeEventOptions eventId={event.id} />
          </Td>
        </Tr>
      )
    );

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
                  <PageHeader title={"Fertilization"} />
                </Center>
              </Box>
            </Flex>
          </Center>
          <FertilizeDetailsWrapper isLoading={isTableLoading} />
          <Center w={"100%"} mt={10} mb={2}>
            <Box bg={"gray.300"} rounded={"lg"} w={"95%"}>
              <Table variant="striped">
                <TableCaption>{renderTableCaption}</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>Lp.</Th>
                    <Th>Nazwa</Th>
                    <Th>Data</Th>
                    <Th>Rodzaj</Th>
                    <Th isNumeric>Ilość [kg]</Th>
                    <Th>Opis</Th>
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
