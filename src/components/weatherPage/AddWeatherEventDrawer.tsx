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
import { createWeatherEvent } from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { WeatherEventModel } from "../../service/BlueFarm.service.const";
import { format } from "date-fns";
import {
  setWeatherEvents,
  setWeatherEventsFilters,
} from "../../actions/BlueFarmActions";

export const AddWeatherEventDrawer = () => {
  const {
    state: {
      auth: { token },
      weather: { weatherEvents },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [description, setDescription] = useState("");
  const [rainfallDescription, setRainfallDescription] = useState("");
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid = !description || !rainfallDescription;

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRainfallDescription(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleMinTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinTemp(+event.target.value);
  };

  const handleMaxTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxTemp(+event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const clearInputs = () => {
    onClose();
    setRainfallDescription("");
    setMaxTemp(0);
    setMinTemp(0);
    setDate(format(new Date(), "yyyy-MM-dd"));
    setDescription("");
  };

  const handleCreateEvent = () => {
    setAddButtonLoading(true);
    createWeatherEvent({
      token,
      date,
      description,
      rainfall: rainfallDescription,
      min_temp: minTemp,
      max_temp: maxTemp,
    })
      .then((res: WeatherEventModel) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (weatherEvents) {
          dispatch(setWeatherEvents([...weatherEvents, res]));
          dispatch(setWeatherEventsFilters(+today - 7 * 1000 * 60 * 60 * 24));
        } else {
          dispatch(setWeatherEvents([res]));
          dispatch(setWeatherEventsFilters(+today - 7 * 1000 * 60 * 60 * 24));
        }
        clearInputs();
        setAddButtonLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Add fertilize event
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">
            Add fertilize event
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="date">Date</FormLabel>
                <input
                  type="date"
                  className={"datePicker"}
                  value={date}
                  onChange={handleDateChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Min temperature</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Type min temperature"}
                    value={minTemp}
                    onChange={handleMinTempChange}
                  />
                  <InputRightAddon>°C</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="amount">Max temperature</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Type max temperature"}
                    value={maxTemp}
                    onChange={handleMaxTempChange}
                  />
                  <InputRightAddon>°C</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="type">Rainfall description</FormLabel>
                <Input
                  id="rainfall"
                  placeholder="Enter rainfall description"
                  maxLength={30}
                  value={rainfallDescription}
                  isInvalid={!rainfallDescription}
                  onChange={handleTypeChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
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
              Add day
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
