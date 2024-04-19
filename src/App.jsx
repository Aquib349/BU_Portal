import Header from "./components/Header";
import RequestProvider from "./context/RequestContext";
import Dashboard from "./pages/home/Dashboard";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <div>
        <Header />
        <RequestProvider>
          {/* <Home /> */}
          <Dashboard/>
        </RequestProvider>
      </div>
    </>
  );
}

export default App;
