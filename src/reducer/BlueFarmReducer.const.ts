export interface DjangoGetUserModel {
  id: number;
  username: string;
  email: string;
}

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
  user: DjangoGetUserModel | null;
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
    token: null,
    isAuthenticated: false,
    user: null,
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
