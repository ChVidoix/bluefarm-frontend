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
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  editFertilizeEvent,
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
} from "../../actions/BlueFarmActions";
import { FertilizeEventOrHarvestOptionsProps } from "../common/components.const";
import { FiEdit3 } from "react-icons/all";

export const EditFertilizeEventDrawer = ({
  eventId,
}: FertilizeEventOrHarvestOptionsProps) => {
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

  const {
    name: editedName,
    date: editedDate,
    description: editedDescription,
    type: editedType,
    amount: editedAmount,
  } = fertilizeEvents?.find(
    (filteredEvent: FertilizeEventModel) => filteredEvent.id === eventId
  )!;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("12:00");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(editedName);
      setType(editedType);
      setAmount(editedAmount);
      setDate(editedDate.slice(0, 10));
      setTime(editedDate.slice(11, 16));
      setDescription(editedDescription);
    }
  }, [isOpen]);

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

  const handleEditEvent = () => {
    setAddButtonLoading(true);
    editFertilizeEvent({
      token,
      cropId: selectedCrop,
      fertilizeEventId: eventId,
      name,
      date: parseJSDateToDjango(date, time),
      description,
      type,
      amount,
    })
      .then((res: FertilizeEventModel) => {
        if (fertilizeEvents) {
          dispatch(
            setFertilizeEvents(
              fertilizeEvents.map((fertilizeEvent: FertilizeEventModel) => {
                if (fertilizeEvent.id === res.id) {
                  return res;
                }
                return fertilizeEvent;
              })
            )
          );
        } else {
          dispatch(setFertilizeEvents([res]));
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
      <MenuItem icon={<FiEdit3 />} onClick={onOpen}>
        Edytuj
      </MenuItem>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">
            Edytuj {editedName}
          </DrawerHeader>

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
              Anuluj
            </Button>
            <Button
              isLoading={addButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleEditEvent}
            >
              Zapisz
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
