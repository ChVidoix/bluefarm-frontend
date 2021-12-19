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
  MenuItem,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { EventModel } from "../../service/BlueFarm.service.const";
import { EventOptionsProps } from "../common/components.const";
import { FiEdit3 } from "react-icons/all";
import {
  editEvent,
  filterEvents,
  parseJSDateToDjango,
} from "../../service/BlueFarmService";
import { format } from "date-fns";
import { DatePicker } from "../common/DatePicker";
import { setAllEvents, setFilteredEvents } from "../../actions/BlueFarmActions";

export const EditEventDrawer = ({ event }: EventOptionsProps) => {
  const {
    state: {
      auth: { token },
      events,
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(event.start_date.slice(0, 10));
  const [endDate, setEndDate] = useState(event.end_date.slice(0, 10));
  const [startTime, setStartTime] = useState(event.start_date.slice(11, 16));
  const [endTime, setEndTime] = useState(event.end_date.slice(11, 16));
  const [description, setDescription] = useState("");
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setName(event.name);
      setStartDate(event.start_date.slice(0, 10));
      setEndDate(event.end_date.slice(0, 10));
      setStartTime(event.start_date.slice(11, 16));
      setEndTime(event.end_date.slice(11, 16));
      setDescription(event.description);
    }
  }, [isOpen]);

  const handleSaveEvent = () => {
    setSaveButtonLoading(true);
    editEvent({
      token,
      id: event.id,
      name,
      start_date: parseJSDateToDjango(startDate, startTime),
      end_date: parseJSDateToDjango(endDate, endTime),
      description,
    }).then((res: EventModel) => {
      if (events) {
        const newEvents: Array<EventModel> = events.map(
          (mappedEvent: EventModel) => {
            if (mappedEvent.id === event.id) {
              return { ...res };
            }
            return mappedEvent;
          }
        );
        dispatch(setAllEvents(newEvents));
        dispatch(
          setFilteredEvents(
            filterEvents({
              events: newEvents,
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
      setSaveButtonLoading(false);
      clearInputs();
    });
  };

  return (
    <>
      <MenuItem icon={<FiEdit3 />} onClick={onOpen}>
        Edytuj
      </MenuItem>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Edit {event.name}</DrawerHeader>

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
              isLoading={saveButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleSaveEvent}
            >
              Zapisz
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
