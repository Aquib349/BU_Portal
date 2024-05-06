import { useParams } from "react-router-dom";
import useRequestDetail from "../../../customhooks/useRequestDetail";
import Tooltip from "../../../Elements/Tooltip";
import { FiFlag } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import RelatedDocuments from "./RelatedDocuments";
import { CiCircleInfo } from "react-icons/ci";
import { TbCirclesRelation } from "react-icons/tb";
import useXmlConverter from "../../../customhooks/useXmlConverter";
import { useEffect, useState } from "react";
import usePortalConfig from "../../../customhooks/usePortalConfig";
import axios from "axios";
import ViewStatusUpdates from "./ViewStatusUpdate";

function ViewRequestDetail() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const [Data, setData] = useState([]);
  const [IsStatusUpdates, setIsStatusUpdates] = useState(false);
  const [StatusUpdates, setStatusUpdates] = useState([]);
  const { RowKey } = useParams();
  const { ConfigData } = usePortalConfig();
  const { SingleRequestData } = useRequestDetail(RowKey);
  const jsonResult = useXmlConverter(SingleRequestData);
  const dateObject = new Date(Data?.Metadata?.RequiredByDate?._text);

  useEffect(() => {
    if (jsonResult != "") {
      setData(JSON.parse(jsonResult));
    }

    // check to see the status updates
    function statusUpdates() {
      const value = ConfigData.map((val) => {
        return val.DisplayRequestStatus;
      });
      setIsStatusUpdates(value[0]);
    }

    // functions to get the status updates of the single requests !!
    async function getStatusUpdates() {
      const headers = {
        "Content-Type": "application/json",
        "eContracts-ApiKey":
          "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
      };

      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Requests/${RowKey}/statusPosts`,
        { headers }
      );
      setStatusUpdates(response.data);
      console.log(response.data);
    }
    statusUpdates();
    getStatusUpdates();
  }, [jsonResult, ConfigData, RowKey]);

  return (
    <>
      <div
        className={`request-detail-component grid grid-cols-5 gap-x-2 w-9/12 m-auto`}
      >
        <div
          className={`main bg-white my-2 shadow-sm ${
            IsStatusUpdates ? "col-span-3" : "col-span-4"
          }`}
        >
          <div className="p-4">
            <h1 className="text-2xl pb-4">
              {Data?.Metadata?.RequestTitle?._text}
            </h1>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {Data?.Metadata?.ContractArea?._text}
              </div>
              <div className="flex gap-3 items-center text-lg">
                <Tooltip
                  message="Request will be due on this data"
                  header={<LuCalendarDays />}
                />
                <span className="pt-1 text-sm">
                  {dateObject.toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-3 items-center text-lg">
                <Tooltip
                  message="Request is assigned to this user"
                  header={<HiUsers />}
                />
                <span className="pt-1 text-sm">
                  {Data?.Metadata?.AssignedTo?._text}
                </span>
              </div>
              <div className="flex gap-3 items-center text-lg">
                <Tooltip message="Priority" header={<FiFlag />} />
                <span className="pt-1 text-sm">
                  {Data?.Metadata?.Priority?._text}
                </span>
              </div>
            </div>
            <p className="text-sm pt-4 leading-4">
              {Data?.Metadata?.Description?._text}
            </p>
          </div>
          <hr />

          {/* All the related documents */}
          <div className="py-2 px-4">
            <RelatedDocuments />
          </div>

          {/* All the related contracts */}
          <div className="py-2 px-4">
            <div className="flex items-center text-lg">
              <h1>Related Contracts</h1>
              <Tooltip
                header={<CiCircleInfo />}
                message="New Contracts which are related to this request or created from this request"
              />
            </div>
            <div className="flex items-center gap-2 px-2">
              <span>
                <TbCirclesRelation />
              </span>
              <p className="text-sm">
                {Data?.Metadata?.RelatedContracts?._text}
              </p>
            </div>
          </div>
        </div>
        {IsStatusUpdates && (
          <div className="bg-white my-2 shadow-sm p-4 col-span-2">
            <ViewStatusUpdates StatusUpdates={StatusUpdates} />
          </div>
        )}
      </div>
    </>
  );
}

export default ViewRequestDetail;
