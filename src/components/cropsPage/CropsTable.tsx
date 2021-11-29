import {
  Center,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getCrops } from "../../service/BlueFarmService";
import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CropModel } from "../../service/BlueFarm.service.const";
import { AddCropDrawer } from "./AddCropDrawer";
import { CropOptions } from "./CropOptions";
import { ShowCropDescription } from "./ShowCropDescription";

const CropsTable = () => {
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
      return <ShowCropDescription description={cropDescription} />;
    }
    return <>{cropDescription}</>;
  };

  const tableBodyContent = crops?.map((crop: CropModel, index: number) => (
    <Tr key={index}>
      <Td isNumeric>{index + 1}</Td>
      <Td>{crop.name}</Td>
      <Td>{crop.type}</Td>
      <Td isNumeric>{crop.area}</Td>
      <Td>{cropDescriptionRowContent(crop.description)}</Td>
      <Td>
        <CropOptions crops={crops} setCrops={setCrops} crop={crop} />
      </Td>
    </Tr>
  ));

  return (
    <Center rounded="lg" bg="gray.300" w={"80%"}>
      <Table variant="striped">
        <TableCaption>{tableCaption()}</TableCaption>
        <Thead borderBottom={"2px"}>
          <Tr>
            <Th isNumeric>Number</Th>
            <Th>Name</Th>
            <Th>Variety</Th>
            <Th isNumeric>Area</Th>
            <Th>Description</Th>
            <Th />
          </Tr>
        </Thead>

        <Tbody>
          <>{tableBodyContent}</>
        </Tbody>
      </Table>
    </Center>
  );
};

export default CropsTable;
