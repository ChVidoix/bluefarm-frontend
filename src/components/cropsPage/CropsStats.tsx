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
import React from "react";

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
    return varietyAreaData ? (
      <>Podsumowanie upraw: rodzaj a powierzchnia</>
    ) : (
      <Spinner />
    );
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
        <Flex direction={"column"} h={"100%"}>
          <Center w={"100%"} h={"7vh"}>
            <Box h={"2.5em"} w={"15vw"} bg={"gray.300"} rounded={"lg"}>
              <Center h={"100%"} color={"gray.600"} fontWeight={"bold"}>
                Rodzaje:
              </Center>
            </Box>
          </Center>
          <Center mt={3}>
            <Box>
              <Doughnut data={data} />
            </Box>
          </Center>
        </Flex>
      </Box>

      <Box w={"50%"} pl={5}>
        <Flex direction={"column"} h={"100%"}>
          <Center w={"100%"} h={"7vh"}>
            <Box h={"2.5em"} w={"15vw"} bg={"gray.300"} rounded={"lg"}>
              <Center h={"100%"} color={"gray.600"} fontWeight={"bold"}>
                Szczegóły:
              </Center>
            </Box>
          </Center>
          <Spacer />
          <Box bg={"gray.300"} rounded={"lg"}>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>{tableSummaryContent()}</TableCaption>
              <Thead borderBottom={"2px"}>
                <Tr>
                  <Th>Rodzaj</Th>
                  <Th isNumeric>
                    Powierzchnia [m<sup>2</sup>]
                  </Th>
                </Tr>
              </Thead>
              <Tbody>{detailsTableRows()}</Tbody>
              <Tfoot>
                <Tr>
                  <Th>Suma</Th>
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
