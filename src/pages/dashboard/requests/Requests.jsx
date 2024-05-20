import { FaEye } from "react-icons/fa";
import { RiStickyNoteAddFill } from "react-icons/ri";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Status from "./Status";
import { RequestContext } from "../../../context/RequestContext";
import CreatedContracts from "./CreatedContracts";
import RelatedContracts from "./RelatedContracts";
import { Link } from "react-router-dom";

function Requests({ toggleModal, currentItems }) {
  const { RequestData } = useContext(RequestContext);

  return (
    <>
      <div className="request-contents">
        <div className="overflow-y-auto h-auto w-full no-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-blue-500 text-white text-sm">
                <th className="p-2 text-start">Sl No.</th>
                <th className="p-2 w-3/12 text-start">Title</th>
                <th className="p-2 text-start pl-10">Status</th>
                <th className="p-2">Assigned To</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Details</th>
                <th className="p-2">Add Note</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((val, index) => {
                const dateObject = new Date(val.RequiredByDate);
                return (
                  <React.Fragment key={val.RowKey}>
                    {/* Original row */}
                    <tr className="text-center text-sm border-t border-slate-400">
                      {/* Columns for original row */}
                      <td className="text-start px-3">{index + 1}</td>
                      <td className="w-3/12 text-start">
                        {val.RequestTitle.length > 40
                          ? val.RequestTitle?.slice(0, 25) + "..."
                          : val.RequestTitle}
                      </td>
                      <td>
                        <Status status={val.Status} />
                      </td>
                      <td className="p-2">{val.AssignedTo}</td>
                      <td className="">{dateObject.toLocaleDateString()}</td>
                      <td className="relative text-xl cursor-pointer">
                        <span className="flex justify-center items-center text-slate-600">
                          <Link to={`requestDetail/${val.RowKey}`}>
                            <FaEye />
                          </Link>
                        </span>
                      </td>
                      <td className="py-2 text-xl cursor-pointer">
                        <span className="flex justify-center items-center text-slate-600">
                          <RiStickyNoteAddFill onClick={toggleModal} />
                        </span>
                      </td>
                    </tr>
                    {/* Additional row */}

                    {RequestData?.ContractsCreated?.map((rel) => (
                      <CreatedContracts
                        key={rel.RowKey}
                        RowKey={rel.RowKey}
                        toggleModal={toggleModal}
                        ContractTitle={rel.ContractTitle}
                        status={rel.Status}
                        ContractCreated={val.RowKey === rel.RelatedRequestID}
                      />
                    ))}
                    {RequestData?.ContractsAttached?.map((rel) => (
                      <RelatedContracts
                        key={rel.RowKey}
                        RowKey={rel.RowKey}
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
