import { FaEye } from "react-icons/fa";
import { RiStickyNoteAddFill } from "react-icons/ri";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import Status from "./Status";
import { RequestContext } from "../../../context/RequestContext";
import CreatedContracts from "./CreatedContracts";
import RelatedContracts from "./RelatedContracts";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../../Elements/Modal";
import ContractSummary from "../bookmark/contract-summary/ContractSummary";

function Requests({ toggleModal, currentItems, setShowSpinner }) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const { RequestData } = useContext(RequestContext);
  const [ContractDetails, setContractDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  // function to get the contract summary
  async function getContractSummary(ID) {
    setShowSpinner(true);
    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    const response = await axios.get(
      `${api}/api/accounts/${account_id}/portal/contractDetails?contractId=${ID}`,
      { headers },
    );
    if (response.status === 200) {
      setShowSpinner(false);
      setShowModal(!showModal);
    }
    setContractDetails(response.data);
  }

  return (
    <>
      {showModal && (
        <Modal
          heading={"Contract Summary"}
          toggleModal={toggleModal}
          set_Width={true}
        >
          <div className="p-2">
            <ContractSummary ContractDetails={ContractDetails} />
          </div>
        </Modal>
      )}
      <div className="request-contents">
        <div className="no-scrollbar h-auto w-full overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-blue-500 text-sm text-white">
                <th className="p-2 text-start">Sl No.</th>
                <th className="w-3/12 p-2 text-start">Title</th>
                <th className="p-2 pl-10 text-start">Status</th>
                <th className="p-2">Assigned To</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Details</th>
                {/* <th className="p-2">Add Note</th> */}
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((val, index) => {
                const dateObject = new Date(val.RequiredByDate);
                return (
                  <React.Fragment key={val.RowKey}>
                    {/* Original row */}
                    <tr className="border-t border-slate-400 text-center text-sm">
                      {/* Columns for original row */}
                      <td className="px-3 text-start">{index + 1}</td>
                      <td className="w-3/12 text-start hover:text-blue-600 hover:font-semibold hover:scale-105 transition-all duration-500 ease-in-out">
                        <span>
                          <Link to={`requestDetail/${val.RowKey}`}>
                            {val.RequestTitle.length > 40
                              ? val.RequestTitle?.slice(0, 25) + "..."
                              : val.RequestTitle}
                          </Link>
                        </span>
                      </td>
                      <td>
                        <Status status={val.Status} />
                      </td>
                      <td className="p-2">{val.AssignedTo}</td>
                      <td className="">{dateObject.toLocaleDateString()}</td>
                      <td className="relative cursor-pointer py-2 text-xl">
                        <span className="flex items-center justify-center text-slate-600">
                          <Link to={`requestDetail/${val.RowKey}`}>
                            <FaEye />
                          </Link>
                        </span>
                      </td>
                      {/* <td className="py-2 text-xl cursor-pointer">
                        <span className="flex justify-center items-center text-slate-600">
                          <RiStickyNoteAddFill onClick={toggleModal} />
                        </span>
                      </td> */}
                    </tr>
                    {/* Additional row */}

                    {RequestData?.ContractsCreated?.map((rel) => (
                      <CreatedContracts
                        key={rel.RowKey}
                        RowKey={rel.RowKey}
                        ContractTitle={rel.ContractTitle}
                        status={rel.Status}
                        ContractCreated={val.RowKey === rel.RelatedRequestID}
                        getContractSummary={getContractSummary}
                      />
                    ))}
                    {RequestData?.ContractsAttached?.map((rel) => (
                      <RelatedContracts
                        key={rel.RowKey}
                        RowKey={rel.RowKey}
                        ContractTitle={rel.ContractTitle}
                        RelatedContract={rel.RelatedContracts}
                        status={rel.Status}
                        RelatedContracts={val.RelatedContracts}
                        getContractSummary={getContractSummary}
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
  currentItems: PropTypes.array,
  toggleModal: PropTypes.func,
};

export default Requests;
