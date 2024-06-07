import { GoDotFill } from "react-icons/go";
import Tooltip from "../../Elements/Tooltip";
import { GrDocumentText } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalSearchContext } from "../../context/GlobalSearchContext";
import SpinnerTwo from "../../Elements/spinner2/SpinnerTwo";

function CounterpartyResult({ DATA }) {
  const { DataLoading } = useContext(GlobalSearchContext);
  console.log(DATA);
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
                        <LuUsers2 />
                      </span>
                      <p className="font-medium text-lg">
                        {result.CounterpartyName}
                      </p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="flex items-center">
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Counterparty Type"
                              header={<GrDocumentText />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.CounterpartyType}
                          </small>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-md pl-7 cursor-pointer text-slate-400">
                            <Tooltip
                              message="Regional"
                              header={<MdOutlineAccountBalance />}
                            />
                          </span>
                          <small className="text-gray-500 text-sm pt-1">
                            {result.IsGlobal === "No" ? "Regional" : "Global"}
                          </small>
                        </div>
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

CounterpartyResult.propTypes = {
  DATA: PropTypes.array,
};
export default CounterpartyResult;
