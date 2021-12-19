import {
  Center,
  Heading,
  Spacer,
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
import { countCropsTypeArea, getCrops } from "../../service/BlueFarmService";
import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CropModel } from "../../service/BlueFarm.service.const";
import { AddCropDrawer } from "./AddCropDrawer";
import { CropOptions } from "./CropOptions";
import CropsStats from "./CropsStats";

const CropsPageContent = () => {
  const {
    state: {
      auth: { token },
      appState: { isLoading },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [crops, setCrops] = useState<Array<CropModel> | null>(null);

  useEffect(() => {
    getCrops(token).then((cropsResponse: Array<CropModel>) => {
      setCrops(cropsResponse);
    });
  }, [token]);

  const tableCaption = (): JSX.Element => {
    if (isLoading || crops === null) {
      return (
        <Center>
          <Spinner
            thickness="4px"
            emptyColor="teal.50"
            color="teal.500"
            size="xl"
          />
        </Center>
      );
    }
    return <AddCropDrawer crops={crops} setCrops={setCrops} />;
  };

  const cropDescriptionRowContent = (cropDescription: string): JSX.Element => {
    if (cropDescription.length > 15) {
      return (
        <Tooltip label={cropDescription}>{`${cropDescription.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{cropDescription}</>;
  };

  const tableBodyContent = crops?.map((crop: CropModel, index: number) => (
    <Tr key={index}>
      <Td isNumeric>{index + 1}</Td>
      <Td>{crop.name}</Td>
      <Td>{crop.type}</Td>
      <Td>{crop.variety}</Td>
      <Td isNumeric>{crop.area}</Td>
      <Td>{cropDescriptionRowContent(crop.description)}</Td>
      <Td>
        <CropOptions crops={crops} setCrops={setCrops} crop={crop} />
      </Td>
    </Tr>
  ));

  return (
    <>
      <Spacer />
      <CropsStats varietyAreaData={countCropsTypeArea(crops)} />
      <Spacer />
      <Center rounded={"lg"} bg={"gray.300"} w={"30vw"} h={"7vh"} mt={10}>
        <Heading as={"h5"} color={"gray.600"}>
          Wszystkie uprawy
        </Heading>
      </Center>
      <Center rounded={"lg"} bg={"gray.300"} w={"80%"} mt={5}>
        <Table variant="striped">
          <TableCaption>{tableCaption()}</TableCaption>
          <Thead borderBottom={"2px"}>
            <Tr>
              <Th isNumeric>Lp.</Th>
              <Th>Nazwa</Th>
              <Th>Rodzaj</Th>
              <Th>Odmiana</Th>
              <Th isNumeric>Powierzchnia</Th>
              <Th>Opis</Th>
              <Th />
            </Tr>
          </Thead>

          <Tbody>
            <>{tableBodyContent}</>
          </Tbody>
        </Table>
      </Center>
    </>
  );
};

export default CropsPageContent;
