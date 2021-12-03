import { CashEventModel, EventModel } from "../service/BlueFarm.service.const";

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

export interface CashEventsFilters {
  startTimestamp: number;
  endTimestamp: number;
  minAmount: number;
  maxAmount: number;
}

export interface FilterCashEventsParameters extends CashEventsFilters {
  events: Array<CashEventModel> | null;
}

export interface BlueFarmState {
  auth: Auth;
  events: Array<EventModel> | null;
  filteredEvents: Array<EventModel> | null;
  filters: {
    startTimestamp: number;
    endTimestamp: number;
  };
  cashEvents: {
    events: Array<CashEventModel> | null;
    filteredOutgoings: Array<CashEventModel> | null;
    filteredIncomes: Array<CashEventModel> | null;
    filters: CashEventsFilters;
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
  cashEvents: {
    events: null,
    filteredOutgoings: null,
    filteredIncomes: null,
    filters: {
      startTimestamp: 0,
      endTimestamp: 2147483648000,
      minAmount: 0,
      maxAmount: 0,
    },
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
