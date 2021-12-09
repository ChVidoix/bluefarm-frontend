import { Action, BlueFarmActionType, DateRange } from "./BlueFarmActions.const";
import {
  CashEventsFilters,
  DjangoUserModel,
} from "../reducer/BlueFarmReducer.const";
import {
  CashEventModel,
  EventModel,
  FertilizeEventModel,
  HarvestModel,
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

export const setCashEvents = (
  events: Array<CashEventModel>
): Action<{ events: Array<CashEventModel> }> => ({
  type: BlueFarmActionType.SET_CASH_EVENTS,
  payload: { events },
});

export const setCashEventsFilters = (
  filters: CashEventsFilters
): Action<{ filters: CashEventsFilters }> => ({
  type: BlueFarmActionType.SET_CASH_EVENTS_FILTERS,
  payload: { filters },
});

export const setFilteredCashEvents = (
  events: Array<CashEventModel> | null
): Action<{ events: Array<CashEventModel> | null }> => ({
  type: BlueFarmActionType.SET_DIVIDED_CASH_EVENTS,
  payload: { events },
});

export const setFertilizeEvents = (
  events: Array<FertilizeEventModel>
): Action<{ events: Array<FertilizeEventModel> }> => ({
  type: BlueFarmActionType.SET_FERTILIZE_EVENTS,
  payload: { events },
});

export const setFertilizeEventsFilters = (
  startTimestamp: number,
  endTimestamp: number
): Action<{ startTimestamp: number; endTimestamp: number }> => ({
  type: BlueFarmActionType.SET_FERTILIZE_EVENTS_FILTERS,
  payload: { startTimestamp, endTimestamp },
});

export const setFilteredFertilizeEvents = (
  events: Array<FertilizeEventModel> | null
): Action<{ events: Array<FertilizeEventModel> | null }> => ({
  type: BlueFarmActionType.SET_FILTERED_FERTILIZE_EVENTS,
  payload: { events },
});

export const setSelectedCrop = (id: number): Action<{ id: number }> => ({
  type: BlueFarmActionType.SET_SELECTED_CROP,
  payload: { id },
});

export const setHarvests = (
  events: Array<HarvestModel>
): Action<{ events: Array<HarvestModel> }> => ({
  type: BlueFarmActionType.SET_HARVESTS,
  payload: { events },
});

export const setHarvestsFilters = (
  startTimestamp: number,
  endTimestamp: number
): Action<{ startTimestamp: number; endTimestamp: number }> => ({
  type: BlueFarmActionType.SET_HARVESTS_FILTERS,
  payload: { startTimestamp, endTimestamp },
});

export const setFilteredHarvests = (
  events: Array<HarvestModel> | null
): Action<{ events: Array<HarvestModel> | null }> => ({
  type: BlueFarmActionType.SET_FILTERED_HARVESTS,
  payload: { events },
});
