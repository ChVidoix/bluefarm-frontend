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
import { EventOptionsProps } from "../common/components.const";
import { EventModel } from "../../service/BlueFarm.service.const";
import { deleteEvent } from "../../service/BlueFarmService";
import { EditEventDrawer } from "./EditEventDrawer";
import { setAllEvents } from "../../actions/BlueFarmActions";

export const EventOptions = ({ event }: EventOptionsProps) => {
  const {
    state: {
      auth: { token },
      events,
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;
  const handleDelete = () => {
    deleteEvent({ token, id: event.id }).then(() => {
      dispatch(
        setAllEvents(
          events?.filter(
            (filteredEvent: EventModel) => filteredEvent.id !== event.id
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
          <EditEventDrawer event={event} />
          <MenuItem icon={<AiFillDelete />} onClick={handleDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
