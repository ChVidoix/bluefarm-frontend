export interface DjangoUserModel {
  id: number;
  username: string;
  email: string;
}

export interface Auth {
  token: string | null;
  isAuthenticated: boolean;
  user: DjangoUserModel | null;
  isLoading: boolean;
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
    isLoading: false,
  },
  appState: {
    isLoading: false,
    isError: false,
  },
};
