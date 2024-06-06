import { GoDotFill } from "react-icons/go";
import Tooltip from "../../Elements/Tooltip";
import GetFileIcon from "../../constants/FileExtensionName";
import { GrDocumentText } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import SpinnerTwo from "../../Elements/spinner2/SpinnerTwo";

function DocumentResult({ DATA }) {
  const { DataLoading } = useContext(GlobalSearchContext);
  return (
    <>
      <div className="">
        <div className="bg-white shadow rounded p-4">
          {DataLoading ? (
            <>
              <SpinnerTwo />
            </>
          ) : (
            <>
              {DATA.map((result) => (
                <div key={result.RowKey} className="flex gap-4 border-b py-2">
                  <Tooltip
                    message="New"
                    header={
                      <span className={`text-2xl`}>
                        <GoDotFill />
                      </span>
                    }
                  />
                  <div className="flex-grow">
                    <div className="flex gap-2 items-center">
                      <span className="text-lg">
                        {GetFileIcon(result.DocumentName)}
                      </span>
                      <p className="font-medium text-lg">
                        {result.DocumentName}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Document Type"
                              header={<GrDocumentText />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.DocumentType}
                          </small>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Document Author"
                              header={<LuUsers2 />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.DocumentAuthor}
                          </small>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-lg cursor-pointer text-slate-400">
                          <Tooltip
                            message="Modified On"
                            header={<LuCalendarDays />}
                          />
                        </span>
                        <p className="text-gray-600 pt-1">
                          {new Date(result.Modified).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

DocumentResult.propTypes = {
  DATA: PropTypes.array,
};

export default DocumentResult;
