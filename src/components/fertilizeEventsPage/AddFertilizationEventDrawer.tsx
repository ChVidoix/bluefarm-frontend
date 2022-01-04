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
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChangeEvent, useContext, useState } from "react";
import {
  createFertilizeEvent,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { FertilizeEventModel } from "../../service/BlueFarm.service.const";
import { DatePicker } from "../common/DatePicker";
import { format } from "date-fns";
import {
  setAppStateError,
  setFertilizeEvents,
  setFertilizeEventsFilters,
} from "../../actions/BlueFarmActions";

export const AddFertilizationEventDrawer = () => {
  const {
    state: {
      auth: { token },
      crops: {
        selectedCrop,
        fertilization: { fertilizeEvents },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("12:00");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid = !name || !description || !type || amount === 0;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
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
    setType("");
    setAmount(0);
    setDate(format(new Date(), "yyyy-MM-dd"));
    setTime("12:00");
    setDescription("");
  };

  const handleCreateEvent = () => {
    setAddButtonLoading(true);
    createFertilizeEvent({
      token,
      cropId: selectedCrop,
      name,
      date: parseJSDateToDjango(date, time),
      description,
      type,
      amount,
    })
      .then((res: FertilizeEventModel) => {
        if (fertilizeEvents) {
          dispatch(setFertilizeEvents([...fertilizeEvents, res]));
          dispatch(
            setFertilizeEventsFilters(
              +new Date(),
              +new Date(`${new Date().getFullYear()}-12-31`)
            )
          );
        } else {
          dispatch(setFertilizeEvents([res]));
          dispatch(
            setFertilizeEventsFilters(
              +new Date(),
              +new Date(`${new Date().getFullYear()}-12-31`)
            )
          );
        }
        clearInputs();
        setAddButtonLoading(false);
      })
      .catch(() => {
        dispatch(setAppStateError("Coś poszło nie tak, spróbuj ponownie"));
      });
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Dodaj nawożenie
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Dodaj nawożenie</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nazwa</FormLabel>
                <Input
                  id="name"
                  placeholder="Podaj nazwę"
                  maxLength={30}
                  value={name}
                  isInvalid={!name}
                  onChange={handleNameChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="date">Data</FormLabel>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Ilość</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Podaj ilość"}
                    isInvalid={amount === 0}
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <InputRightAddon>kg</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="type">Rodzaj</FormLabel>
                <Input
                  id="name"
                  placeholder="Podaj rodzaj"
                  maxLength={20}
                  value={type}
                  isInvalid={!type}
                  onChange={handleTypeChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Opis</FormLabel>
                <Textarea
                  id="desc"
                  maxLength={150}
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
              onClick={handleCreateEvent}
            >
              Dodaj nawożenie
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
