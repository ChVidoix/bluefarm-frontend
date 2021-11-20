import { Action, BlueFarmActionType } from "./BlueFarmActions.const";
import { DjangoUserModel } from "../reducer/BlueFarmReducer.const";

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

export const authenticateUser = (
  token: string,
  user: DjangoUserModel
): Action<{ token: string; user: DjangoUserModel }> => ({
  type: BlueFarmActionType.AUTHENTICATE_FAIL,
  payload: { token, user },
});

export const logoutUser = () => ({
  type: BlueFarmActionType.LOGOUT_SUCCESS,
});
