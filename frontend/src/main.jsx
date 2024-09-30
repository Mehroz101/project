import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <App />
    <ToastContainer />
  </SearchProvider>
);
