export interface DjangoGetUserModel {
  id: number;
  username: string;
  email: string;
}

export interface Auth {
  token?: String;
  isAuthenticated: boolean;
  user?: DjangoGetUserModel;
}

export interface BlueFarmAppState {
  isLoading: boolean;
  isError: boolean;
}

export interface BlueFarmState {
  auth: Auth;
  appState: BlueFarmAppState;
}

export const BlueFarmInitialState: BlueFarmState = {
  auth: {
    token: undefined,
    isAuthenticated: false,
    user: undefined,
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
