import { FaEye } from "react-icons/fa";
import { RiStickyNoteAddFill } from "react-icons/ri";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Status from "../Status";
import { RequestContext } from "../../../context/RequestContext";
import CreatedContracts from "./CreatedContracts";
import RelatedContracts from "./RelatedContracts";

function Requests({ toggleModal, currentItems }) {
  const { RequestData } = useContext(RequestContext);

  return (
    <>
      <div className="request-contents">
        <div className="overflow-y-auto h-[400px] w-full no-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-blue-600 text-white text-sm">
                <th className="p-1">Sl No.</th>
                <th className="p-1">Requests</th>
                <th className="p-1">Status</th>
                <th className="p-1">Assigned To</th>
                <th className="p-1">Due Date</th>
                <th className="p-1">Details</th>
                <th className="p-1">Add Note</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((val, index) => {
                const dateObject = new Date(val.RequiredByDate);
                return (
                  <React.Fragment key={val.RowKey}>
                    {/* Original row */}
                    <tr className="text-center text-[0.8rem] border-t border-slate-400">
                      {/* Columns for original row */}
                      <td className="">{index + 1}</td>
                      <td className="w-3/12">
                        {val.RequestTitle.length > 40
                          ? val.RequestTitle?.slice(0, 25) + "..."
                          : val.RequestTitle}
                      </td>
                      <td className="w-4/12">
                        {/*  */}
                        <Status status={val.Status} />
                      </td>
                      <td className="">{val.AssignedTo}</td>
                      <td className="">{dateObject.toLocaleDateString()}</td>
                      <td className="text-lg cursor-pointer">
                        <span className="flex justify-center items-center text-slate-600">
                          <FaEye />
                        </span>
                      </td>
                      <td className="py-2 text-lg cursor-pointer">
                        <span className="flex justify-center items-center text-slate-600">
                          <RiStickyNoteAddFill onClick={toggleModal} />
                        </span>
                      </td>
                    </tr>
                    {/* Additional row */}

                    {RequestData?.ContractsCreated?.map((rel) => (
                      <CreatedContracts
                        key={rel.RowKey}
                        toggleModal={toggleModal}
                        ContractTitle={rel.ContractTitle}
                        status={rel.Status}
                        ContractCreated={val.RowKey === rel.RelatedRequestID}
                      />
                    ))}
                    {RequestData?.ContractsAttached?.map((rel) => (
                      <RelatedContracts
                        key={rel.RowKey}
                        toggleModal={toggleModal}
                        ContractTitle={rel.ContractTitle}
                        RelatedContract={rel.RelatedContracts}
                        status={rel.Status}
                        RelatedContracts={val.RelatedContracts}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Requests.propTypes = {
  currentItems: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Requests;