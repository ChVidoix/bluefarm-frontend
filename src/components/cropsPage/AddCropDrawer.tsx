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
import { createCrop } from "../../service/BlueFarmService";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { CropModel } from "../../service/BlueFarm.service.const";
import { AddCropDrawerProps } from "../common/components.const";

export const AddCropDrawer = ({ crops, setCrops }: AddCropDrawerProps) => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAreaInvalid, setIsAreaInvalid] = useState(false);
  const [area, setArea] = useState("1");
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [description, setDescription] = useState("");
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const isAddButtonInvalid = isAreaInvalid || !name || !variety || !description;

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

  const handleCreateCrop = () => {
    setAddButtonLoading(true);
    createCrop({ token, name, type: variety, area: +area, description }).then(
      (res: CropModel) => {
        if (crops) {
          setCrops([...crops, res]);
        } else {
          setCrops([res]);
        }
        clearInputs();
        setAddButtonLoading(false);
      }
    );
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Add crop
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearInputs} />
          <DrawerHeader borderBottomWidth="2px">Add a new crop</DrawerHeader>

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
              isLoading={addButtonLoading}
              disabled={isAddButtonInvalid}
              onClick={handleCreateCrop}
            >
              Add crop
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
