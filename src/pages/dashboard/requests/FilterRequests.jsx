import { useState } from "react";
import Datepicker from "../../../form-components/DatePicker";
import MultiChoiceDropdown from "../../../form-components/MultiChoiceDropdown";
import UserField from "../../../form-components/UserField";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

function FilterRequests() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <>
      <div className="relative inline-block text-left">
        <div
          className="text-sm font-bold flex justify-center items-center gap-1 text-slate-500"
          onClick={() => setShow(!show)}
        >
          <span>
            <TbAdjustmentsHorizontal></TbAdjustmentsHorizontal>
          </span>
          <span>Filter</span>
        </div>

        <div
          className={`absolute border right-0 z-10 mt-4 pb-8 w-80 rounded bg-slate-100 ${
            show ? "static border border-slate-500" : "hidden"
          }`}
        >
          <div className="relative">
            <div
              className="absolute top-1 right-1 font-bold"
              onClick={() => setShow(!show)}
            >
              <RxCross2 />
            </div>
          </div>
          <div className="py-1 px-2">
            <form className="text-sm">
              <div className="py-2">
                <MultiChoiceDropdown
                  title="Request Status"
                  multi={true}
                  options={[]}
                />
              </div>
              <div className="py-2">
                <UserField
                  title="Assigned To"
                  multi={true}
                  baseline=""
                  required="false"
                />
              </div>
              <div className="py-2">
                <MultiChoiceDropdown
                  title="Request Type"
                  multi={true}
                  options={[]}
                />
              </div>
              <div>
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
