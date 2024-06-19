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

function App() {
  return (
    <>
      <div>
        <Toaster />
        <ScrollToTop />
        <UserSubscriptionProvider>
          <Header />
        </UserSubscriptionProvider>
        <Outlet />
      </div>
    </>
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
