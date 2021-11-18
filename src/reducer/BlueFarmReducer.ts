import { Action, BlueFarmActionType } from "../actions/BlueFarmActions.const";
import { BlueFarmState } from "./BlueFarmReducer.const";

export const reducer = (
  state: BlueFarmState,
  action: Action<any>
): BlueFarmState => {
  const { type, payload } = action;
  switch (type) {
    case BlueFarmActionType.LOAD_USER: {
      return {
        ...state,
        appState: {
          isLoading: true,
          isError: false,
        },
      };
    }
    case BlueFarmActionType.LOAD_USER_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          user: payload,
        },
        appState: {
          isLoading: false,
          isError: false,
        },
      };
    }
    case BlueFarmActionType.LOAD_USER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        auth: {
          token: null,
          isAuthenticated: false,
          user: null,
        },
        appState: {
          isLoading: false,
          isError: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
