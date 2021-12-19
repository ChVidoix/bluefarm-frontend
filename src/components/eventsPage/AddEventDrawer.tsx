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
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChangeEvent, useContext, useState } from "react";
import {
  createEvent,
  filterEvents,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { EventModel } from "../../service/BlueFarm.service.const";
import { DatePicker } from "../common/DatePicker";
import { format } from "date-fns";
import { setAllEvents, setFilteredEvents } from "../../actions/BlueFarmActions";

export const AddEventDrawer = () => {
  const {
    state: {
      auth: { token },
      events,
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [description, setDescription] = useState("");
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid =
    !name || !description || Date.parse(startDate) > Date.parse(endDate);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const clearInputs = () => {
    onClose();
    setName("");
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setEndTime("12:00");
    setStartTime("13:00");
    setDescription("");
  };

  const handleCreateEvent = () => {
    setAddButtonLoading(true);
    createEvent({
      token,
      name,
      start_date: parseJSDateToDjango(startDate, startTime),
      end_date: parseJSDateToDjango(endDate, endTime),
      description,
    }).then((res: EventModel) => {
      if (events) {
        dispatch(setAllEvents([...events, res]));
        dispatch(
          setFilteredEvents(
            filterEvents({
              events: [...events, res],
              startTimestamp: +new Date(),
              endTimestamp: 2147483648000,
            })
          )
        );
      } else {
        dispatch(setAllEvents([res]));
        dispatch(
          setFilteredEvents(
            filterEvents({
              events: [res],
              startTimestamp: +new Date(),
              endTimestamp: 2147483648000,
            })
          )
        );
      }
      clearInputs();
      setAddButtonLoading(false);
    });
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Dodaj wydarzenie
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Dodaj wydarzenie</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nazwa</FormLabel>
                <Input
                  id="name"
                  placeholder="Podaj nazwę wydarzenia"
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
                <FormLabel htmlFor="desc">Opis</FormLabel>
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
              Anuluj
            </Button>
            <Button
              isLoading={addButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleCreateEvent}
            >
              Dodaj wydarzenie
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
