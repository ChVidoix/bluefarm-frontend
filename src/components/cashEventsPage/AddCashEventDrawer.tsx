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
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChangeEvent, useContext, useState } from "react";
import {
  createCashEvent,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import { DatePicker } from "../common/DatePicker";
import { format } from "date-fns";
import { setCashEvents } from "../../actions/BlueFarmActions";
import { CashEventType } from "../common/components.const";

export const AddCashEventDrawer = () => {
  const {
    state: {
      auth: { token },
      cashEvents: { events },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("12:00");
  const [amount, setAmount] = useState(0);
  const [cashEventType, setCashEventType] = useState(CashEventType.outgoing);
  const [description, setDescription] = useState("");
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

  const clearInputs = () => {
    onClose();
    setName("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setTime("12:00");
    setDescription("");
  };

  const handleCreateCashEvent = () => {
    setAddButtonLoading(true);
    const calculatedAmount =
      cashEventType === CashEventType.outgoing ? -1 * amount : amount;
    createCashEvent({
      token,
      name,
      date: parseJSDateToDjango(date, time),
      description,
      amount: calculatedAmount,
    }).then((res: CashEventModel) => {
      if (events) {
        dispatch(setCashEvents([...events, res]));
      } else {
        dispatch(setCashEvents([res]));
      }
      clearInputs();
      setAddButtonLoading(false);
    });
  };

  return (
    <Box mt={5}>
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Add billing
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Add a new billing</DrawerHeader>

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
              onClick={handleCreateCashEvent}
            >
              Add billing
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
