import { FaEye } from "react-icons/fa";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { MdOutlineDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";
import React from "react";
import Status from "./Status";

function Requests({ toggleModal,currentItems }) {

  return (
    <>
      <div className="request-contents">
        <div className="overflow-y-auto h-[400px] w-full no-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-blue-500 text-white text-sm">
                <th className="p-1">Sl No.</th>
                <th className="p-1">Requests</th>
                <th className="p-1">Status</th>
                <th className="p-1">Assigned Users</th>
                <th className="p-1">Due Date</th>
                <th className="p-1">Details</th>
                <th className="p-1">Add Note</th>
              </tr>
            </thead>
            
            <tbody>
              {currentItems?.map(
                (val) => (
                  <React.Fragment key={val.id}>
                    {/* Original row */}
                    <tr className="text-center text-[0.8rem] border-t border-slate-400">
                      {/* Columns for original row */}
                      <td className="">{val.id}</td>
                      <td className="w-3/12">
                        {val.requests.length > 40
                          ? val.requests.slice(0, 25) + "..."
                          : val.requests}
                      </td>
                      <td className="w-4/12">
                        {/*  */}
                        <Status status={val.status}/>
                      </td>
                      <td className="">{val.user}</td>
                      <td className="">{val.due_date}</td>
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
                    
                    {val.related?.map((rel) => (
                      <tr
                        key={rel.id}
                        className={`${
                          val.related ? "static" : "hidden"
                        } bg-gray-200 text-[0.8rem] text-center text-red-600`}
                      >
                        {/* Columns for additional row */}
                        <td className="">
                          <span className="flex text-[0.8rem] justify-center items-center">
                            <MdOutlineDoubleArrow />
                          </span>
                        </td>
                        <td className="w-3/12">{rel.requests}</td>
                        <td className="w-4/12">
                          <Status status={rel.status}/>
                        </td>
                        <td className="">{rel.user}</td>
                        <td className="">{rel.due_date}</td>
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
                    ))}
                  </React.Fragment>
                )
              )}
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