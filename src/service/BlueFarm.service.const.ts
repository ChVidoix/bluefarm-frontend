import { DjangoUserModel } from "../reducer/BlueFarmReducer.const";

export interface LoginResponseModel {
  user: DjangoUserModel;
  token: string;
}

export interface UserLoginCredentialsModel {
  username: string;
  password: string;
}

export interface UserRegisterCredentialsModel
  extends UserLoginCredentialsModel {
  email: string;
}

export interface CropModel {
  id: number;
  name: string;
  description: string;
  type: string;
  area: number;
  farmer: number;
}

export interface CreateCropModel {
  token: string | null;
  name: string;
  type: string;
  description: string;
  area: number;
}

export interface DeleteObjectModel {
  token: string | null;
  id?: number;
}

export interface DeleteFertilizeEventModel extends DeleteObjectModel {
  cropId: number;
}

export interface DeleteHarvestModel extends DeleteObjectModel {
  cropId: number;
}

export interface EditCropModel extends CreateCropModel {
  id: number;
}

export interface EventModel {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  farmer: number;
}

export interface CreateEventModel {
  token: string | null;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface CreateWeatherEventModel {
  token: string | null;
  description: string;
  date: string;
  max_temp: number;
  min_temp: number;
  rainfall: string;
}

export interface CreateFertilizeEventModel {
  token: string | null;
  cropId: number;
  name: string;
  description: string;
  date: string;
  type: string;
  amount: number;
}

export interface CreateHarvestModel {
  token: string | null;
  cropId: number;
  name: string;
  type: string;
  notes: string;
  start_date: string;
  end_date: string;
  crop_amount: number;
}

export interface EditEventModel extends CreateEventModel {
  id: number;
}

export interface EditWeatherEventModel extends CreateWeatherEventModel {
  id: number;
}

export interface EditFertilizeEventModel extends CreateFertilizeEventModel {
  fertilizeEventId: number;
}

export interface EditHarvestModel extends CreateHarvestModel {
  harvestId: number;
}

export interface HarvestModel {
  id: number;
  name: string;
  notes: string;
  type: string;
  start_date: string;
  end_date: string;
  crop_amount: number;
  crop: number;
}

export interface FertilizeEventModel {
  id: number;
  name: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  crop: number;
}

export interface CashEventModel {
  id: number;
  name: string;
  description: string;
  date: string;
  amount: number;
}

export interface WeatherEventModel {
  id: number;
  description: string;
  date: string;
  max_temp: number;
  min_temp: number;
  rainfall: string;
}

export interface CreateCashEventModel {
  token: string | null;
  name: string;
  description: string;
  date: string;
  amount: number;
}

export interface EditCashEventModel extends CreateCashEventModel {
  id: number;
}

export interface CashEventStatsParameters {
  filteredIncomes: Array<CashEventModel> | null;
  filteredOutgoings: Array<CashEventModel> | null;
}

export interface CashEventStats {
  detailed: {
    incomes: number;
    outgoings: number;
  };
  balance: number;
}
