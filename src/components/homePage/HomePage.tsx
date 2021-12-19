import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { PageHeader } from "../common/PageHeader";
import { HomePageContent } from "./HomePageContent";

const HomePage = () => {
  return (
    <Box bg="gray.100" h="91vh">
      <Center>
        <Flex
          direction={"column"}
          w={"95vw"}
          rounded={"lg"}
          height={"100%"}
          pt={5}
          pb={5}
          mt={5}
          mb={5}
          align={"center"}
          bg={"gray.200"}
        >
          <PageHeader title={"Start"} />
          <HomePageContent />
          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};

export default HomePage;
