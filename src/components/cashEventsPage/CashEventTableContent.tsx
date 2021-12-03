import {
  cashEventsColumns,
  CashEventsTableContentProps,
} from "../common/components.const";
import {
  Box,
  Button,
  Center,
  chakra,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useSortBy, useTable } from "react-table";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import { CashEventOptions } from "./CashEventOptions";
import { useContext } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";

export const CashEventsTableContent = ({
  cashEvents,
  title,
  onModalOpen,
}: CashEventsTableContentProps) => {
  const {
    state: {
      appState: { isLoading },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns: cashEventsColumns as any, data: cashEvents || [] },
      useSortBy
    );

  const getTotal = () => {
    let total = 0;
    cashEvents?.forEach((event: CashEventModel) => {
      total = total + event.amount;
    });
    return total;
  };

  const handleModalOpen = () => {
    onModalOpen();
  };

  const tableCaption = (): JSX.Element => {
    if (isLoading || cashEvents === null) {
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
    return (
      <>
        <Button onClick={handleModalOpen}>Show {title}</Button>
      </>
    );
  };

  const renderCell = (
    cell: any,
    index: number,
    currentEvent: CashEventModel
  ) => {
    if (cell.column.Header === "No.") {
      return <>{index + 1}</>;
    } else if (cell.column.Header === "Date") {
      return (
        <>
          <>{currentEvent.date.slice(11, 16)}</>
          <br />
          <>{currentEvent.date.slice(0, 10).replaceAll("-", ".")}</>
        </>
      );
    } else {
      return cell.render("Cell");
    }
  };

  return (
    <Center rounded={"lg"} w={"45%"} mt={10} pb={1}>
      <Box bg={"gray.300"} rounded={"lg"} w={"100%"}>
        <Table
          className={"cashEventsTable"}
          {...getTableProps()}
          variant="striped"
        >
          <TableCaption>{tableCaption()}</TableCaption>

          <Thead borderBottom={"2px"}>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                    <CashEventOptions id={row.values.id} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot borderTop={"2px"}>
            <Tr>
              <Th>Total</Th>
              <Th></Th>
              <Th isNumeric>{getTotal()}</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Center>
  );
};
