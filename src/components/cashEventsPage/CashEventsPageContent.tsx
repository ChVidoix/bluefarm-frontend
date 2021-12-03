import { Flex, Spacer } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { getCashEvents } from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { setCashEvents } from "../../actions/BlueFarmActions";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import { CashEventsTable } from "./CashEventsTable";
import { CashEventsFilters } from "./CashEventsFilters";
import { AddCashEventDrawer } from "./AddCashEventDrawer";

export const CashEventsPageContent = () => {
  const {
    state: {
      auth: { token },
      cashEvents: { filteredOutgoings, filteredIncomes },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  useEffect(() => {
    getCashEvents(token).then((res: Array<CashEventModel>) => {
      dispatch(setCashEvents(res));
    });
  }, []);

  return (
    <>
      <Spacer />
      <CashEventsFilters />
      <Spacer />
      <AddCashEventDrawer />
      <Spacer />
      <Flex w={"100%"} align={"flex-start"}>
        <Spacer />
        <CashEventsTable cashEvents={filteredIncomes} title={"incomes"} />
        <Spacer />
        <CashEventsTable cashEvents={filteredOutgoings} title={"outgoings"} />
        <Spacer />
      </Flex>
    </>
  );
};
