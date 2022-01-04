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
  createHarvest,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { HarvestModel } from "../../service/BlueFarm.service.const";
import { DatePicker } from "../common/DatePicker";
import { format } from "date-fns";
import {
  setAppStateError,
  setHarvests,
  setHarvestsFilters,
} from "../../actions/BlueFarmActions";

export const AddHarvestDrawer = () => {
  const {
    state: {
      auth: { token },
      crops: {
        selectedCrop,
        harvests: { harvestsEvents },
      },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [notes, setNotes] = useState("");
  const [cropAmount, setCropAmount] = useState(0);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid = !name || !notes || cropAmount === 0;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCropAmount(+event.target.value);
  };

  const clearInputs = () => {
    onClose();
    setName("");
    setCropAmount(0);
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setStartTime("12:00");
    setEndTime("13:00");
    setNotes("");
  };

  const handleCreateEvent = () => {
    setAddButtonLoading(true);
    createHarvest({
      token,
      cropId: selectedCrop,
      name,
      start_date: parseJSDateToDjango(startDate, startTime),
      end_date: parseJSDateToDjango(endDate, endTime),
      crop_amount: cropAmount,
      notes,
    })
      .then((res: HarvestModel) => {
        if (harvestsEvents) {
          dispatch(setHarvests([...harvestsEvents, res]));
          dispatch(
            setHarvestsFilters(
              +new Date(`${new Date().getFullYear()}-01-01`),
              +new Date(`${new Date().getFullYear()}-12-31`)
            )
          );
        } else {
          dispatch(setHarvests([res]));
          dispatch(
            setHarvestsFilters(
              +new Date(`${new Date().getFullYear()}-01-01`),
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
        Dodaj zbiór
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Dodaj zbiór</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nazwa</FormLabel>
                <Input
                  id="name"
                  placeholder="Enter your harvest's name"
                  maxLength={30}
                  value={name}
                  isInvalid={!name}
                  onChange={handleNameChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="start-date">Rozpoczęcie</FormLabel>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  time={startTime}
                  setTime={setStartTime}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="end-date">Zakończenie</FormLabel>
                <DatePicker
                  date={endDate}
                  time={endTime}
                  min={startDate}
                  setDate={setEndDate}
                  setTime={setEndTime}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Ilość</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Type amount"}
                    isInvalid={cropAmount === 0}
                    value={cropAmount}
                    onChange={handleAmountChange}
                  />
                  <InputRightAddon>kg</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Notatki</FormLabel>
                <Textarea
                  id="desc"
                  maxLength={150}
                  value={notes}
                  isInvalid={!notes}
                  onChange={handleDescriptionChange}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={clearInputs}>
              Anuluj
            </Button>
            <Button
              isLoading={addButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleCreateEvent}
            >
              Dodaj zbiór
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
