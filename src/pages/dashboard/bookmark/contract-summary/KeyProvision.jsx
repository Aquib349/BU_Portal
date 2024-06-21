import PropTypes from "prop-types";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Tooltip from "../../../../Elements/Tooltip";
import Accordion from "../../../../Elements/Accordion";

function KeyProvision({ KeyProvisionDetail }) {
  return (
    <>
      <div className="key-provision mt-4 rounded-md border border-slate-300">
        <div className="main">
          <Accordion
            heading={
              <div>
                <span className="flex items-center">
                  <div className="flex items-center gap-1">
                    <h1 className="text-lg">Key Provision</h1>
                    <Tooltip
                      message="View Contract Key Provision"
                      header={<IoMdInformationCircleOutline />}
                    />
                  </div>
                </span>
              </div>
            }
            checked={false}
            bgRequired={false}
          >
            {KeyProvisionDetail.length > 0 ? (
              KeyProvisionDetail.map((val) => (
                <div
                  key={val.RowKey}
                  className="flex gap-2 border border-l-0 border-r-0 border-t-0 border-black bg-amber-200 px-2 py-3 text-sm"
                >
                  <div className="flex w-3/12 gap-2">
                    <span className="pt-1 text-blue-600">
                      <IoIosArrowForward />
                    </span>
                    <p className="font-semibold">{val.DisplayTitle}</p>
                  </div>
                  <p className="col-span-3 w-9/12">{val.KeyProvisionValue}</p>
                </div>
              ))
            ) : (
              <h1 className="px-2 text-xs">- no key provisions -</h1>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
KeyProvision.propTypes = {
  KeyProvisionDetail: PropTypes.array,
};

export default KeyProvision;
