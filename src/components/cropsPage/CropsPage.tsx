import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import CropsTable from "./CropsTable";
import CropsStats from "./CropsStats";
import { PageHeader } from "../common/PageHeader";

const CropsPage = () => {
  return (
    <Box bg="gray.100" h="91vh">
      <Center h={"100%"}>
        <Flex
          direction={"column"}
          w="80vw"
          rounded={"lg"}
          height={"100%"}
          pt={3}
          mt={10}
          align={"center"}
          bg={"gray.200"}
        >
          <PageHeader title={"Crops"} />
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
