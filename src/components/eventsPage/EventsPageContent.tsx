import {
  Box,
  Center,
  chakra,
  Flex,
  Spacer,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { filterEvents, getEvents } from "../../service/BlueFarmService";
import { useContext, useEffect } from "react";
import { AddEventDrawer } from "./AddEventDrawer";
import { EventModel } from "../../service/BlueFarm.service.const";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { useSortBy, useTable } from "react-table";
import { eventsColumns } from "../common/components.const";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { EventOptions } from "./EventOptions";
import { setAllEvents, setFilteredEvents } from "../../actions/BlueFarmActions";
import { EventsFilters } from "./EventsFilters";

export const EventsPageContent = () => {
  const {
    state: {
      appState: { isLoading },
      events,
      filteredEvents,
      auth: { token },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns: eventsColumns as any, data: filteredEvents || [] },
      useSortBy
    );

  useEffect(() => {
    getEvents(token).then((res) => {
      dispatch(setAllEvents(res));
      dispatch(
        setFilteredEvents(
          filterEvents({
            events: res,
            startTimestamp: +new Date(),
            endTimestamp: 2147483648000,
          })
        )
      );
    });
  }, []);

  const tableCaption = (): JSX.Element => {
    if (isLoading || events === null) {
      return (
        <Center>
          <Spinner
            thickness="4px"
            emptyColor="teal.50"
            color="teal.500"
            size="xl"
          />
        </Center>
      );
    }
    return <AddEventDrawer />;
  };

  const eventDescriptionRowContent = (
    eventName: string,
    eventDescription: string
  ): JSX.Element => {
    if (eventDescription.length > 15) {
      return (
        <Tooltip label={eventDescription}>{`${eventDescription.slice(
          0,
          15
        )}...`}</Tooltip>
      );
    }
    return <>{eventDescription}</>;
  };

  const renderCell = (cell: any, index: number, currentEvent: EventModel) => {
    if (cell.column.Header === "No.") {
      return <>{index + 1}</>;
    } else if (cell.column.Header === "Description") {
      return (
        <>
          {eventDescriptionRowContent(
            currentEvent.name,
            currentEvent.description
          )}
        </>
      );
    } else if (cell.column.Header === "Start date") {
      return (
        <>
          <>{currentEvent.start_date.slice(11, 16)}</>
          <br />
          <>{currentEvent.start_date.slice(0, 10).replaceAll("-", ".")}</>
        </>
      );
    } else if (cell.column.Header === "End date") {
      return (
        <>
          <>{currentEvent.end_date.slice(11, 16)}</>
          <br />
          <>{currentEvent.end_date.slice(0, 10).replaceAll("-", ".")}</>
        </>
      );
    } else {
      return cell.render("Cell");
    }
  };

  return (
    <Center w={"100%"}>
      <Flex direction={"column"} w={"100%"} align={"center"}>
        <Spacer />
        <EventsFilters />
        <Spacer />
        <Center rounded={"lg"} bg={"gray.300"} w={"85%"} mt={10} pb={1}>
          <Box bg={"gray.300"} rounded={"lg"} w={"100%"}>
            <Table {...getTableProps()} variant="striped" w={"100%"}>
              <TableCaption>{tableCaption()}</TableCaption>

              <Thead borderBottom={"2px"}>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        isNumeric={column.isNumeric}
                      >
                        {column.render("Header")}
                        <chakra.span pl="4">
                          {column.isSorted &&
                            (column.isSortedDesc ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            ))}
                        </chakra.span>
                      </Th>
                    ))}
                    <Th />
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row: any, index) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => (
                        <Td
                          {...cell.getCellProps()}
                          isNumeric={cell.column.isNumeric}
                        >
                          {renderCell(cell, index, row.values)}
                        </Td>
                      ))}
                      <Td>
                        <EventOptions event={row.values} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Center>
      </Flex>
    </Center>
  );
};
