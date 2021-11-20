import axios, { AxiosResponse } from "axios";
import { DjangoUserModel } from "../reducer/BlueFarmReducer.const";
import {
  LoginResponseModel,
  UserLoginCredentialsModel,
  UserRegisterCredentialsModel,
} from "./BlueFarm.service.const";

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

export const register = ({
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

export const logout = (token: string): Promise<void> => {
  return axios.post("/api/auth/logout/", null, tokenConfig(token));
};

export const tokenConfig = (token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    Object(config).header["Authorization"] = `Token ${token}`;
  }

  return config;
};
