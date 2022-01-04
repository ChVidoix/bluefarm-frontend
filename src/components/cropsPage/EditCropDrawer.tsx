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
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CropModel } from "../../service/BlueFarm.service.const";
import { CropOptionsProps } from "../common/components.const";
import { FiEdit3 } from "react-icons/all";
import { editCrop } from "../../service/BlueFarmService";
import { setAppStateError } from "../../actions/BlueFarmActions";

export const EditCropDrawer = ({ crop, crops, setCrops }: CropOptionsProps) => {
  const {
    state: {
      auth: { token },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAreaInvalid, setIsAreaInvalid] = useState(false);
  const [area, setArea] = useState(String(crop.area));
  const [name, setName] = useState(crop.name);
  const [type, setType] = useState(crop.type);
  const [variety, setVariety] = useState(crop.variety);
  const [description, setDescription] = useState(crop.description);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const isAddButtonInvalid = isAreaInvalid || !name || !variety || !description;

  useEffect(() => {
    if (isOpen) {
      setName(crop.name);
      setVariety(crop.variety);
      setType(crop.type);
      setArea(String(crop.area));
      setDescription(crop.description);
    }
  }, [isOpen]);

  const handleAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < 1) {
      setIsAreaInvalid(true);
      setArea("0");
    } else {
      setIsAreaInvalid(false);
      setArea(event.target.value);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleVarietyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariety(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const clearInputs = () => {
    onClose();
    setName("");
    setVariety("");
    setType("");
    setArea("1");
    setDescription("");
  };

  const handleSaveCrop = () => {
    setSaveButtonLoading(true);
    editCrop({
      token,
      id: crop.id,
      name,
      type,
      variety,
      area: +area,
      description,
    })
      .then((res: CropModel) => {
        if (crops) {
          const newCrops: Array<CropModel> = crops.map(
            (mappedCrop: CropModel) => {
              if (mappedCrop.id === crop.id) {
                return { ...res };
              }
              return mappedCrop;
            }
          );
          setCrops(newCrops);
        } else {
          setCrops([res]);
        }
        setSaveButtonLoading(false);
        clearInputs();
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
            Edytuj {crop.name}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nazwa</FormLabel>
                <Input
                  id="name"
                  placeholder="Podaj nazwę uprawy"
                  maxLength={30}
                  value={name}
                  isInvalid={!name}
                  onChange={handleNameChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="variety">Rodzaj</FormLabel>
                <Input
                  id="type"
                  placeholder="Podaj rodzaj uprawy"
                  maxLength={20}
                  value={type}
                  isInvalid={!type}
                  onChange={handleTypeChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="variety">Odmiana</FormLabel>
                <Input
                  id="variety"
                  placeholder="Podaj odmianę uprawy"
                  maxLength={20}
                  value={variety}
                  isInvalid={!variety}
                  onChange={handleVarietyChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Powierzchnia</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Podaj powierzchnię uprawy"}
                    isInvalid={isAreaInvalid}
                    value={area}
                    onChange={handleAreaChange}
                  />
                  <InputRightAddon>
                    m<sup>2</sup>
                  </InputRightAddon>
                </InputGroup>
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
              onClick={handleSaveCrop}
            >
              Zapisz
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
