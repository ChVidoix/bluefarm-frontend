import { CropModel, EventModel } from "../../service/BlueFarm.service.const";
import { As } from "@chakra-ui/react";
import React, { Dispatch } from "react";

export const notAuthenticatedLinks: { [name: string]: string } = {
  login: "Login",
  register: "Register",
};

export const authenticatedLinks: { [name: string]: string } = {
  home: "Home",
  crops: "Crops",
  events: "Events",
  cash_events: "Billings",
  weather: "Weather",
};

export const FiltersMap: { [key: string]: string } = {
  all: "All",
  week: "Next week",
  twoWeeks: "Next two weeks",
  month: "Next month",
  custom: "Selected date",
  previous: "Previous",
};

export const eventsColumns = [
  {
    Header: "No.",
    accessor: "id",
    disableSortBy: true,
  },
  {
    Header: "Name",
    accessor: "name",
    width: 100,
  },
  { Header: "Start date", accessor: "start_date" },
  { Header: "End date", accessor: "end_date" },
  {
    Header: "Description",
    accessor: "description",
    disableSortBy: true,
  },
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

export interface ShowDescriptionProps {
  name: string;
  description: string;
}

export interface AddEventDrawerProps {
  events: Array<EventModel> | null;
  setEvents: React.Dispatch<React.SetStateAction<Array<EventModel> | null>>;
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

export interface EventsFilterProps {
  events: Array<EventModel> | null;
  setEvents: React.Dispatch<React.SetStateAction<Array<EventModel> | null>>;
}

export interface FilterEvents {
  events: Array<EventModel>;
  startTimestamp: number;
  endTimestamp: number;
}
