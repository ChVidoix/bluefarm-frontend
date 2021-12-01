import { Action, BlueFarmActionType } from "../actions/BlueFarmActions.const";
import { BlueFarmState } from "./BlueFarmReducer.const";

export const reducer = (
  state: BlueFarmState,
  action: Action<any>
): BlueFarmState => {
  const { type, payload } = action;
  switch (type) {
    case BlueFarmActionType.LOGOUT_LOADING:
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
    case BlueFarmActionType.LOGOUT_SUCCESS:
    case BlueFarmActionType.LOGOUT_FAIL:
    case BlueFarmActionType.LOAD_USER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        auth: {
          token: null,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        },
        appState: {
          ...state.appState,
          isLoading: false,
        },
      };
    }
    case BlueFarmActionType.AUTHENTICATE_FAIL: {
      return {
        ...state,
        auth: { ...state.auth, isLoading: false },
        appState: { isError: true, isLoading: false },
      };
    }
    case BlueFarmActionType.AUTHENTICATE_LOADING: {
      return { ...state, auth: { ...state.auth, isLoading: true } };
    }
    case BlueFarmActionType.AUTHENTICATE_SUCCESS: {
      const { user, token } = payload;
      localStorage.setItem("token", token);
      return {
        ...state,
        auth: { user, token, isAuthenticated: true, isLoading: false },
        appState: { isLoading: false, isError: false },
      };
    }
    case BlueFarmActionType.APP_STATE_LOADING: {
      return {
        ...state,
        appState: { isLoading: payload.value, isError: false },
      };
    }
    case BlueFarmActionType.SET_FILTERED_EVENTS: {
      return {
        ...state,
        filteredEvents: payload.value,
      };
    }
    case BlueFarmActionType.SET_ALL_EVENTS: {
      return {
        ...state,
        events: payload.value,
        filteredEvents: payload.value,
        filters: {
          startTimestamp: 0,
          endTimestamp: 2147483648000,
        },
      };
    }
    case BlueFarmActionType.RESET_FILTERED_EVENTS: {
      return {
        ...state,
        filteredEvents: state.events,
      };
    }
    case BlueFarmActionType.SET_START_FILTERS: {
      return {
        ...state,
        filters: { startTimestamp: payload.start, endTimestamp: payload.end },
      };
    }
    default: {
      return state;
    }
  }
};
