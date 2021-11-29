import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ShowDescriptionProps } from "../common/components.const";

export const ShowCropDescription = ({ description }: ShowDescriptionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant={"outline"} onClick={onOpen}>
        show
      </Button>
      <Drawer placement={"top"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="2px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>{description}</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
