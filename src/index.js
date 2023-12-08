import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import store from "./redux/store";
import UserProvider from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <UserProvider>
        <NavBar isDashboard={false} />
        <App />
        <ToastContainer theme="colored" />
      </UserProvider>
    </BrowserRouter>
  </Provider>
);
