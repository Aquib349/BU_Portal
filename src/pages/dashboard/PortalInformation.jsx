import { FaCircleUser } from "react-icons/fa6";
import Tooltip from "../../Elements/Tooltip";
import Accordion from "../../Elements/Accordion";

function PortalInformation() {
  return (
    <>
      <div className="portal-information-component">
        <div className="main">
          <div className="key-contacts shadow-sm shadow-black/20 rounded-sm py-1 px-2 mt-4 bg-white">
            <h1 className="text-xl border-b pb-1 flex">
              Key Contacts
              <Tooltip message="Key legal contact information for any questions" />
            </h1>
            <div className="flex py-1 pt-1 leading-4">
              <span className="text-slate-500">
                <FaCircleUser />
              </span>
              <div className="px-2">
                <p className="text-md">QA User 8</p>
                <p className="text-[0.7rem] text-slate-600 px-1">
                  testingqa614@gmail.com
                </p>
              </div>
            </div>
            <div className="flex py-1 leading-4">
              <span className="text-slate-500">
                <FaCircleUser />
              </span>
              <div className="px-2">
                <p className="text-md">QA5</p>
                <p className="text-[0.7rem] text-slate-600 px-1">
                  testingqa614@gmail.com
                </p>
              </div>
            </div>
            <div className="flex py-1 leading-4">
              <span className="text-slate-500">
                <FaCircleUser />
              </span>
              <div className="px-2">
                <p className="text-md">QA9</p>
                <p className="text-[0.7rem] text-slate-600 px-1">
                  testingqa614@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* FAQS */}
          <div className="key-contacts shadow-sm shadow-black/20 rounded-sm py-1 px-2 mt-2 bg-white">
            <h1 className="text-xl border-b pb-1 flex">
              FAQS
              <Tooltip message="Materials and resources to help you to use eContracts" />
            </h1>
            <Accordion heading="What BU Portal ?" checked={true}>
              <p className="text-[0.75rem] p-2 leading-4">
                &quot;BU Portal&quot; is a specific term mentioned in a
                contract, you should refer to the contract itself or any related
                documentation to understand its meaning. Look for sections or
                clauses that discuss the portal, its purpose, and the rights and
                responsibilities of the parties involved.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortalInformation;
