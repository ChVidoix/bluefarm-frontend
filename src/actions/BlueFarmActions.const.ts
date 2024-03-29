export enum BlueFarmActionType {
  LOAD_USER = "LOAD_USER",
  LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
  LOAD_USER_FAIL = "LOAD_USER_FAIL",

  AUTHENTICATE_LOADING = "AUTHENTICATE_LOADING",
  AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS",
  AUTHENTICATE_FAIL = "AUTHENTICATE_FAIL",
  LOGOUT_LOADING = "LOGOUT_LOADING",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAIL = "LOGOUT_FAIL",

  APP_STATE_LOADING = "APP_STATE_LOADING",
  APP_STATE_ERROR = "APP_STATE_ERROR",

  SET_ALL_EVENTS = "SET_ALL_EVENTS",
  SET_FILTERED_EVENTS = "SET_FILTERED_EVENTS",
  RESET_FILTERED_EVENTS = "RESET_FILTERED_EVENTS",

  SET_START_FILTERS = "SET_START_FILTERS",
  RESET_FILTERS = "RESET_FILTERS",

  SET_CASH_EVENTS = "SET_CASH_EVENTS",
  SET_DIVIDED_CASH_EVENTS = "SET_DIVIDED_CASH_EVENTS",
  SET_CASH_EVENTS_FILTERS = "SET_CASH_EVENTS_FILTERS",

  SET_SELECTED_CROP = "SET_SELECTED_CROP",

  SET_FERTILIZE_EVENTS = "SET_FERTILIZE_EVENTS",
  SET_FILTERED_FERTILIZE_EVENTS = "SET_FILTERED_FERTILIZE_EVENTS",
  SET_FERTILIZE_EVENTS_FILTERS = "SET_FERTILIZE_EVENTS_FILTERS",

  SET_HARVESTS = "SET_HARVESTS",
  SET_FILTERED_HARVESTS = "SET_FILTERED_HARVESTS",
  SET_HARVESTS_FILTERS = "SET_HARVESTS_FILTERS",

  SET_WEATHER_EVENTS = "SET_WEATHER_EVENTS",
  SET_FILTERED_WEATHER_EVENTS = "SET_FILTERED_WEATHER_EVENTS",
  SET_WEATHER_EVENTS_FILTERS = "SET_WEATHER_EVENTS_FILTERS",
}

export interface DateRange {
  start: number;
  end: number;
}

export interface Action<T> {
  type: BlueFarmActionType;
  payload?: T;
}
