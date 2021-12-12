import {
  Alert,
  AlertIcon,
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
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { WeatherEventModel } from "../../service/BlueFarm.service.const";
import {
  editWeatherEvent,
  formatOnlyDate,
} from "../../service/BlueFarmService";
import { format } from "date-fns";
import { EditWeatherEventDrawerProps } from "../common/components.const";
import { setWeatherEvents } from "../../actions/BlueFarmActions";

export const EditWeatherEventDrawer = ({
  event,
  isOpen,
  onClose,
}: EditWeatherEventDrawerProps) => {
  const {
    state: {
      auth: { token },
      weather: { weatherEvents },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const [date, setDate] = useState(event.date.slice(0, 10));
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [rainfallDescription, setRainfallDescription] = useState("");
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isAddButtonInvalid = !rainfallDescription || !description;

  useEffect(() => {
    if (isOpen) {
      setDate(event.date);
      setMinTemp(event.min_temp);
      setMaxTemp(event.max_temp);
      setRainfallDescription(event.rainfall);
      setDescription(event.description);
    }
  }, [isOpen]);

  const clearInputs = () => {
    onClose();
    setDate(format(new Date(), "yyyy-MM-dd"));
    setMinTemp(0);
    setMaxTemp(0);
    setRainfallDescription("");
    setDescription("");
    setIsError(false);
  };

  const handleRainfallDescriptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleEditCashEvent = () => {
    setSaveButtonLoading(true);
    editWeatherEvent({
      token,
      id: event.id,
      date,
      description,
      rainfall: rainfallDescription,
      max_temp: maxTemp,
      min_temp: minTemp,
    })
      .then((res: WeatherEventModel) => {
        setIsError(false);
        if (weatherEvents) {
          const newEvents: Array<WeatherEventModel> = weatherEvents.map(
            (mappedEvent: WeatherEventModel) => {
              if (event.id === mappedEvent.id) {
                return { ...res };
              }
              return mappedEvent;
            }
          );
          dispatch(setWeatherEvents(newEvents));
        }
        setSaveButtonLoading(false);
        clearInputs();
      })
      .catch(() => {
        setIsError(true);
        setSaveButtonLoading(false);
      });
  };

  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        {isError ? (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        ) : (
          <DrawerCloseButton onClick={clearInputs} />
        )}
        <DrawerHeader borderBottomWidth="2px">
          Edit weather for {formatOnlyDate(event.date)}
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
                onChange={handleRainfallDescriptionChange}
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
            isLoading={saveButtonLoading}
            disabled={isAddButtonInvalid}
            onClick={handleEditCashEvent}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
