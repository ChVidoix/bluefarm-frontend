import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { deleteCrop } from "../../service/BlueFarmService";
import { useContext } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { AiFillDelete, HiDotsVertical } from "react-icons/all";
import { CropOptionsProps } from "../common/components.const";
import { CropModel } from "../../service/BlueFarm.service.const";
import { EditCropDrawer } from "./EditCropDrawer";

export const CropOptions = ({ crop, crops, setCrops }: CropOptionsProps) => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(BlueFarmContext) as BlueFarmContextModel;
  const handleDelete = () => {
    deleteCrop({ token, id: crop.id }).then(() => {
      setCrops(
        crops?.filter(
          (filteredCrop: CropModel) => filteredCrop.id !== crop.id
        ) || []
      );
    });
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          variant={"ghost"}
          icon={<HiDotsVertical />}
        />
        <MenuList>
          <EditCropDrawer crop={crop} crops={crops} setCrops={setCrops} />
          <MenuItem icon={<AiFillDelete />} onClick={handleDelete}>
            Usuń
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
