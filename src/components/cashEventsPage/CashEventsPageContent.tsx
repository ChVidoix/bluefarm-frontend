import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { getCashEvents } from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { setAppStateError, setCashEvents } from "../../actions/BlueFarmActions";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import { CashEventsTable } from "./CashEventsTable";
import { CashEventsFilters } from "./CashEventsFilters";
import { AddCashEventDrawer } from "./AddCashEventDrawer";

export const CashEventsPageContent = () => {
  const {
    state: {
      auth: { token },
      cashEvents: { filteredOutgoings, filteredIncomes, events },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  useEffect(() => {
    getCashEvents(token)
      .then((res: Array<CashEventModel>) => {
        dispatch(setCashEvents(res));
      })
      .catch(() => {
        dispatch(setAppStateError("Coś poszło nie tak, spróbuj ponownie"));
      });
  }, []);

  return (
    <>
      {events?.length ? (
        <>
          <Spacer />
          <CashEventsFilters />
          <Spacer />
          <AddCashEventDrawer />
          <Spacer />
          <Flex w={"100%"} align={"flex-start"}>
            <Spacer />
            <CashEventsTable cashEvents={filteredIncomes} title={"przychody"} />
            <Spacer />
            <CashEventsTable cashEvents={filteredOutgoings} title={"wydatki"} />
            <Spacer />
          </Flex>
        </>
      ) : (
        <Center w={"100%"} h={"60vh"}>
          <Box
            rounded={"lg"}
            bg={"gray.300"}
            fontWeight={"bold"}
            color={"gray.600"}
            w={"30vw"}
            h={"20vh"}
          >
            <Center h={"50%"} w={"30vw"}>
              Brak danych do wyświetlenia
            </Center>
            <Center h={"40%"} w={"30vw"}>
              <AddCashEventDrawer />
            </Center>
          </Box>
        </Center>
      )}
    </>
  );
};
