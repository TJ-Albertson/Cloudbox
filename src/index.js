import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import config from "./config.json"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={config.domain} 
        clientId={config.clientId}
        redirectUri="http://localhost:3000/cloudbox"
        audience={config.API} 
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
