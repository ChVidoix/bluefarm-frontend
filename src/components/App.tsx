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
  setUser,
} from "../actions/BlueFarmActions";

const App = () => {
  const [state, dispatch] = useReducer(reducer, BlueFarmInitialState);
  const {
    appState: { isLoading },
  } = state;
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
  }, []);

  return (
    <BlueFarmContextProvider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<PrivateRoute element={<HomePage />} />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Routes>
      </Router>
    </BlueFarmContextProvider>
  );
};

export default App;
