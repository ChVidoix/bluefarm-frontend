import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { PageHeader } from "../common/PageHeader";

const EventsPage = () => {
  return (
    <Box bg="gray.100" h="100%">
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
          <PageHeader title={"Events"} />

          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};

export default EventsPage;
