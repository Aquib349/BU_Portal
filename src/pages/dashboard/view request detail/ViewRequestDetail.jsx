import { useParams } from "react-router-dom";
import useRequestDetail from "../../../customhooks/useRequestDetail";
import xmljs from "xml-js";
import Tooltip from "../../../Elements/Tooltip";
import { FiFlag } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import RelatedDocuments from "./RelatedDocuments";
import { CiCircleInfo } from "react-icons/ci";
import { TbCirclesRelation } from "react-icons/tb";

function ViewRequestDetail() {
  const { RowKey } = useParams();
  const { SingleRequestData } = useRequestDetail(RowKey);
  const xml = SingleRequestData;
  const json = xmljs.xml2json(xml, { compact: true, spaces: 4 });
  const jsonparsed = JSON.parse(json);
  const dateObject = new Date(
    jsonparsed?.Request?.Metadata?.RequiredByDate?._text
  );

  // console.log(jsonparsed);

  return (
    <>
      <div className="request-detail-component">
        <div className="main w-8/12 bg-white m-auto my-2 shadow-sm">
          <div className="p-4">
            <h1 className="text-2xl pb-4">
              {jsonparsed?.Request?.Metadata?.RequestTitle?._text}
            </h1>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {jsonparsed?.Request?.Metadata?.ContractArea?._text}
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
                  {jsonparsed?.Request?.Metadata?.AssignedTo?._text}
                </span>
              </div>
              <div className="flex gap-3 items-center text-lg">
                <Tooltip message="Priority" header={<FiFlag />} />
                <span className="pt-1 text-sm">
                  {jsonparsed?.Request?.Metadata?.Priority?._text}
                </span>
              </div>
            </div>
            <p className="text-sm pt-4 leading-4">
              {jsonparsed?.Request?.Metadata?.Description?._text}
            </p>
          </div>
          <hr />

          {/* All the related documents */}
          <div className="p-2">
            <RelatedDocuments />
          </div>

          {/* All the related contracts */}
          <div className="p-2">
            <div className="flex items-center text-lg">
              <h1>Related Contracts</h1>
              <Tooltip
                header={<CiCircleInfo />}
                message="New Contracts which are related to this request or created from this request"
              />
            </div>
            <div className="flex items-center gap-2 px-2">
              <span><TbCirclesRelation/></span>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                totam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRequestDetail;