import Header from "./components/Header";
import NewRequest from "./pages/new request/NewRequest";
import RequestProvider from "./context/RequestContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ViewRequestDetail from "./pages/dashboard/view request detail/ViewRequestDetail";

function App() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path : 'requestDetail/:RowKey',
        element : <ViewRequestDetail/>
      }
    ],
  },
]);

export default Router