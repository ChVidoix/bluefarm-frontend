import axios, { AxiosResponse } from "axios";
import { DjangoUserModel } from "../reducer/BlueFarmReducer.const";
import {
  CreateCropModel,
  CropModel,
  DeleteCropModel,
  EditCropModel,
  LoginResponseModel,
  UserLoginCredentialsModel,
  UserRegisterCredentialsModel,
} from "./BlueFarm.service.const";

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
  area,
  description,
}: CreateCropModel): Promise<CropModel> => {
  const body = JSON.stringify({ name, description, type, area });
  return axios
    .post("/api/crops/", body, tokenConfig(token))
    .then((res) => res.data);
};

export const deleteCrop = ({ token, id }: DeleteCropModel) => {
  return axios.delete(`/api/crops/${id}/`, tokenConfig(token));
};

export const editCrop = ({
  token,
  id,
  name,
  type,
  area,
  description,
}: EditCropModel): Promise<CropModel> => {
  const body = JSON.stringify({ name, description, type, area });
  return axios
    .put(`/api/crops/${id}/`, body, tokenConfig(token))
    .then((res: AxiosResponse<CropModel>) => res.data);
};

export const countCropsVarietyArea = (
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
