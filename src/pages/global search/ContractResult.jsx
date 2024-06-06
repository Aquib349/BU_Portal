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

function ContractResult({ DATA }) {
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
                        <TiFolderOpen />
                      </span>
                      <p className="font-medium text-lg">
                        {result.ContractTitle}
                      </p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="flex items-center">
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Contract Type"
                              header={<GrDocumentText />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.ContractType}
                          </small>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Contract Owner(s)"
                              header={<LuUsers2 />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.ContractManagers}
                          </small>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-lg cursor-pointer text-slate-400">
                          <Tooltip
                            message="Counterparty"
                            header={<MdOutlineAccountBalance />}
                          />
                        </span>
                        <p className="text-gray-600 pt-1">
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
