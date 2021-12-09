import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  BlueFarmContext,
  BlueFarmContextModel,
} from "../../provider/BlueFarmProvider";
import { AiFillDelete, HiDotsVertical } from "react-icons/all";
import { FertilizeEventOrHarvestOptionsProps } from "../common/components.const";
import { HarvestModel } from "../../service/BlueFarm.service.const";
import { deleteHarvest } from "../../service/BlueFarmService";
import { setHarvests } from "../../actions/BlueFarmActions";
import { EditHarvestDrawer } from "./EditHarvestDrawer";

export const HarvestOptions = ({
  eventId,
}: FertilizeEventOrHarvestOptionsProps) => {
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
  const handleDelete = () => {
    deleteHarvest({ token, id: eventId, cropId: selectedCrop }).then(() => {
      dispatch(
        setHarvests(
          harvestsEvents?.filter(
            (filteredHarvest: HarvestModel) => filteredHarvest.id !== eventId
          ) || []
        )
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
          <EditHarvestDrawer eventId={eventId} />
          <MenuItem icon={<AiFillDelete />} onClick={handleDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
