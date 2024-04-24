import Status from "../Status";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";

function RelatedContracts({
  ContractTitle,
  status,
  toggleModal,
  RelatedContracts,
}) {
  return (
    <>
      <tr
        className={`${
          RelatedContracts?.toLowerCase() === ContractTitle?.toLowerCase()
            ? "static"
            : "hidden"
        } bg-gray-200 text-[0.8rem] text-center text-red-600`}
      >
        <td className="">
          <span className="flex text-[0.8rem] justify-center items-center">
            <MdOutlineDoubleArrow />
          </span>
        </td>
        <td className="w-3/12">{ContractTitle}</td>
        <td className="w-4/12">
          <Status status={status} />
        </td>
        <td className="">{"-"}</td>
        <td className="">{"-"}</td>
        <td className=" text-sm cursor-pointer">
          <span className="flex justify-center items-center">
            <FaEye />
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

RelatedContracts.propTypes = {
  RelatedContracts: PropTypes.string.isRequired,
  ContractTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default RelatedContracts;
