import { GoDotFill } from "react-icons/go";
import Tooltip from "../../Elements/Tooltip";
import { TiFolderOpen } from "react-icons/ti";
import { GrDocumentText } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import SpinnerTwo from "../../Elements/spinner2/SpinnerTwo";
import { statusColor } from "../../constants/StatusColor";

function ContractResult({ DATA }) {
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
                    message={result.Status}
                    header={
                      <span
                        className={`text-2xl ${statusColor(result.Status)}`}
                      >
                        <GoDotFill />
                      </span>
                    }
                  />
                  <div className="flex-grow pt-[0.35rem]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        <TiFolderOpen />
                      </span>
                      <p className="font-medium">
                        {result.ContractTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-md cursor-pointer pl-7 text-slate-400">
                            <Tooltip
                              message="Contract Type"
                              header={<GrDocumentText />}
                            />
                          </span>
                          <small className="pt-1 text-xs text-gray-500">
                            {result.ContractType}
                          </small>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-md cursor-pointer pl-7 text-slate-400">
                            <Tooltip
                              message="Contract Owner(s)"
                              header={<LuUsers2 />}
                            />
                          </span>
                          <small className="pt-1 text-xs text-gray-500">
                            {result.ContractManagers}
                          </small>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="cursor-pointer text-lg text-slate-400">
                          <Tooltip
                            message="Counterparty"
                            header={<MdOutlineAccountBalance />}
                          />
                        </span>
                        <p className="pt-1 text-xs text-gray-600">
                          {result.Counterparty}
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

ContractResult.propTypes = {
  DATA: PropTypes.array,
};

export default ContractResult;
