import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    {/* <AuthProvider> */}
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <BrowserRouter> */}
        <App />
        <ToastContainer />
      {/* </BrowserRouter> */}
    {/* </AuthProvider> */}
    {/* </QueryClientProvider> */}
  </SearchProvider>
);
