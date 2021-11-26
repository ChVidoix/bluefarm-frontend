import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import CropsTable from "./CropsTable";
import CropsStats from "./CropsStats";

const CropsPage = () => {
  return (
    <Box bg="gray.100" h="91vh">
      <Center h={"100%"}>
        <Flex direction={"column"} w="80vw" height={"100%"} pt={10}>
          <Center bg={"teal.400"} rounded={"lg"} w={"30vw"} h={"9vh"}>
            <Heading color={"white"}>Crops</Heading>
          </Center>
          <Spacer />
          <CropsStats />
          <Spacer />
          <CropsTable />
          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};

export default CropsPage;
