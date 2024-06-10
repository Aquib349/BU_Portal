import Documents from "./Documents";
import KeyProvision from "./KeyProvision";
import Notes from "./Notes";
import StatusUpdates from "./StatusUpdates";
import PropTypes from "prop-types";

const ContractSummary = ({ ContractDetails }) => {
  const {
    ContractTitle,
    Description,
    CompanyProfile,
    ContractManagers,
    ContractNumber,
    Counterparty,
    BusinessArea,
    Created,
    CreatedBy,
    ContractType,
    CounterpartyRelationshipOwner,
    Status,
    Stage,
  } = ContractDetails?.Contract;
  const dateObject = new Date(Created);

  return (
    <>
      <div className="contract-summary">
        <div className="main">
          {/* contract summary */}
          <div className="summary px-2">
            <div className="flex justify-between">
              <div className="title">
                <h1 className="text-lg text-slate-400">Contract Title</h1>
                <h3 className="text-md">{ContractTitle}</h3>
              </div>
            </div>
            <div className="description py-2">
              <h1 className="text-lg text-slate-400">Description</h1>
              <span className="text-sm">{Description ? Description : "-"}</span>
            </div>
            <div className="contract-details">
              <div className="grid grid-cols-3 text-sm">
                <div className="flex flex-col py-2">
                  <span className="text-slate-400">Company Entity</span>
                  <span className="">
                    {CompanyProfile ? CompanyProfile : "-"}
                  </span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-400">Contract Owner</span>
                  <span className="">
                    {ContractManagers ? ContractManagers : "-"}
                  </span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Number</span>
                  <span className="">
                    {ContractNumber ? ContractNumber : "-"}
                  </span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Counterparty</span>
                  <span className="">{Counterparty ? Counterparty : "-"}</span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Business Area</span>
                  <span className="">{BusinessArea ? BusinessArea : "-"}</span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Created On</span>
                  <span className="">
                    {dateObject.toLocaleDateString()
                      ? dateObject.toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Created by</span>
                  <span className="">{CreatedBy ? CreatedBy : "-"}</span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">Type</span>
                  <span className="">{ContractType ? ContractType : "-"}</span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="text-slate-500">
                    Counterparty Relationship Owner
                  </span>
                  <span className="">
                    {CounterpartyRelationshipOwner
                      ? CounterpartyRelationshipOwner
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* contract status updates */}
          <StatusUpdates Status={Status} Stage={Stage} />

          {/* Docouments */}
          <Documents
            DocumentDetails={ContractDetails.PrimaryAndFinalDocument}
          />

          {/* key provision */}
          <KeyProvision KeyProvisionDetail={ContractDetails?.KeyProvisions} />

          {/* notes */}
          <Notes NotesDetail={ContractDetails?.Notes} />
        </div>
      </div>
    </>
  );
};

ContractSummary.propTypes = {
  ContractDetails: PropTypes.object,
};

export default ContractSummary;
