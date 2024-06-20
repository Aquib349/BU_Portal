// src/msalConfig.js
import { LogLevel } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "c70bf530-2957-477c-a312-17ece69fa21d",
    authority:
      "https://login.microsoftonline.com/fe8ce47a-31b8-4e8a-8f10-7f6c35471ac9",
  },
  cache: {
    // This configures where your cache will be stored
    cacheLocation: "sessionStorage",
    // Set this to true if you are having issues on IE11 or Edge
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

export { msalConfig, loginRequest };
