import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Datepicker from "../../../form-components/DatePicker";

function FilterRequests() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="relative inline-block text-left">
        <div className="text-3xl text-blue-600 font-bold">
          <CiFilter
            className="border border-slate-400 rounded-md p-1 cursor-pointer bg-gray-50"
            onClick={() => setShow(!show)}
          />
        </div>

        <div
          className={`absolute border right-0 z-10 mt-2 pb-2 w-80 rounded-md bg-gray-800 ${
            show ? "static" : "hidden"
          }`}
        >
          <div className="py-1 px-2">
            <form>
              <div className="flex flex-col">
                <label
                  htmlFor="request_status"
                  className="text-sm font-nedium my-1 text-white"
                >
                  Request Status
                </label>
                <input
                  list="request"
                  name="request-status"
                  placeholder="Request Status"
                  className="border text-[0.8rem] p-2 rounded-md border-slate-400 w-full bg-transparent outline-none text-white"
                />

                <datalist id="request">
                  <option value="Request 1" />
                  <option value="Request 2" />
                  <option value="Request 3" />
                  <option value="Request 4" />
                </datalist>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="request_status"
                  className="text-sm font-nedium my-1 text-white"
                >
                  Assigned To
                </label>
                <input
                  list="request"
                  name="request-status"
                  placeholder="Request Status"
                  className="border text-[0.8rem] p-2 rounded-md border-slate-400 w-full bg-transparent outline-none text-white"
                />

                <datalist id="request">
                  <option value="Assigned 1" />
                  <option value="Assigned 2" />
                  <option value="Assigned 3" />
                  <option value="Assigned 4" />
                </datalist>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="request_status"
                  className="text-sm font-nedium my-1 text-white"
                >
                  Request Type
                </label>
                <input
                  list="request"
                  name="request-status"
                  placeholder="Request Status"
                  className="border text-[0.8rem] p-2 rounded-md border-slate-400 w-full bg-transparent outline-none text-white"
                />

                <datalist id="request">
                  <option value="type 1" />
                  <option value="type 2" />
                  <option value="type 3" />
                  <option value="type 4" />
                </datalist>
              </div>
              <div className="text-white">
                <Datepicker
                  date={date}
                  setDate={setDate}
                  title="Request Status"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterRequests;
