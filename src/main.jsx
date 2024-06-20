import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Authentication/MsalConfig.jsx";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={Router} />
    </MsalProvider>
  // </React.StrictMode>,
);
