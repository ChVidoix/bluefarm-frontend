export enum BlueFarmActionType {
  LOAD_USER = "LOAD_USER",
  LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
  LOAD_USER_FAIL = "LOAD_USER_SUCCESS",

  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
}

export interface Action<T> {
  type: BlueFarmActionType;
  payload?: T;
}