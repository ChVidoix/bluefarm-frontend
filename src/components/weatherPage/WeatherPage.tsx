import { Box, Center, Flex } from "@chakra-ui/react";
import { PageHeader } from "../common/PageHeader";
import { WeatherPageContent } from "./WeatherPageContent";

const WeatherPage = () => {
  return (
    <Box bg="gray.100" h="91vh">
      <Center>
        <Box
          w={"95%"}
          bg={"gray.200"}
          rounded={"lg"}
          mt={2}
          minH={"90vh"}
          mb={2}
        >
          <Flex direction={"column"}>
            <Center w={"100%"} mt={5}>
              <PageHeader title={"Weather"} />
            </Center>
            <Center w={"100%"} mt={5} mb={2}>
              <Box bg={"gray.300"} rounded={"lg"} w={"95%"}>
                <WeatherPageContent />
              </Box>
            </Center>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default WeatherPage;
