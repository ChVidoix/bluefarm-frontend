import { Action, BlueFarmActionType } from "./BlueFarmActions.const";
import { DjangoGetUserModel } from "../reducer/BlueFarmReducer.const";

export const getUser = (): Action<void> => ({
  type: BlueFarmActionType.LOAD_USER,
});

export const setUser = (
  user: DjangoGetUserModel
): Action<DjangoGetUserModel> => ({
  type: BlueFarmActionType.LOAD_USER_SUCCESS,
  payload: user,
});

export const getUserFail = (): Action<void> => ({
  type: BlueFarmActionType.LOAD_USER_FAIL,
});
