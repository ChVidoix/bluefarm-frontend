import React, { useReducer } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./accounts/LoginPage";
import RegisterPage from "./accounts/RegisterPage";
import NavBar from "./navBar/NavBar";
import HomePage from "./homePage/HomePage";
import { BlueFarmInitialState } from "../reducer/BlueFarmReducer.const";
import { reducer } from "../reducer/BlueFarmReducer";
import { BlueFarmContextProvider } from "../provider/BlueFarmProvider";
import PrivateRoute from "./common/PrivateRoute";

const App = () => {
  const [state, dispatch] = useReducer(reducer, BlueFarmInitialState);
  const {
    auth,
    appState: { isLoading },
  } = state;

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
