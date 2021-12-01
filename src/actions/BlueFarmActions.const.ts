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

  SET_ALL_EVENTS = "SET_ALL_EVENTS",
  SET_FILTERED_EVENTS = "SET_FILTERED_EVENTS",
  RESET_FILTERED_EVENTS = "RESET_FILTERED_EVENTS",

  SET_START_FILTERS = "SET_START_FILTERS",
  RESET_FILTERS = "RESET_FILTERS",
}

export interface DateRange {
  start: number;
  end: number;
}

export interface Action<T> {
  type: BlueFarmActionType;
  payload?: T;
}
