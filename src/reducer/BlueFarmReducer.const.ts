import {
  CashEventModel,
  EventModel,
  FertilizeEventModel,
  HarvestModel,
  WeatherEventModel,
} from "../service/BlueFarm.service.const";

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
  crops: {
    selectedCrop: number;
    fertilization: {
      fertilizeEvents: Array<FertilizeEventModel> | null;
      filteredFertilizeEvents: Array<FertilizeEventModel> | null;
      filters: {
        startTimestamp: number;
        endTimestamp: number;
      };
    };
    harvests: {
      harvestsEvents: Array<HarvestModel> | null;
      filteredHarvestsEvents: Array<HarvestModel> | null;
      filters: {
        startTimestamp: number;
        endTimestamp: number;
      };
    };
  };
  weather: {
    weatherEvents: Array<WeatherEventModel> | null;
    filteredWeatherEvents: Array<WeatherEventModel> | null;
    filters: {
      startTimestamp: number;
    };
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
  crops: {
    selectedCrop: 0,
    fertilization: {
      fertilizeEvents: null,
      filteredFertilizeEvents: null,
      filters: {
        startTimestamp: +new Date(),
        endTimestamp: +new Date(`${new Date().getFullYear()}-12-31`),
      },
    },
    harvests: {
      harvestsEvents: null,
      filteredHarvestsEvents: null,
      filters: {
        startTimestamp: +new Date(),
        endTimestamp: +new Date(`${new Date().getFullYear()}-12-31`),
      },
    },
  },
  weather: {
    weatherEvents: null,
    filteredWeatherEvents: null,
    filters: {
      startTimestamp: +new Date() - 7 * 1000 * 60 * 60 * 24,
    },
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
