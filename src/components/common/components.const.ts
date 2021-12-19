import {
  CashEventModel,
  CropModel,
  EventModel,
  FertilizeEventModel,
  HarvestModel,
  WeatherEventModel,
} from "../../service/BlueFarm.service.const";
import { As } from "@chakra-ui/react";
import React, { Dispatch } from "react";

export const eventType: { [key: string]: string } = {
  all: "Wszystkie",
  events: "Wydarzenia",
  harvests: "Zbiory",
  fertilizeEvents: "Nawożenie",
};

export const homeEventsCount = [5, 10, 15, 20];

export const notAuthenticatedLinks: { [name: string]: string } = {
  login: "Logowanie",
  register: "Rejestracja",
};

export const authenticatedLinks: { [name: string]: string } = {
  home: "Start",
  crops: "Uprawy",
  events: "Wydarzenia",
  cash_events: "Wydatki i przychody",
  weather: "Pogoda",
  harvests: "Zbiory",
  fertilize_events: "Nawożenie",
};

export enum CashEventType {
  outgoing = "wydatki",
  income = "przychody",
}

export const FiltersMap: { [key: string]: string } = {
  all: "Wszystkie nadchodzące",
  week: "Najbliższy tydzień",
  twoWeeks: "Najbliższe dwa tygodnie",
  month: "Najbliższy miesiąc",
  custom: "Według daty",
  previous: "Poprzednie",
};

export const CashFiltersMap: { [key: string]: string } = {
  all: "Wszystkie nadchodzące",
  week: "Najbliższy tydzień",
  twoWeeks: "Najbliższe dwa tygodnie",
  month: "Najbliższy miesiąc",
  previous: "Poprzednie",
  byYear: "Według lat",
};

export const FertilizeFiltersMap: { [key: string]: string } = {
  all: "Wszystkie nadchodzące",
  week: "Najbliższy tydzień",
  twoWeeks: "Najbliższe dwa tygodnie",
  month: "Najbliższy miesiąc",
  previous: "Poprzednie",
  byYear: "Według lat",
};

export const eventsColumns = [
  {
    Header: "Lp.",
    accessor: "id",
    disableSortBy: true,
  },
  {
    Header: "Nazwa",
    accessor: "name",
    width: 100,
  },
  { Header: "Rozpoczęcie", accessor: "start_date" },
  { Header: "Zakończenie", accessor: "end_date" },
  {
    Header: "Opis",
    accessor: "description",
    disableSortBy: true,
  },
];

export const cashEventsColumns = [
  { Header: "Lp.", accessor: "id", disableSortBy: true },
  {
    Header: "Nazwa",
    accessor: "name",
    width: 100,
  },
  { Header: "Kwota", accessor: "amount", isNumeric: true },
];

export const fullCashEventsColumns = [
  { Header: "Lp.", accessor: "id", disableSortBy: true },
  { Header: "Nazwa", accessor: "name" },
  { Header: "Data", accessor: "date" },
  { Header: "Kwota", accessor: "amount", isNumeric: true },
  { Header: "Opis", accessor: "description" },
];

export const fertilizeEventsColumns = [
  { Header: "Nazwa", accessor: "name" },
  { Header: "Data", accessor: "date" },
  { Header: "Kwota", accessor: "amount", isNumeric: true },
  { Header: "Opis", accessor: "description" },
  { Header: "Rodzaj", accessor: "type" },
];

export interface HeaderProps {
  as?: As;
  title: string;
}

export interface AddCropDrawerProps {
  crops: Array<CropModel> | null;
  setCrops: React.Dispatch<React.SetStateAction<Array<CropModel> | null>>;
}

export interface CropOptionsProps extends AddCropDrawerProps {
  crop: CropModel;
}

export interface DatePickerProps {
  date: string;
  time: string;
  setDate: Dispatch<React.SetStateAction<string>>;
  setTime: Dispatch<React.SetStateAction<string>>;
  min?: string;
  max?: string;
}

export interface EventOptionsProps {
  event: EventModel;
}

export interface FertilizeEventOrHarvestOptionsProps {
  eventId: number;
}

export interface EditCashEventDrawerProps {
  event: CashEventModel;
}

export interface EditWeatherEventDrawerProps {
  event: WeatherEventModel;
  isOpen: boolean;
  onClose: () => void;
}

export interface CashEventOptionsProps {
  id: number;
}

export interface FilterEvents {
  events: Array<EventModel>;
  startTimestamp: number;
  endTimestamp: number;
}

export interface FilterFertilizeEvents {
  events: Array<FertilizeEventModel> | null;
  startTimestamp: number;
  endTimestamp: number;
}

export interface FilterHarvests {
  events: Array<HarvestModel> | null;
  startTimestamp: number;
  endTimestamp: number;
}

export interface CashEventsTableProps {
  cashEvents: Array<CashEventModel> | null;
  title: string;
}

export interface CashEventsTableContentProps extends CashEventsTableProps {
  onModalOpen: () => void;
}
