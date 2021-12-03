import { CashEventsTableProps } from "../common/components.const";
import { CashEventsTableContent } from "./CashEventTableContent";
import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { FullCashEventsTable } from "./FullCashEventsTable";

export const CashEventsTable = ({
  cashEvents,
  title,
}: CashEventsTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CashEventsTableContent
        cashEvents={cashEvents}
        title={title}
        onModalOpen={onOpen}
      />
      <Drawer placement={"top"} onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent bg={"gray.200"}>
          <DrawerHeader>
            <Flex>
              <Box>{title}</Box>
              <Spacer />
              <CloseButton onClick={onClose} />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <FullCashEventsTable
              cashEvents={cashEvents}
              title={title}
              onModalOpen={() => {}}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
