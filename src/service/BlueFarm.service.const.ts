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

export interface DeleteCropModel {
  token: string | null;
  id: number;
}

export interface EditCropModel extends CreateCropModel {
  id: number;
}
