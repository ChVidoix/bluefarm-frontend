import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CropModel, HarvestModel } from "../../service/BlueFarm.service.const";
import { getCrops, getHarvests } from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { PageHeader } from "../common/PageHeader";
import { setHarvests, setSelectedCrop } from "../../actions/BlueFarmActions";

export const HarvestsPage = () => {
  const [crops, setCrops] = useState<Array<CropModel> | null>(null);

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
    const crop = crops?.find((crop: CropModel) => crop.id === +value) || null;
    setSelectedCrop(crop?.id || 0);
  };

  return (
    <Center>
      <Box w={"95%"} bg={"gray.200"} rounded={"lg"} mt={2} minH={"90vh"}>
        <Flex direction={"column"}>
          <Flex mt={2}>
            <Center>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w={"15em"}
                  ml={5}
                >
                  {crops?.find((crop: CropModel) => crop.id == selectedCrop)
                    ?.name || ""}
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
            <Box w={"70vw"}>
              <Center>
                <PageHeader title={"Harvests"} />
              </Center>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
};
