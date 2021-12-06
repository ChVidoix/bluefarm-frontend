import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
} from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import {
  filterCashEvents,
  getCashEventsStats,
  getCashEventsYears,
} from "../../service/BlueFarmService";
import { Doughnut } from "react-chartjs-2";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CashFiltersMap } from "../common/components.const";
import {
  setCashEventsFilters,
  setFilteredCashEvents,
} from "../../actions/BlueFarmActions";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CashEventsFilters = () => {
  const {
    state: {
      cashEvents: {
        events,
        filters: { startTimestamp, endTimestamp, minAmount, maxAmount },
        filteredIncomes,
        filteredOutgoings,
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;
  const { detailed, balance } = getCashEventsStats({
    filteredOutgoings,
    filteredIncomes,
  });

  const [timePeriod, setTimePeriod] = useState(String(CashFiltersMap.all));
  const [minAmountInput, setMinAmountInput] = useState("0");
  const [maxAmountInput, setMaxAmountInput] = useState("0");
  const yearsList = getCashEventsYears(events);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const labels = Object.keys(detailed);
  const values = Object.values(detailed);

  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "billings",
        data: values,
        backgroundColor: values.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
        ),
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    setTimePeriod(String(CashFiltersMap.all));
    setMinAmountInput("0");
    setMaxAmountInput("0");
    dispatch(
      setCashEventsFilters({
        startTimestamp: +new Date(),
        endTimestamp: 2147483648000,
        minAmount: -2147483648,
        maxAmount: 2147483647,
      })
    );
  }, [events]);

  const handleMinAmountChange = (value: string) => {
    setMinAmountInput(value);
    dispatch(
      setCashEventsFilters({
        startTimestamp,
        endTimestamp,
        minAmount: +value,
        maxAmount,
      })
    );
  };

  const handleMaxAmountChange = (value: string) => {
    setMaxAmountInput(value);
    dispatch(
      setCashEventsFilters({
        startTimestamp,
        endTimestamp,
        minAmount,
        maxAmount: +value,
      })
    );
  };

  const handleMenuChange = (value: string) => {
    if (value === CashFiltersMap.all) {
      dispatch(
        setCashEventsFilters({
          startTimestamp: +new Date(),
          endTimestamp: 2147483648000,
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    } else if (value === CashFiltersMap.week) {
      dispatch(
        setCashEventsFilters({
          startTimestamp: +new Date(),
          endTimestamp: +new Date() + 7 * 24 * 60 * 60 * 1000,
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    } else if (value === CashFiltersMap.twoWeeks) {
      dispatch(
        setCashEventsFilters({
          startTimestamp: +new Date(),
          endTimestamp: +new Date() + 14 * 24 * 60 * 60 * 1000,
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    } else if (value === CashFiltersMap.month) {
      dispatch(
        setCashEventsFilters({
          startTimestamp: +new Date(),
          endTimestamp: +new Date() + 31 * 24 * 60 * 60 * 1000,
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    } else if (value === CashFiltersMap.previous) {
      dispatch(
        setCashEventsFilters({
          startTimestamp: 0,
          endTimestamp: +new Date(),
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    } else if (value === CashFiltersMap.byYear) {
      const startDate = +new Date(`${selectedYear}-01-01`);
      dispatch(
        setCashEventsFilters({
          startTimestamp: startDate,
          endTimestamp: startDate + 365 * 24 * 60 * 60 * 1000,
          minAmount: +parse(minAmountInput),
          maxAmount: +parse(maxAmountInput),
        })
      );
    }
    setTimePeriod(value);
  };

  const handleYearsMenuChange = (year: string) => {
    const startDate = +new Date(`${year}-01-01`);
    dispatch(
      setCashEventsFilters({
        startTimestamp: startDate,
        endTimestamp: startDate + 365 * 24 * 60 * 60 * 1000,
        minAmount: +parse(minAmountInput),
        maxAmount: +parse(maxAmountInput),
      })
    );
    setSelectedYear(+year);
  };

  useEffect(() => {
    const min = +parse(minAmountInput);
    const max = +parse(maxAmountInput);

    if (max <= min) {
      if (max === 0 && min === 0) {
        dispatch(
          setFilteredCashEvents(
            filterCashEvents({
              events,
              startTimestamp,
              endTimestamp,
              minAmount: -2147483648,
              maxAmount: 2147483647,
            })
          )
        );
      } else if (min === 0 && max !== 0) {
        dispatch(
          setFilteredCashEvents(
            filterCashEvents({
              events,
              startTimestamp,
              endTimestamp,
              minAmount: -2147483648,
              maxAmount: max,
            })
          )
        );
      } else if (max === 0 && min !== 0) {
        dispatch(
          setFilteredCashEvents(
            filterCashEvents({
              events,
              startTimestamp,
              endTimestamp,
              minAmount: min,
              maxAmount: 2147483647,
            })
          )
        );
      } else {
        dispatch(setFilteredCashEvents([]));
      }
    } else {
      dispatch(
        setFilteredCashEvents(
          filterCashEvents({
            events,
            startTimestamp,
            endTimestamp,
            minAmount: min,
            maxAmount: max,
          })
        )
      );
    }
  }, [startTimestamp, endTimestamp, minAmountInput, maxAmountInput]);

  const renderMenuItems = () => {
    return Object.keys(CashFiltersMap).map((key: string) => (
      <MenuItem key={key} value={CashFiltersMap[key]}>
        {CashFiltersMap[key]}
      </MenuItem>
    ));
  };

  const renderYearsMenuItems = () => {
    return yearsList.map((key: string) => (
      <MenuItem key={key} value={key}>
        {key}
      </MenuItem>
    ));
  };

  return (
    <Flex w={"100%"} mt={10}>
      <Spacer />
      <Center w={"45%"} bg={"gray.300"} rounded={"lg"}>
        <Flex direction={"column"} h={"100%"}>
          <Center mt={2}>
            <Flex
              w={"100%"}
              h={"2em"}
              rounded={"lg"}
              bg={"gray.400"}
              justifyContent={"space-around"}
            >
              <Center color={"gray.600"} fontWeight={"bold"}>
                Balance:
              </Center>
              <Center color={"gray.600"}>{balance}</Center>
            </Flex>
          </Center>
          <Center mt={3} mb={3}>
            <Doughnut data={data} />
          </Center>
        </Flex>
      </Center>
      <Spacer />
      <Box w={"45%"} bg={"gray.300"} rounded={"lg"}>
        <Flex direction={"column"} w={"100%"} h={"60%"} mt={2}>
          <Center w={"100%"} h={"2em"}>
            <Center
              w={"10em"}
              h={"100%"}
              bg={"gray.400"}
              rounded={"lg"}
              color={"gray.600"}
              fontWeight={"bold"}
            >
              Amount
            </Center>
          </Center>

          <Flex w={"100%"}>
            <Spacer />
            <Box w={"47%"}>
              <FormLabel
                htmlFor="min-amount"
                color={"gray.600"}
                fontWeight={"bold"}
              >
                Min amount
              </FormLabel>
              <NumberInput
                rounded={"lg"}
                onChange={(valueString) =>
                  handleMinAmountChange(parse(valueString))
                }
                value={format(minAmountInput)}
                bg={"gray.200"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Spacer />
            <Box w={"47%"}>
              <FormLabel
                htmlFor="max-amount"
                color={"gray.600"}
                fontWeight={"bold"}
              >
                Max amount
              </FormLabel>
              <NumberInput
                rounded={"lg"}
                onChange={(valueString: string) =>
                  handleMaxAmountChange(parse(valueString))
                }
                value={format(maxAmountInput)}
                bg={"gray.200"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Spacer />
          </Flex>
          <Center w={"100%"} h={"2em"} mt={5}>
            <Center
              w={"10em"}
              h={"100%"}
              bg={"gray.400"}
              rounded={"lg"}
              color={"gray.600"}
              fontWeight={"bold"}
            >
              Date
            </Center>
          </Center>
          <Flex w={"100%"} h={"4em"} mb={5} rounded={"lg"} bg={"gray.300"}>
            <Spacer />
            <Center color={"gray.700"} height={"100%"}>
              Select your events from:
            </Center>
            <Spacer />
            <Center color={"gray.700"} height={"100%"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w={"15em"}
                >
                  {timePeriod}
                </MenuButton>
                <MenuList
                  onClick={(e: any) => handleMenuChange(e.target.value)}
                >
                  {renderMenuItems()}
                </MenuList>
              </Menu>
            </Center>
            <Spacer />
          </Flex>
        </Flex>
        {timePeriod === CashFiltersMap.byYear && (
          <Flex w={"100%"} h={"4em"} mb={5} rounded={"lg"} bg={"gray.300"}>
            <Spacer />
            <Center color={"gray.700"} height={"100%"}>
              Select year:
            </Center>
            <Spacer />
            <Center color={"gray.700"} height={"100%"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w={"15em"}
                >
                  {selectedYear}
                </MenuButton>
                <MenuList
                  onClick={(e: any) => handleYearsMenuChange(e.target.value)}
                >
                  {renderYearsMenuItems()}
                </MenuList>
              </Menu>
            </Center>
            <Spacer />
          </Flex>
        )}
      </Box>
      <Spacer />
    </Flex>
  );
};
