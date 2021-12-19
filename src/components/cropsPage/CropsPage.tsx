import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import CropsPageContent from "./CropsPageContent";
import { PageHeader } from "../common/PageHeader";

const CropsPage = () => {
  return (
    <Box bg="gray.100" h="100%">
      <Center h={"100%"}>
        <Flex
          direction={"column"}
          w="90vw"
          rounded={"lg"}
          height={"100%"}
          pt={5}
          pb={5}
          mt={10}
          mb={10}
          align={"center"}
          bg={"gray.200"}
        >
          <PageHeader title={"Uprawy"} />
          <CropsPageContent />
          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};

export default CropsPage;
