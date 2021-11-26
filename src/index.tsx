import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import theme from "./styles/theme";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
