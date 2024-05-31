import { FiFlag } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import PropTypes from "prop-types";
import Tooltip from "../../../Elements/Tooltip";

function SingleRequestDetails({ Data }) {
  const dateObject = new Date();
  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="p-4 border-b">
          <h1 className="text-2xl pb-4 font-semibold">
            {Data?.Metadata?.RequestTitle?._text}
          </h1>
          <div className="flex justify-between items-center">
            <div className="text-sm">{Data?.Metadata?.ContractArea?._text}</div>
            <div className="flex gap-4 items-center text-lg">
              <Tooltip
                message="Request will be due on this date"
                header={<LuCalendarDays />}
              />
              <span className="pt-1 text-sm">
                {dateObject.toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-4 items-center text-lg">
              <Tooltip
                message="Request is assigned to this user"
                header={<HiUsers />}
              />
              <span className="pt-1 text-sm">
                {Data?.Metadata?.AssignedTo?._text}
              </span>
            </div>
            <div className="flex gap-4 items-center text-lg">
              <Tooltip message="Priority" header={<FiFlag />} />
              <span className="pt-1 text-sm">
                {Data?.Metadata?.Priority?._text}
              </span>
            </div>
          </div>
          <p className="text-xs pt-4 leading-4 text-slate-500">
            {Data?.Metadata?.Description?._text}
          </p>
        </div>

        {/* All the details of single request */}
        <div className="sigle-request-detail text-sm px-4">
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Business Area</span>
            <span className="col-span-3">
              {Data?.Metadata?.BusinessArea?._text
                ? Data?.Metadata?.BusinessArea?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Request Number</span>
            <span className="col-span-3">
              {Data?.Metadata?.RequestNumber?._text
                ? Data?.Metadata?.RequestNumber?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Request Name</span>
            <span className="col-span-3">
              {Data?.Metadata?.Requestor?._text
                ? Data?.Metadata?.Requestor?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Request Approver (s)
            </span>
            <span className="col-span-3">
              {Data?.Metadata?.RequestApprover?._text
                ? Data?.Metadata?.RequestApprover?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Desired Signature Date
            </span>
            <span className="col-span-3">
              {Data?.Metadata?.DesiredSignatureDate?._text
                ? Data?.Metadata?.DesiredSignatureDate?._text.split(" ")[0] ??
                  "-"
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Counterparty</span>
            <span className="col-span-3">
              {Data?.Metadata?.Counterparty?._text
                ? Data?.Metadata?.Counterparty?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Counterparty Mailing Address
            </span>
            <span className="col-span-3">
              {Data?.Metadata?.CounterpartyMailingAddress?._text
                ? Data?.Metadata?.CounterpartyMailingAddress?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Counterparty Emcol-span-3ail Address (and Contact Name)
            </span>
            <span className="">
              {Data?.Metadata?.CounterpartyEmailAddressandContactName?._text
                ? Data?.Metadata?.CounterpartyEmailAddressandContactName?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Data Privacy</span>
            <span className="col-span-3">
              {Data?.Metadata?.DataPrivacy?._text
                ? Data?.Metadata?.DataPrivacy?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Goverment Related</span>
            <span className="col-span-3">
              {Data?.Metadata?.GovernmentRelated?._text
                ? Data?.Metadata?.GovernmentRelated?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Health Care Professional
            </span>
            <span className="col-span-3">
              {Data?.Metadata?.HealthCareProfessional?._text
                ? Data?.Metadata?.HealthCareProfessional?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">
              Additional Comments
            </span>
            <span className="col-span-3">
              {Data?.Metadata?.AdditionalComments?._text
                ? Data?.Metadata?.AdditionalComments?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Project</span>
            <span className="col-span-3">
              {Data?.Metadata?.Project?._text
                ? Data?.Metadata?.Project?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Created By</span>
            <span className="col-span-3">
              {Data?.Metadata?.CreatedBy?._text
                ? Data?.Metadata?.CreatedBy?._text
                : "-"}
            </span>
          </div>
          <div className="grid grid-cols-5 items-center py-2">
            <span className="text-slate-500 col-span-2">Created On</span>
            <span className="col-span-3">
              {Data?.Metadata?.Created?._text
                ? Data?.Metadata?.Created?._text.split(" ")[0] ?? "-"
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

SingleRequestDetails.propTypes = {
  Data: PropTypes.object.isRequired,
};

export default SingleRequestDetails;