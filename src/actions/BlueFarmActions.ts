import { Action, BlueFarmActionType, DateRange } from "./BlueFarmActions.const";
import { DjangoUserModel } from "../reducer/BlueFarmReducer.const";
import {
  EventModel,
  LoginResponseModel,
} from "../service/BlueFarm.service.const";

export const getUser = (): Action<void> => ({
  type: BlueFarmActionType.LOAD_USER,
});

export const setUser = (user: DjangoUserModel): Action<DjangoUserModel> => ({
  type: BlueFarmActionType.LOAD_USER_SUCCESS,
  payload: user,
});

export const getUserFail = (): Action<void> => ({
  type: BlueFarmActionType.LOAD_USER_FAIL,
});

export const authenticateUserLoading = () => ({
  type: BlueFarmActionType.AUTHENTICATE_LOADING,
});

export const authenticateUser = ({
  token,
  user,
}: LoginResponseModel): Action<LoginResponseModel> => ({
  type: BlueFarmActionType.AUTHENTICATE_SUCCESS,
  payload: { token, user },
});

export const authenticateUserFail = () => ({
  type: BlueFarmActionType.AUTHENTICATE_FAIL,
});

export const logoutUserAction = () => ({
  type: BlueFarmActionType.LOGOUT_SUCCESS,
});

export const logoutUserLoading = () => ({
  type: BlueFarmActionType.LOGOUT_LOADING,
});

export const logoutFail = () => ({
  type: BlueFarmActionType.LOGOUT_FAIL,
});

export const setAppStateLoading = (
  value: boolean
): Action<{ value: boolean }> => ({
  type: BlueFarmActionType.APP_STATE_LOADING,
  payload: { value },
});

export const setAllEvents = (
  value: Array<EventModel>
): Action<{ value: Array<EventModel> }> => ({
  type: BlueFarmActionType.SET_ALL_EVENTS,
  payload: { value },
});

export const setFilteredEvents = (
  value: Array<EventModel>
): Action<{ value: Array<EventModel> }> => ({
  type: BlueFarmActionType.SET_FILTERED_EVENTS,
  payload: { value },
});

export const resetEventsFilters = () => ({
  type: BlueFarmActionType.RESET_FILTERED_EVENTS,
});

export const setFilters = ({ start, end }: DateRange): Action<DateRange> => ({
  type: BlueFarmActionType.SET_START_FILTERS,
  payload: { start, end },
});

export const resetFilters = (): Action<void> => ({
  type: BlueFarmActionType.RESET_FILTERS,
});
