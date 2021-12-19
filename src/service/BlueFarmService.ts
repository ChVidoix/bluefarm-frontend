import axios, { AxiosResponse } from "axios";
import {
  DjangoUserModel,
  FilterCashEventsParameters,
} from "../reducer/BlueFarmReducer.const";
import {
  CashEventModel,
  CashEventStats,
  CashEventStatsParameters,
  CreateCashEventModel,
  CreateCropModel,
  CreateEventModel,
  CreateFertilizeEventModel,
  CreateHarvestModel,
  CreateWeatherEventModel,
  CropModel,
  DeleteFertilizeEventModel,
  DeleteHarvestModel,
  DeleteObjectModel,
  EditCashEventModel,
  EditCropModel,
  EditEventModel,
  EditFertilizeEventModel,
  EditHarvestModel,
  EditWeatherEventModel,
  EventModel,
  FertilizeEventModel,
  HarvestModel,
  LoginResponseModel,
  UserLoginCredentialsModel,
  UserRegisterCredentialsModel,
  WeatherEventModel,
} from "./BlueFarm.service.const";
import {
  FilterEvents,
  FilterFertilizeEvents,
  FilterHarvests,
} from "../components/common/components.const";
import { format, formatDuration, intervalToDuration } from "date-fns";

const tokenConfig = (token: string | null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    Object(config.headers)["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const loadUser = (token: string | null): Promise<DjangoUserModel> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    Object(config.headers)["Authorization"] = `Token ${token}`;
  }

  return axios.get("/api/auth/user", config).then((res: AxiosResponse) => {
    return res.data;
  });
};

export const loginUser = ({
  username,
  password,
}: UserLoginCredentialsModel): Promise<LoginResponseModel> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  return axios
    .post("/api/auth/login", body, config)
    .then((res: AxiosResponse<LoginResponseModel>) => {
      return res.data;
    });
};

export const registerUser = ({
  username,
  password,
  email,
}: UserRegisterCredentialsModel): Promise<LoginResponseModel> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  return axios
    .post("/api/auth/register", body, config)
    .then((res: AxiosResponse<LoginResponseModel>) => {
      return res.data;
    });
};

export const logoutUser = (token: string): Promise<void> => {
  return axios.post("/api/auth/logout/", null, tokenConfig(token));
};

