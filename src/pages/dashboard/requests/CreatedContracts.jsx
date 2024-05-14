import Status from "./Status";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CreatedContracts({
  toggleModal,
  ContractTitle,
  status,
  ContractCreated,
  RowKey,
}) {
  return (
    <>
      <tr
        className={`${
          ContractCreated === true ? "" : "hidden"
        } bg-gray-200 text-[0.8rem] text-blue-600`}
      >
        <td className="">
          <span className="flex text-[0.8rem] justify-center items-center">
            <MdOutlineDoubleArrow />
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
        <td className="text-sm cursor-pointer">
          <span className="flex justify-center items-center">
            <RiStickyNoteAddFill onClick={toggleModal} />
          </span>
        </td>
      </tr>
    </>
  );
}

CreatedContracts.propTypes = {
  ContractCreated: PropTypes.bool.isRequired,
  ContractTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  RowKey: PropTypes.string.isRequired,
};

export default CreatedContracts;
