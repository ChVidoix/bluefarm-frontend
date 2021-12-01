import { EventModel } from "../service/BlueFarm.service.const";

export interface DjangoUserModel {
  id: number;
  username: string;
  email: string;
}

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
  user: DjangoUserModel | null;
  isLoading: boolean;
}

export interface BlueFarmAppState {
  isLoading: boolean;
  isError: boolean;
}

export interface BlueFarmState {
  auth: Auth;
  events: Array<EventModel> | null;
  filteredEvents: Array<EventModel> | null;
  filters: {
    startTimestamp: number;
    endTimestamp: number;
  };
  appState: BlueFarmAppState;
}

export const BlueFarmInitialState: BlueFarmState = {
  auth: {
    token: null,
    isAuthenticated: false,
    user: null,
    isLoading: false,
  },
  events: null,
  filteredEvents: null,
  filters: {
    startTimestamp: +new Date(),
    endTimestamp: 2147483648000,
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
