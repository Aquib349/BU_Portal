import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Datepicker from "../../../form-components/DatePicker";
import MultiChoiceDropdown from "../../../form-components/MultiChoiceDropdown";

function FilterRequests() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="relative inline-block text-left">
        <div className="text-xl text-blue-600 font-bold">
          <CiFilter
            onClick={() => setShow(!show)}
          />
        </div>

        <div
          className={`absolute border right-0 z-10 mt-4 pb-8 w-80 rounded-md bg-gray-800 ${
            show ? "static" : "hidden"
          }`}
        >
          <div className="py-1 px-2">
            <form className="text-white text-sm">
              <div className="py-2">
                <MultiChoiceDropdown title="Request Status" multi={true} options={[]}/>
              </div>
              <div className="py-2">
                <MultiChoiceDropdown title="Assigned To" multi={true} options={[]}/>
              </div>
              <div className="py-2">
                <MultiChoiceDropdown title="Request Type" multi={true} options={[]}/>
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
