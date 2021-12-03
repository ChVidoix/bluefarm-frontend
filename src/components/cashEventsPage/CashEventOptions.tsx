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
import { CashEventOptionsProps } from "../common/components.const";
import { setCashEvents } from "../../actions/BlueFarmActions";
import { CashEventModel } from "../../service/BlueFarm.service.const";
import { deleteCashEvent } from "../../service/BlueFarmService";
import { EditCashEventDrawer } from "./EditCashEventDrawer";

export const CashEventOptions = ({ id }: CashEventOptionsProps) => {
  const {
    state: {
      auth: { token },
      cashEvents: { events },
    },
    dispatch,
  } = useContext(BlueFarmContext) as BlueFarmContextModel;

  const event = events?.find((event: CashEventModel) => event.id === id);

  const handleDelete = () => {
    deleteCashEvent({ token, id: event?.id }).then(() => {
      dispatch(
        setCashEvents(
          events?.filter(
            (filteredEvent: CashEventModel) => filteredEvent.id !== event?.id
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
          {event && <EditCashEventDrawer event={event} />}
          <MenuItem icon={<AiFillDelete />} onClick={handleDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