export const getCrops = (token: string | null): Promise<Array<CropModel>> => {
  return axios
    .get("/api/crops/", tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const createCrop = ({
  token,
  name,
  type,
  variety,
  area,
  description,
}: CreateCropModel): Promise<CropModel> => {
  const body = JSON.stringify({ name, description, type, variety, area });
  return axios
    .post("/api/crops/", body, tokenConfig(token))
    .then((res) => res.data);
};

export const deleteCrop = ({ token, id }: DeleteObjectModel) => {
  return axios.delete(`/api/crops/${id}/`, tokenConfig(token));
};

export const editCrop = ({
  token,
  id,
  name,
  type,
  variety,
  area,
  description,
}: EditCropModel): Promise<CropModel> => {
  const body = JSON.stringify({ name, description, variety, type, area });
  return axios
    .put(`/api/crops/${id}/`, body, tokenConfig(token))
    .then((res: AxiosResponse<CropModel>) => res.data);
};

export const countCropsTypeArea = (
  crops: Array<CropModel> | null
): { [key: string]: number } | undefined => {
  return crops?.reduce(
    (acc: { [key: string]: number }, currentCrop: CropModel) => {
      return {
        ...acc,
        [currentCrop.type]:
          acc[currentCrop.type] + currentCrop.area || currentCrop.area,
      };
    },
    {}
  );
};

export const getEvents = (token: string | null): Promise<Array<EventModel>> => {
  return axios
    .get("/api/events/", tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const createEvent = ({
  token,
  name,
  description,
  start_date,
  end_date,
}: CreateEventModel): Promise<EventModel> => {
  const body = JSON.stringify({ name, description, start_date, end_date });
  return axios
    .post("/api/events/", body, tokenConfig(token))
    .then((res: AxiosResponse<EventModel>) => res.data);
};

export const editEvent = ({
  token,
  id,
  name,
  description,
  end_date,
  start_date,
}: EditEventModel): Promise<EventModel> => {
  const body = JSON.stringify({ name, description, start_date, end_date });
  return axios
    .put(`/api/events/${id}/`, body, tokenConfig(token))
    .then((res: AxiosResponse<EventModel>) => res.data);
};

export const deleteEvent = ({ token, id }: DeleteObjectModel) => {
  return axios.delete(`/api/events/${id}/`, tokenConfig(token));
};

export const getCashEvents = (
  token: string | null
): Promise<Array<CashEventModel>> => {
  return axios
    .get("/api/cash_events/", tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const createCashEvent = ({
  token,
  name,
  description,
  date,
  amount,
}: CreateCashEventModel): Promise<CashEventModel> => {
  const body = JSON.stringify({ name, description, date, amount });
  return axios
    .post("/api/cash_events/", body, tokenConfig(token))
    .then((res: AxiosResponse<CashEventModel>) => res.data);
};

export const editCashEvent = ({
  token,
  id,
  name,
  description,
  date,
  amount,
}: EditCashEventModel): Promise<CashEventModel> => {
  const body = JSON.stringify({ name, description, date, amount });
  return axios
    .put(`/api/cash_events/${id}/`, body, tokenConfig(token))
    .then((res: AxiosResponse<CashEventModel>) => res.data);
};

export const parseJSDateToDjango = (date: string, time: string): string => {
  // required date format by django is 2021-11-28T12:00:00Z
  return `${date}T${time}:00Z`;
};

export const filterEvents = ({
  events,
  startTimestamp,
  endTimestamp,
}: FilterEvents): Array<EventModel> => {
  const resultEvents: Array<EventModel> = [];
  events.forEach((event: EventModel) => {
    if (
      Date.parse(event.start_date) > startTimestamp &&
      Date.parse(event.start_date) < endTimestamp
    ) {
      resultEvents.push(event);
    }
  });
  return resultEvents;
};

export const divideCashEvents = (
  cashEvents: Array<CashEventModel> | null
): {
  filteredIncomes: Array<CashEventModel>;
  filteredOutgoings: Array<CashEventModel>;
} => {
  const resultOutgoings: Array<CashEventModel> = [];
  const resultIncomes: Array<CashEventModel> = [];

  if (cashEvents) {
    cashEvents.forEach((event: CashEventModel) => {
      if (event.amount > 0) {
        resultIncomes.push(event);
      } else {
        resultOutgoings.push(event);
      }
    });
  }

  return { filteredIncomes: resultIncomes, filteredOutgoings: resultOutgoings };
};

export const deleteCashEvent = ({ token, id }: DeleteObjectModel) => {
  return axios.delete(`/api/cash_events/${id}/`, tokenConfig(token));
};

export const getCashEventsStats = ({
  filteredIncomes,
  filteredOutgoings,
}: CashEventStatsParameters): CashEventStats => {
  const incomes =
    filteredIncomes?.reduce(
      (acc: number, curr: CashEventModel) => acc + curr.amount,
      0
    ) || 0;
  const outgoings =
    filteredOutgoings?.reduce(
      (acc: number, curr: CashEventModel) => acc + curr.amount,
      0
    ) || 0;
  return { detailed: { incomes, outgoings }, balance: incomes + outgoings };
};

export const filterCashEvents = ({
  events,
  startTimestamp,
  endTimestamp,
  minAmount,
  maxAmount,
}: FilterCashEventsParameters): Array<CashEventModel> => {
  const resultCashEvents: Array<CashEventModel> = [];
  if (events) {
    events.forEach((event: CashEventModel) => {
      if (
        event.amount < maxAmount &&
        event.amount > minAmount &&
        Date.parse(event.date) > startTimestamp &&
        Date.parse(event.date) < endTimestamp
      ) {
        resultCashEvents.push(event);
      }
    });
  }

  return resultCashEvents;
};

export const getCashEventsYears = (
  events: Array<CashEventModel> | null
): Array<string> => {
  const resultYears: Array<string> = [];

  events?.forEach((event: CashEventModel) => {
    const year = event.date.slice(0, 4);
    if (!resultYears.includes(year)) {
      resultYears.push(year);
    }
  });

  return resultYears;
};

export const getFertilizeEventsYears = (
  events: Array<FertilizeEventModel> | null
) => {
  const resultYears: Array<string> = [];

  events?.forEach((event: FertilizeEventModel) => {
    const year = event.date.slice(0, 4);
    if (!resultYears.includes(year)) {
      resultYears.push(year);
    }
  });

  return resultYears;
};

export const getHarvestsYears = (events: Array<HarvestModel> | null) => {
  const resultYears: Array<string> = [];

  events?.forEach((harvest: HarvestModel) => {
    const year = harvest.start_date.slice(0, 4);
    if (!resultYears.includes(year)) {
      resultYears.push(year);
    }
  });

  return resultYears;
};

export const getFertilizationEvents = (
  token: string | null,
  cropId: number
): Promise<Array<FertilizeEventModel>> => {
  return axios
    .get(`/api/crops/${cropId}/fertilize_events/`, tokenConfig(token))
    .then((res: AxiosResponse<Array<FertilizeEventModel>>) => res.data);
};

export const getHarvests = (
  token: string | null,
  cropId: number
): Promise<Array<HarvestModel>> => {
  return axios
    .get(`/api/crops/${cropId}/harvests/`, tokenConfig(token))
    .then((res: AxiosResponse<Array<HarvestModel>>) => res.data);
};

export const getAllHarvests = (
  token: string | null
): Promise<Array<HarvestModel>> =>
  axios
    .get("/api/harvests/", tokenConfig(token))
    .then((res: AxiosResponse<Array<HarvestModel>>) => res.data);

export const getAllFertilizeEvents = (
  token: string | null
): Promise<Array<FertilizeEventModel>> =>
  axios
    .get("/api/fertilize_events/", tokenConfig(token))
    .then((res: AxiosResponse<Array<FertilizeEventModel>>) => res.data);

export const createFertilizeEvent = ({
  token,
  cropId,
  name,
  description,
  date,
  amount,
  type,
}: CreateFertilizeEventModel): Promise<FertilizeEventModel> => {
  const body = JSON.stringify({ name, description, date, amount, type });
  return axios
    .post(`/api/crops/${cropId}/fertilize_events/`, body, tokenConfig(token))
    .then((res: AxiosResponse<FertilizeEventModel>) => res.data);
};

export const editFertilizeEvent = ({
  token,
  amount,
  type,
  fertilizeEventId,
  description,
  date,
  name,
  cropId,
}: EditFertilizeEventModel): Promise<FertilizeEventModel> => {
  const body = JSON.stringify({ name, description, amount, date, type });
  return axios
    .put(
      `/api/crops/${cropId}/fertilize_events/${fertilizeEventId}/`,
      body,
      tokenConfig(token)
    )
    .then((res: AxiosResponse<FertilizeEventModel>) => res.data);
};

export const deleteFertilizeEvent = ({
  token,
  id,
  cropId,
}: DeleteFertilizeEventModel) => {
  return axios.delete(
    `/api/crops/${cropId}/fertilize_events/${id}/`,
    tokenConfig(token)
  );
};

export const deleteHarvest = ({ token, id, cropId }: DeleteHarvestModel) => {
  return axios.delete(
    `/api/crops/${cropId}/harvests/${id}/`,
    tokenConfig(token)
  );
};

export const createHarvest = ({
  token,
  cropId,
  name,
  end_date,
  start_date,
  notes,
  crop_amount,
}: CreateHarvestModel): Promise<HarvestModel> => {
  const body = JSON.stringify({
    name,
    notes,
    start_date,
    end_date,
    crop_amount,
  });
  return axios
    .post(`/api/crops/${cropId}/harvests/`, body, tokenConfig(token))
    .then((res: AxiosResponse<HarvestModel>) => res.data);
};

export const editHarvest = ({
  token,
  name,
  cropId,
  crop_amount,
  harvestId,
  end_date,
  start_date,
  notes,
}: EditHarvestModel): Promise<HarvestModel> => {
  const body = JSON.stringify({
    name,
    crop_amount,
    start_date,
    end_date,
    notes,
  });
  return axios
    .put(
      `/api/crops/${cropId}/harvests/${harvestId}/`,
      body,
      tokenConfig(token)
    )
    .then((res: AxiosResponse<HarvestModel>) => res.data);
};

export const filterFertilizeEvents = ({
  events,
  startTimestamp,
  endTimestamp,
}: FilterFertilizeEvents): Array<FertilizeEventModel> => {
  const resultEvents: Array<FertilizeEventModel> = [];
  events?.forEach((event: FertilizeEventModel) => {
    if (
      Date.parse(event.date) > startTimestamp &&
      Date.parse(event.date) < endTimestamp
    ) {
      resultEvents.push(event);
    }
  });
  return resultEvents;
};

export const filterHarvests = ({
  events,
  startTimestamp,
  endTimestamp,
}: FilterHarvests): Array<HarvestModel> => {
  const resultEvents: Array<HarvestModel> = [];
  events?.forEach((event: HarvestModel) => {
    if (
      Date.parse(event.start_date) > startTimestamp &&
      Date.parse(event.start_date) < endTimestamp
    ) {
      resultEvents.push(event);
    }
  });
  return resultEvents;
};

export const formatDate = (date: string): string => {
  const time = date.slice(11, 16);
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${time} ${day}.${month}.${year}`;
};

export const formatOnlyDate = (date: string): string => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${day}.${month}.${year}`;
};

export const getNearestFertilizeEvent = (
  fertilizeEvents: Array<FertilizeEventModel> | null
): FertilizeEventModel | null => {
  let nearestEventTimestampDifference = 2147483648000;
  let nearestEvent: FertilizeEventModel = {
    id: 0,
    date: "",
    name: "",
    description: "",
    amount: 0,
    crop: 0,
    type: "",
  };
  fertilizeEvents?.forEach((event: FertilizeEventModel) => {
    const differenceTimestamp = +new Date(event.date) - +new Date();
    if (
      differenceTimestamp < nearestEventTimestampDifference &&
      differenceTimestamp > 0
    ) {
      nearestEventTimestampDifference = differenceTimestamp;
      nearestEvent = event;
    }
  });
  return nearestEvent.name ? nearestEvent : null;
};

export const formatHarvestsDuration = (text: string): string =>
  text.replace("days", "dni").replace("hours", "godzin");

export const getHarvestsDuration = (
  harvests: Array<HarvestModel> | null
): string => {
  let start = 2147483648000;
  let end = 0;

  if (!harvests) {
    return "-";
  }

  harvests?.forEach((harvest: HarvestModel) => {
    if (+new Date(harvest.start_date) < start) {
      start = +new Date(harvest.start_date);
    }
    if (+new Date(harvest.end_date) > end) {
      end = +new Date(harvest.end_date);
    }
  });

  const duration = intervalToDuration({ start, end });
  const formattedDurationDays = formatDuration(duration, { format: ["days"] });
  const formattedDurationHours = formatDuration(duration, {
    format: ["hours"],
  });
  return formattedDurationDays || formattedDurationHours;
};

export const getMostFruitfulHarvest = (
  filteredHarvests: Array<HarvestModel> | null
): HarvestModel => {
  let result: HarvestModel | any = {};
  filteredHarvests?.forEach((harvest: HarvestModel) => {
    if (harvest.crop_amount > result.crop_amount || !result.crop_amount) {
      result = harvest;
    }
  });

  return result;
};

export const sortEvents = (events: Array<any>): Array<any> => {
  return events
    .sort((a: any, b: any) => {
      const startDateA = a.start_date || a.date;
      const startDateB = b.start_date || b.date;
      return +new Date(startDateA) - +new Date(startDateB);
    })
    .filter(
      (event: any) =>
        (+new Date(event.start_date) || +new Date(event.date)) > +new Date()
    );
};

export const getSortedAllUpcomingEvents = (
  events: Array<EventModel>,
  fertilizeEvents: Array<FertilizeEventModel>,
  harvests: Array<HarvestModel>
): Array<any> => {
  const allEvents: any = [...events, ...fertilizeEvents, ...harvests];

  sortEvents(allEvents).forEach((event: any) => {
    const keys = Object.keys(event);
    if (keys.includes("notes")) {
      event["event_type"] = "zbiór";
    } else if (keys.includes("amount")) {
      event["event_type"] = "nawożenie";
    } else if (keys.includes("start_date")) {
      event["event_type"] = "wydarzenie";
    }
  });

  return allEvents.filter(
    (event: any) =>
      (+new Date(event.start_date) || +new Date(event.date)) > +new Date()
  );
};

export const getWeatherEvents = (
  token: string | null
): Promise<Array<WeatherEventModel>> => {
  return axios
    .get("/api/weather_days/", tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const createWeatherEvent = ({
  token,
  max_temp,
  min_temp,
  description,
  date,
  rainfall,
}: CreateWeatherEventModel): Promise<WeatherEventModel> => {
  const body = JSON.stringify({
    description,
    date,
    max_temp,
    min_temp,
    rainfall,
  });
  return axios
    .post("/api/weather_days/", body, tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const editWeatherEvent = ({
  token,
  id,
  max_temp,
  min_temp,
  description,
  date,
  rainfall,
}: EditWeatherEventModel): Promise<WeatherEventModel> => {
  const body = JSON.stringify({
    description,
    date,
    max_temp,
    min_temp,
    rainfall,
  });
  return axios
    .put(`/api/weather_days/${id}/`, body, tokenConfig(token))
    .then((res: AxiosResponse) => res.data);
};

export const getWeatherEventsToRender = (
  weatherEvents: Array<WeatherEventModel> | null,
  startTimestamp: number
): Array<WeatherEventModel | string> => {
  const result: Array<WeatherEventModel | string> = [];
  for (let i = 0; i < 7; ++i) {
    const startDate = new Date(startTimestamp + i * 1000 * 60 * 60 * 24);
    result.push(
      weatherEvents?.find(
        (event: WeatherEventModel) =>
          event.date === format(startDate, "yyyy-MM-dd")
      ) || format(startDate, "yyyy-MM-dd")
    );
  }

  return result;
};

export const filterWeatherEvents = (
  weatherEvents: Array<WeatherEventModel> | null,
  startTimestamp: number
): Array<WeatherEventModel> => {
  const result: Array<WeatherEventModel> = [];
  weatherEvents?.forEach((event: WeatherEventModel) => {
    if (
      +new Date(event.date) >= startTimestamp &&
      +new Date(event.date) < startTimestamp + 7 * 24 * 60 * 60 * 1000
    ) {
      result.push(event);
    }
  });

  return result;
};
