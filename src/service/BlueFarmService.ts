import axios, { AxiosResponse } from "axios";
import { DjangoGetUserModel } from "../reducer/BlueFarmReducer.const";

export const loadUser = (token: string | null): Promise<DjangoGetUserModel> => {
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

// export const login = ({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }): Promise<AxiosResponse> => {};
