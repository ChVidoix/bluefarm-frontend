import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { authenticatedLinks } from "../common/components.const";

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        aria-label="menu"
        onClick={onOpen}
        leftIcon={<ArrowRightIcon size="sm" />}
      >
        Menu
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box rounded={"lg"}>
              <Center>
                <Text>Main Menu</Text>
              </Center>
            </Box>
          </DrawerHeader>
          <StackDivider borderColor={"teal.200"} borderTopWidth={2} />
          <DrawerBody>
            <VStack
              align="stretch"
              divider={<StackDivider borderColor="teal.200" />}
            >
              {Object.keys(authenticatedLinks).map((link: string) => (
                <Link key={link} to={`/${link}`}>
                  <Button onClick={onClose} w="100%">
                    {authenticatedLinks[link]}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
