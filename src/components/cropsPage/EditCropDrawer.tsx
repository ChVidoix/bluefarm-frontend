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

export const EditCropDrawer = ({ crop, crops, setCrops }: CropOptionsProps) => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAreaInvalid, setIsAreaInvalid] = useState(false);
  const [area, setArea] = useState(String(crop.area));
  const [name, setName] = useState(crop.name);
  const [variety, setVariety] = useState(crop.type);
  const [description, setDescription] = useState(crop.description);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const isAddButtonInvalid = isAreaInvalid || !name || !variety || !description;

  useEffect(() => {
    if (isOpen) {
      setName(crop.name);
      setVariety(crop.type);
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
    setArea("1");
    setDescription("");
  };

  const handleSaveCrop = () => {
    setSaveButtonLoading(true);
    editCrop({
      token,
      id: crop.id,
      name,
      type: variety,
      area: +area,
      description,
    }).then((res: CropModel) => {
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
    });
  };

  return (
    <>
      <MenuItem icon={<FiEdit3 />} onClick={onOpen}>
        Edit
      </MenuItem>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Edit {crop.name}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter your crop's name"
                  maxLength={30}
                  value={name}
                  isInvalid={!name}
                  onChange={handleNameChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="variety">Variety</FormLabel>
                <Input
                  id="variety"
                  placeholder="Please enter blueberry variety"
                  maxLength={20}
                  value={variety}
                  isInvalid={!variety}
                  onChange={handleVarietyChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Area</FormLabel>
                <InputGroup>
                  <Input
                    type={"number"}
                    placeholder={"Type you crop's area"}
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
              isLoading={saveButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleSaveCrop}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
