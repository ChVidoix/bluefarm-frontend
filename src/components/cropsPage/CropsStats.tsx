import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CropsStats = ({
  varietyAreaData,
}: {
  varietyAreaData: { [key: string]: number } | undefined;
}) => {
  const labels = Object.keys(varietyAreaData || []);
  const values = Object.values(varietyAreaData || []);
  const totalArea = values.reduce((acc, curr) => acc + curr, 0);

  const detailsTableRows = (): JSX.Element => {
    return varietyAreaData ? (
      <>
        {labels.map((label: string) => (
          <Tr key={label}>
            <Td>{label}</Td>
            <Td isNumeric>{varietyAreaData[label]}</Td>
          </Tr>
        ))}
      </>
    ) : (
      <></>
    );
  };

  const tableSummaryContent = (): JSX.Element => {
    return varietyAreaData ? <>Summary of area by variety</> : <Spinner />;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Area taken by variety",
        data: values,
        backgroundColor: values.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
        ),
        borderWidth: 0,
      },
    ],
  };

  return (
    <Flex w={"80%"} mt={10} mb={10}>
      <Box w={"50%"}>
        <Doughnut data={data} />
      </Box>

      <Box w={"50%"} pl={5}>
        <Flex direction={"column"} h={"100%"}>
          <Center w={"30vw"} h={"7vh"} rounded={"lg"} bg={"gray.300"} mb={5}>
            <Heading as={"h5"} color={"gray.600"}>
              Details:
            </Heading>
          </Center>
          <Spacer />
          <Box bg={"gray.300"} rounded={"lg"}>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>{tableSummaryContent()}</TableCaption>
              <Thead borderBottom={"2px"}>
                <Tr>
                  <Th>Variety</Th>
                  <Th isNumeric>Area</Th>
                </Tr>
              </Thead>
              <Tbody>{detailsTableRows()}</Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th isNumeric>{totalArea}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
          <Spacer />
        </Flex>
      </Box>
    </Flex>
  );
};

export default CropsStats;
