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
import { statusColor } from "../../constants/StatusColor";

function DocumentResult({ DATA }) {
  const { DataLoading } = useContext(GlobalSearchContext);
  return (
    <>
      <div className="">
        <div className="rounded bg-white p-4 shadow">
          {DataLoading ? (
            <>
              <SpinnerTwo />
            </>
          ) : (
            <>
              {DATA.map((result) => (
                <div key={result.RowKey} className="flex gap-4 border-b py-2">
                  <Tooltip
                    message={result.DocumentStatus}
                    header={
                      <span
                        className={`text-2xl ${statusColor(result.DocumentStatus)}`}
                      >
                        <GoDotFill />
                      </span>
                    }
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {GetFileIcon(result.DocumentName)}
                      </span>
                      <p className="text-lg font-medium">
                        {result.DocumentName}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-md cursor-pointer pl-7 text-slate-400">
                            <Tooltip
                              message="Document Type"
                              header={<GrDocumentText />}
                            />
                          </span>
                          <small className="pt-1 text-sm text-gray-500">
                            {result.DocumentType}
                          </small>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-md cursor-pointer pl-7 text-slate-400">
                            <Tooltip
                              message="Document Author"
                              header={<LuUsers2 />}
                            />
                          </span>
                          <small className="pt-1 text-sm text-gray-500">
                            {result.DocumentAuthor}
                          </small>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="cursor-pointer text-lg text-slate-400">
                          <Tooltip
                            message="Modified On"
                            header={<LuCalendarDays />}
                          />
                        </span>
                        <p className="pt-1 text-gray-600">
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
