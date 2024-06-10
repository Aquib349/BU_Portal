import PropTypes from "prop-types";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Tooltip from "../../../../Elements/Tooltip";

function KeyProvision({ KeyProvisionDetail }) {
  return (
    <>
      <div className="key-provision border border-slate-300 rounded-md p-4 mt-4">
        <div className="main">
          <div className={`relative`}>
            <input
              type="checkbox"
              className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
            />
            <div>
              <span className="flex items-center h-[40px]">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl">Key Provision</h1>
                  <Tooltip
                    message="View Contract Key Provision"
                    header={<IoMdInformationCircleOutline />}
                  />
                </div>
              </span>
            </div>
            <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
              <IoIosArrowDown />
            </div>
            <div
              className={`max-h-0 peer-checked:max-h-[900px]
          transition-all ease-in-out duration-500 overflow-auto`}
            >
              {KeyProvisionDetail.length > 0 ? (
                KeyProvisionDetail.map((val) => (
                  <div
                    key={val.RowKey}
                    className="flex gap-2 text-sm border border-black py-3 px-2 border-l-0 border-r-0 border-t-0 bg-amber-200"
                  >
                    <div className="flex gap-2 w-3/12">
                      <span className="pt-1 text-blue-600">
                        <IoIosArrowForward />
                      </span>
                      <p className="font-semibold">{val.DisplayTitle}</p>
                    </div>
                    <p className="col-span-3 w-9/12">{val.KeyProvisionValue}</p>
                  </div>
                ))
              ) : (
                <h1 className="text-xs px-2">- no key provisions -</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
KeyProvision.propTypes = {
  KeyProvisionDetail: PropTypes.array,
};

export default KeyProvision;
