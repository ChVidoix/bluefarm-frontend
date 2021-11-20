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
