import Status from "./Status";
import { TbCirclesRelation } from "react-icons/tb";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function RelatedContracts({
  ContractTitle,
  status,
  toggleModal,
  RelatedContracts,
  RowKey,
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
          <span className="flex text-lg text-blue-600 font-bold px-2 items-center">
            <TbCirclesRelation />
          </span>
        </td>
        <td className="w-3/12 pl-4">{ContractTitle}</td>
        <td>
          <Status status={status} />
        </td>
        <td className="text-center">{"-"}</td>
        <td className="text-center">{"-"}</td>
        <td className=" text-sm cursor-pointer">
          <span className="flex justify-center items-center">
            <Link to={`contractSummary/${RowKey}`}>
              <FaEye />
            </Link>
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
  RelatedContracts: PropTypes.string.isRequired,
  ContractTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  RowKey: PropTypes.string.isRequired,
};

export default RelatedContracts;
