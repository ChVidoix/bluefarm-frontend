import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import {
  editCashEvent,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import { format } from "date-fns";
import { DatePicker } from "../common/DatePicker";
import {
  CashEventType,
  EditCashEventDrawerProps,
} from "../common/components.const";
import { FiEdit3 } from "react-icons/all";
import { setCashEvents } from "../../actions/BlueFarmActions";

export const EditCashEventDrawer = ({ event }: EditCashEventDrawerProps) => {
  const {
    state: {
      auth: { token },
      cashEvents: { events },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date.slice(0, 10));
  const [time, setTime] = useState(event.date.slice(11, 16));
  const [amount, setAmount] = useState(
    event.amount > 0 ? event.amount : -1 * event.amount
  );
  const [cashEventType, setCashEventType] = useState(
    event.amount > 0 ? CashEventType.income : CashEventType.outgoing
  );
  const [description, setDescription] = useState(event.description);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid = !name || !description;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setName(event.name);
      setDate(event.date.slice(0, 10));
      setTime(event.date.slice(11, 16));
      setAmount(event.amount > 0 ? event.amount : -1 * event.amount);
      setCashEventType(
        event.amount > 0 ? CashEventType.income : CashEventType.outgoing
      );
      setDescription(event.description);
    }
  }, [isOpen]);

  const clearInputs = () => {
    onClose();
    setName("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setTime("12:00");
    setAmount(0);
    setCashEventType(CashEventType.outgoing);
    setDescription("");
  };

  const handleEditCashEvent = () => {
    setAddButtonLoading(true);
    const calculatedAmount =
      cashEventType === CashEventType.outgoing ? -1 * amount : amount;
    editCashEvent({
      token,
      id: event.id,
      name,
      date: parseJSDateToDjango(date, time),
      description,
      amount: calculatedAmount,
    }).then((res: CashEventModel) => {
      if (events) {
        const newEvents: Array<CashEventModel> = events.map(
          (mappedEvent: CashEventModel) => {
            if (event.id === mappedEvent.id) {
              return { ...res };
            }
            return mappedEvent;
          }
        );
        dispatch(setCashEvents(newEvents));
      }
      clearInputs();
      setAddButtonLoading(false);
    });
  };

  return (
    <Box mt={5}>
      <MenuItem icon={<FiEdit3 />} onClick={onOpen}>
        Edit
      </MenuItem>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Edit {event.name}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter your billing's name"
                  maxLength={30}
                  value={name}
                  isInvalid={!name}
                  onChange={handleNameChange}
                />
              </Box>

              <Box>
                <RadioGroup
                  onChange={(value: CashEventType) => setCashEventType(value)}
                  value={cashEventType}
                >
                  <Stack direction="row">
                    <Radio value={CashEventType.outgoing}>Outgoing</Radio>
                    <Radio value={CashEventType.income}>Income</Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Type amount"}
                    isInvalid={amount < 0}
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <InputRightAddon>$</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="date">Select date</FormLabel>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  maxLength={50}
                  value={description}
                  isInvalid={!description}
                  onChange={handleDescriptionChange}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={clearInputs}>
              Cancel
            </Button>
            <Button
              isLoading={addButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleEditCashEvent}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
