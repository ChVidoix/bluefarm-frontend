import { Center, Heading } from "@chakra-ui/react";
import { HeaderProps } from "./components.const";

export const PageHeader = ({ title, as = "h2" }: HeaderProps) => (
  <Center bg={"gray.300"} rounded={"lg"} w={"30vw"} h={"9vh"}>
    <Heading as={as} color={"gray.600"}>
      {title}
    </Heading>
  </Center>
);
