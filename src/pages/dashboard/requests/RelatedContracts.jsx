import Status from "./Status";
import { TbCirclesRelation } from "react-icons/tb";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";

function RelatedContracts({
  ContractTitle,
  status,
  RelatedContracts,
  RowKey,
  getContractSummary,
}) {
  return (
    <>
      <tr
        className={`${
          RelatedContracts?.toLowerCase() === ContractTitle?.toLowerCase()
            ? "static"
            : "hidden"
        } bg-gray-100 text-[0.8rem] text-slate-400`}
      >
        <td className="">
          <span className="flex items-center px-2 text-lg font-bold text-blue-600">
            <TbCirclesRelation />
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

RelatedContracts.propTypes = {
  RelatedContracts: PropTypes.string,
  ContractTitle: PropTypes.string,
  status: PropTypes.string,
  toggleModal: PropTypes.func,
  RowKey: PropTypes.string,
};

export default RelatedContracts;
