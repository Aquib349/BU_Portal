import { GoDotFill } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestContext";
import PropTypes from 'prop-types'

function Requests({FilteredData,toggleModal}) {
  const { RequestData } = useContext(RequestContext);
  
  return (
    <>
      <div className="request-contents">
        <div className="overflow-y-auto h-[400px] w-full no-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr className="shadow-sm bg-slate-50 text-sm">
                <th className="p-1">Sl No.</th>
                <th className="p-1">Requests</th>
                <th className="p-1">Status</th>
                <th className="p-1">Assigned Users</th>
                <th className="p-1">Due Date</th>
                <th className="p-1">Details</th>
                <th className="p-1">Add a Note</th>
              </tr>
            </thead>
            <tbody>
              {(FilteredData.length <= 0 ?  RequestData : FilteredData).map((val) => (
                <tr key={val.id} className="text-center text-[0.8rem]">
                  <td className="py-2 border-b">{val.id}</td>
                  <td className="py-2 w-3/12 border-b border-l">
                    {val.requests.length > 40 ? val.requests.slice(0,25) + '...' : val.requests }
                    </td>
                  <td className="py-2 w-4/12 border-b border-l">
                    <div className="flex items-center pl-3">
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "awaiting approval" ? "text-orange-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "new" ? "text-green-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "request completed" ? "text-blue-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "cancel" ? "text-slate-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "approved" ? "text-blue-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span
                        className={`text-lg 
                      ${val.status.toLowerCase() === "on hold" ? "text-red-500" : "text-slate-300"}`}
                      >
                        <GoDotFill />
                      </span>
                      <span className="px-2">{val.status}</span>
                    </div>
                  </td>
                  <td className="py-2 border-b border-l">{val.user}</td>
                  <td className="py-2 border-b border-l">{val.due_date}</td>
                  <td className="py-2 border-b text-lg cursor-pointer border-l">
                    <span className="flex justify-center items-center text-slate-600">
                      <FaEye />
                    </span>
                  </td>
                  <td className="py-2 border-b text-lg cursor-pointer border-l">
                    <span className="flex justify-center items-center text-slate-600">
                      <RiStickyNoteAddFill onClick={toggleModal}/>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Requests.propTypes = {
    FilteredData : PropTypes.array.isRequired
}

export default Requests;