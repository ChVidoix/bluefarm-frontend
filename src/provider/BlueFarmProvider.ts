import React from "react";
import { Action } from "../actions/BlueFarmActions.const";
import { BlueFarmState } from "../reducer/BlueFarmReducer.const";

export interface BlueFarmContextModel {
  state: BlueFarmState;
  dispatch: React.Dispatch<Action<any>>;
}

const BlueFarmContext = React.createContext<Partial<BlueFarmContextModel>>({});
const BlueFarmContextProvider = BlueFarmContext.Provider;
export { BlueFarmContext, BlueFarmContextProvider };
