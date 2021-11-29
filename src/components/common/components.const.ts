import { CropModel } from "../../service/BlueFarm.service.const";

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

export interface HeaderProps {
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
  description: string;
}
