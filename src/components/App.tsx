import React, { useEffect, useReducer } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegisterPage from "./accounts/RegisterPage";
import NavBar from "./navBar/NavBar";
import HomePage from "./homePage/HomePage";
import {
  BlueFarmInitialState,
  DjangoUserModel,
} from "../reducer/BlueFarmReducer.const";
import { reducer } from "../reducer/BlueFarmReducer";
import { BlueFarmContextProvider } from "../provider/BlueFarmProvider";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../service/BlueFarmService";
import {
  authenticateUser,
  getUser,
  getUserFail,
} from "../actions/BlueFarmActions";
import CropsPage from "./cropsPage/CropsPage";
import EventsPage from "./eventsPage/EventsPage";
import CashEventsPage from "./cashEventsPage/CashEventsPage";
import WeatherPage from "./weatherPage/WeatherPage";

const App = () => {
  const [state, dispatch] = useReducer(reducer, BlueFarmInitialState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUser());
    if (token) {
      loadUser(token)
        .then((user: DjangoUserModel) => {
          dispatch(authenticateUser({ token, user }));
        })
        .catch((error) => {
          dispatch(getUserFail());
        });
    } else {
      dispatch(getUserFail());
    }
  }, [token]);

  return (
    <BlueFarmContextProvider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path={"/home"}
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path={"/crops"}
            element={<PrivateRoute element={<CropsPage />} />}
          />
          <Route
            path={"/events"}
            element={<PrivateRoute element={<EventsPage />} />}
          />
          <Route
            path={"/cash_events"}
            element={<PrivateRoute element={<CashEventsPage />} />}
          />
          <Route
            path={"/weather"}
            element={<PrivateRoute element={<WeatherPage />} />}
          />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Routes>
      </Router>
    </BlueFarmContextProvider>
  );
};

export default App;
