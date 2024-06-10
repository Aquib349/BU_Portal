import { useParams } from "react-router-dom";
import useRequestDetail from "../../../customhooks/useRequestDetail";
import Tooltip from "../../../Elements/Tooltip";
import RelatedDocuments from "./RelatedDocuments";
import { CiCircleInfo } from "react-icons/ci";
import { TbCirclesRelation } from "react-icons/tb";
import useXmlConverter from "../../../customhooks/useXmlConverter";
import { useEffect, useState } from "react";
import usePortalConfig from "../../../customhooks/usePortalConfig";
import axios from "axios";
import ViewStatusUpdates from "./ViewStatusUpdate";
import SingleRequestDetails from "./SingleRequestDetails";
import RequestDetailShimmer from "../../../shimmer/RequestDetailShimmer";

function ViewRequestDetail() {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const [Data, setData] = useState({});
  const [StatusUpdates, setStatusUpdates] = useState([]);
  const { RowKey } = useParams();
  const { showStatus } = usePortalConfig();
  const { SingleRequestData } = useRequestDetail(RowKey);
  const jsonResult = useXmlConverter(SingleRequestData);

  useEffect(() => {
    if (jsonResult != "") {
      setData(JSON.parse(jsonResult));
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
    }
    getStatusUpdates();
  }, [jsonResult]);

  if (!showStatus) {
    return (
      <>
        <RequestDetailShimmer />
      </>
    );
  }

  return (
    <>
      <div
        className={`request-detail-component grid grid-cols-5 gap-x-2 w-9/12 m-auto`}
      >
        <div
          className={`main my-2 ${showStatus ? "col-span-3" : "col-span-4"}`}
        >
          <SingleRequestDetails Data={Data} RowKey={RowKey} />
          <hr />

          {/* All the related documents */}
          <div className="p-2 border rounded my-1 bg-white shadow-sm">
            <RelatedDocuments
              status={Data?.Metadata?.Status?._text}
              RowKey={RowKey}
            />
          </div>

          {/* All the related contracts */}
          <div className="p-2 border rounded my-1 bg-white shadow-sm">
            <div className="flex items-center text-lg">
              <h1 className="font-semibold">Related Contracts</h1>
              <div className="mb-1">
                <Tooltip
                  header={<CiCircleInfo />}
                  message="New Contracts which are related to this request or created from this request"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 pt-2">
              <span
                className={`${
                  Data?.Metadata?.RelatedContracts?._text ? "static" : "hidden"
                } text-blue-600`}
              >
                <TbCirclesRelation />
              </span>
              <p className="text-sm">
                {Data?.Metadata?.RelatedContracts?._text}
              </p>
            </div>
          </div>
        </div>
        {showStatus && (
          <div className="bg-white my-2 shadow-sm p-4 col-span-2">
            <ViewStatusUpdates
              StatusUpdates={StatusUpdates}
              status={
                StatusUpdates.length === 0 ? Data?.Metadata?.Status?._text : {}
              }
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ViewRequestDetail;
