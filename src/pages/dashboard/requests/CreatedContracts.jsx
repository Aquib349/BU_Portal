import Status from "./Status";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";

function CreatedContracts({
  ContractTitle,
  status,
  ContractCreated,
  RowKey,
  getContractSummary,
}) {
  return (
    <>
      <tr
        className={`${
          ContractCreated === true ? "" : "hidden"
        } bg-gray-200 text-[0.8rem] text-slate-400`}
      >
        <td className="">
          <span className="flex items-center px-2 text-[0.8rem]">
            <img
              src="/assets/contract-icon.png"
              alt="agreement"
              className="w-3"
            />
          </span>
        </td>
        <td className="w-3/12 pl-4">{ContractTitle}</td>
        <td>
          <Status status={status} />
        </td>
        <td className="text-center">{"-"}</td>
        <td className="text-center">{"-"}</td>
        <td className="cursor-pointer text-sm">
          <span className="flex items-center justify-center">
            <FaEye onClick={() => getContractSummary(RowKey)} />
          </span>
        </td>
        {/* <td className="text-sm cursor-pointer">
          <span className="flex justify-center items-center">
            <RiStickyNoteAddFill onClick={toggleModal} />
          </span>
        </td> */}
      </tr>
    </>
  );
}

CreatedContracts.propTypes = {
  ContractCreated: PropTypes.bool,
  ContractTitle: PropTypes.string,
  status: PropTypes.string,
  toggleModal: PropTypes.func,
  RowKey: PropTypes.string,
};

export default CreatedContracts;
