import React, { useEffect } from "react";
import Header from "./components/header/Header";
import NewRequest from "./pages/new request/NewRequest";
import RequestProvider from "./context/RequestContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ViewRequestDetail from "./pages/dashboard/view request detail/ViewRequestDetail";
import UserProvider from "./context/UserContext";
import ScrollToTop from "./components/ScrollToTop";
import RequestTypesProvider from "./context/RequestTypesContext";
import StatusProvider from "./context/StatusContext";
import UserSubscriptionProvider from "./context/UserSubscriptionContext";
import GlobalSearch from "./pages/global search/GlobalSearch";
import GlobalSearchProvider from "./context/GlobalSearchContext";
import { Toaster } from "react-hot-toast";
import EditRequestProvider from "./context/EditRequestContext";
import NewHomePage from "./pages/NewHomePage";
import Errorhandling from "./pages/error handling/Errorhandlin";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import axios from "axios";

function App() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const { accounts } = useMsal();
  console.log(accounts);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };
    async function userDetail() {
      try {
        const response = await axios.get(
          `${api}/api/accounts/${account_id}/users?userid=&office365emailid=${accounts[0].username}`,
          { headers },
        );
        // localStorage.setItem("user_detail", JSON.stringify(response.data));
        localStorage.setItem("username", response.data.UserName);
        localStorage.setItem("userType", response.data.UserType);
      } catch (error) {
        console.log(error);
      }
    }
    accounts.length > 0 ? userDetail() : "no accounts";
  }, [accounts]);

  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <Toaster />
      <ScrollToTop />
      <UserSubscriptionProvider>
        <Header />
      </UserSubscriptionProvider>
      <Outlet />
    </MsalAuthenticationTemplate>
  );
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <StatusProvider>
          <GlobalSearchProvider>
            <EditRequestProvider>
              <App />
            </EditRequestProvider>
          </GlobalSearchProvider>
        </StatusProvider>
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <RequestProvider>
            <UserSubscriptionProvider>
              <RequestTypesProvider>
                <Dashboard />
              </RequestTypesProvider>
            </UserSubscriptionProvider>
          </RequestProvider>
        ),
      },
      {
        path: "newRequest",
        element: <NewRequest />,
      },
      {
        path: "requestDetail/:RowKey",
        element: <ViewRequestDetail />,
      },
      {
        path: "globalSearch",
        element: <GlobalSearch />,
      },
      {
        path: "new",
        element: <NewHomePage />,
      },
      {
        path: "error",
        element: <Errorhandling />,
      },
    ],
  },
]);

export default Router;
