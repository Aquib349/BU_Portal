import Header from "./components/header/Header";
import NewRequest from "./pages/new request/NewRequest";
import RequestProvider from "./context/RequestContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ViewRequestDetail from "./pages/dashboard/view request detail/ViewRequestDetail";
import UserProvider from "./context/UserContext";
import ContractSummary from "./pages/contract-summary/ContractSummary";
import NewHomePage from "./pages/NewHomePage";
import ScrollToTop from "./components/ScrollToTop";
// import LookupField from "./form-components/lookup-field/LookupField";

function App() {
  return (
    <>
      <div>
        <ScrollToTop />
        <Header />
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
            <Dashboard />
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
        path: "contractSummary/:Rowkey",
        element: <ContractSummary />,
      },
      {
        path: "new",
        element: <NewHomePage />,
        // element: <LookupField />,
      },
    ],
  },
]);

export default Router;
