import { GoDotFill } from "react-icons/go";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FcCalendar } from "react-icons/fc";

function Home() {
  return (
    <>
      <div className="Home-component">
        <div className="main w-9/12 border border-black px-14 pt-6">
          <div className="flex">
            <div>
              {/* <h1 className="text-3xl heading">Welcome to the eContracts Portal !</h1> */}
              <p className="py-4 text-[0.8rem]">
                This portal allows you to request preparation or review of
                contracts or related documents. To begin a new request, please
                click on the blue “Submit a New Request” button in the top right
                corner. You may also see your previously submitted contract
                requests under “My Requests” below.
              </p>
            </div>
            <div>
              <img
                src="https://app-otbt-econ-test.azurewebsites.net/Content/BUPortal/Images/welcome_bg.svg"
                alt="image"
                className="w-[350px]"
              />
            </div>
          </div>

          {/* Submitted contract requests */}
          <div className="requests bg-white mt-8 rounded-sm shadow">
            <div className="py-2 px-3 border-b border-slate-300">
              <h1 className="text-xl">My Requests</h1>
              <p className="text-slate-500 text-[0.8rem]">
                Your submitted contract request
              </p>
            </div>
            <div className="request-contents">
              <div className="p-3 border-b border-slate-300 flex items-center justify-between">
                <article>
                  <h1 className="hover:text-blue-500 cursor-pointer font-medium text-lg px-1">
                    Request for Usability Testing [2]
                  </h1>
                  <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                      <span className="text-xl text-blue-500">
                        <GoDotFill />
                      </span>
                      <span className="text-[0.8rem] text-slate-600">
                        Request Completed
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-xl">
                        <AiOutlineUserSwitch />
                      </span>
                      <span className="text-[0.8rem] text-slate-600">
                        Currrnt User Name
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-xl">
                        <FcCalendar />
                      </span>
                      <span className="text-[0.8rem] text-slate-600">
                        23/05/2024
                      </span>
                    </div>
                  </div>
                </article>
                <button className="flex justify-center items-center border border-slate-400 px-2 py-1 rounded-sm
                 text-[0.8rem] hover:bg-black/5">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
