import React, { useEffect, useReducer } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegisterPage from "./accounts/RegisterPage";
import NavBar from "./navBar/NavBar";
import HomePage from "./homePage/HomePage";
import {
  BlueFarmInitialState,
  DjangoGetUserModel,
} from "../reducer/BlueFarmReducer.const";
import { reducer } from "../reducer/BlueFarmReducer";
import { BlueFarmContextProvider } from "../provider/BlueFarmProvider";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../service/BlueFarmService";
import { getUser, setUser } from "../actions/BlueFarmActions";

const App = () => {
  const [state, dispatch] = useReducer(reducer, BlueFarmInitialState);
  const {
    auth,
    appState: { isLoading },
  } = state;

  useEffect(() => {
    dispatch(getUser());
    loadUser(auth.token)
      .then((user: DjangoGetUserModel) => {
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <BlueFarmContextProvider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path={"/"}
            element={
              <PrivateRoute
                element={<HomePage />}
                isLoading={isLoading}
                auth={auth}
              />
            }
          />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Routes>
      </Router>
    </BlueFarmContextProvider>
  );
};

export default App;
