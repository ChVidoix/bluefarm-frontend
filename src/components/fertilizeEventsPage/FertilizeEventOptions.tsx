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
import { FertilizeEventModel } from "../../service/BlueFarm.service.const";
import { deleteFertilizeEvent } from "../../service/BlueFarmService";
import { setFertilizeEvents } from "../../actions/BlueFarmActions";
import { EditFertilizeEventDrawer } from "./EditFertilizeEventDrawer";

export const FertilizeEventOptions = ({
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
  const handleDelete = () => {
    deleteFertilizeEvent({ token, id: eventId, cropId: selectedCrop }).then(
      () => {
        dispatch(
          setFertilizeEvents(
            fertilizeEvents?.filter(
              (filteredEvent: FertilizeEventModel) =>
                filteredEvent.id !== eventId
            ) || []
          )
        );
      }
    );
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
          <EditFertilizeEventDrawer eventId={eventId} />
          <MenuItem icon={<AiFillDelete />} onClick={handleDelete}>
            Usuń
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
