import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { PageHeader } from "../common/PageHeader";
import { CashEventsPageContent } from "./CashEventsPageContent";

const CashEventsPage = () => {
  return (
    <Box bg="gray.100" h="100%" minH={"91vh"}>
      <Center h={"100%"}>
        <Flex
          direction={"column"}
          w="80vw"
          rounded={"lg"}
          height={"100%"}
          pt={5}
          pb={5}
          mt={10}
          mb={10}
          align={"center"}
          bg={"gray.200"}
        >
          <PageHeader title={"Wydatki i przychody"} />
          <CashEventsPageContent />
          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};

export default CashEventsPage;
