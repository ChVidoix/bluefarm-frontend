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

  const tableBodyContent = crops?.map((crop: CropModel, index: number) => (
    <Tr key={index}>
      <Td isNumeric>{index + 1}</Td>
      <Td>{crop.type}</Td>
      <Td isNumeric>{crop.area}</Td>
      <Td>{crop.description}</Td>
      <Td />
    </Tr>
  ));

  return (
    <Center rounded="lg" bg="gray.300" w={"100%"}>
      <Table variant="striped" colorScheme="teal" a>
        <TableCaption>Crops</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric w={"20%"}>
              Crop number
            </Th>
            <Th w={"25%"}>Variety</Th>
            <Th isNumeric w={"25%"}>
              Area
            </Th>
            <Th w={"30%"}>Description</Th>
            <Th />
          </Tr>
        </Thead>

        {isLoading || crops === null ? (
          <Center>
            <Spinner
              thickness="4px"
              emptyColor="teal.50"
              color="teal.500"
              size="xl"
            />
          </Center>
        ) : (
          <Tbody>
            <>{tableBodyContent}</>
          </Tbody>
        )}
      </Table>
    </Center>
  );
};

export default CropsTable;
