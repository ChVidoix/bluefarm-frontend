import { Center, Heading } from "@chakra-ui/react";
import { HeaderProps } from "./components.const";

export const PageHeader = ({ title }: HeaderProps) => (
  <Center bg={"teal.400"} rounded={"lg"} w={"30vw"} h={"9vh"}>
    <Heading color={"white"}>{title}</Heading>
  </Center>
);
