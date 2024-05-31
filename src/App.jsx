import Header from "./components/header/Header";
import NewRequest from "./pages/new request/NewRequest";
import RequestProvider from "./context/RequestContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ViewRequestDetail from "./pages/dashboard/view request detail/ViewRequestDetail";
import UserProvider from "./context/UserContext";
import NewHomePage from "./pages/NewHomePage";
import ScrollToTop from "./components/ScrollToTop";
import RequestTypesProvider from "./context/RequestTypesContext";
import StatusProvider from "./context/StatusContext";
import UserSubscriptionProvider from "./context/UserSubscriptionContext";

function App() {
  return (
    <>
      <div>
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
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <RequestProvider>
            <UserSubscriptionProvider>
              <RequestTypesProvider>
                <StatusProvider>
                  <Dashboard />
                </StatusProvider>
              </RequestTypesProvider>
            </UserSubscriptionProvider>
          </RequestProvider>
        ),
      },
      {
        path: "newRequest",
        element: (
          <StatusProvider>
            <NewRequest />,
          </StatusProvider>
        ),
      },
      {
        path: "requestDetail/:RowKey",
        element: <ViewRequestDetail />,
      },
      {
        path: "new",
        element: <NewHomePage />,
      },
    ],
  },
]);

export default Router;
