import { useState } from "react";
import Accordion from "../../Elements/Accordion";
import { BsDownload } from "react-icons/bs";

function Faqs() {
  const [faq, setFaq] = useState("faq");
  const HelpDocuments = [
    {
      id: 1,
      name: "Charlotte Surgery Center 02-10-23 to 02-10-26.pdf",
      notes: "test",
    },
    {
      id: 2,
      name: "Loaner Atlanta Institute for ENT - Atlanta 4007418 Dated 02-26-19 PSI285530.pdf",
      notes: "TEST",
    },
    {
      id: 3,
      name: "Northgate Dental Purchase Agreement.pdf",
      notes: "This is actual client document",
    },
    { id: 4, name: "Test PDf.pdf", notes: "" },
    {
      id: 5,
      name: "Univ. of California UC Health Davis, Irvine, Los Angelels, San Diego and San Francisco 09-13-19 to 09-13-22 - MPA.pdf",
      notes: "test",
    },
    {
      id: 6,
      name: "Univ. of Pennsylvania Medical Center UPHS Amendment 1 To Add BoneBridge 05-07-19 to 06-12-21.pdf",
      notes: "actual client document",
    },
  ];
  return (
    <>
      <div className="faq-component">
        <div className="main">
          <div className="headings flex items-center gap-4 p-2 text-slate-400">
            <span
              className={`cursor-pointer ${faq === "faq" ? "font-medium text-blue-600" : ""}`}
              onClick={() => setFaq("faq")}
            >
              FAQ's
            </span>
            <span
              className={`cursor-pointer ${faq === "document" ? "font-medium text-blue-600" : ""}`}
              onClick={() => setFaq("document")}
            >
              Help Document
            </span>
          </div>

          {/* faqs */}
          {faq === "faq" && (
            <div className="faqs mt-4 rounded-md border-2 border-slate-200">
              <Accordion heading="What is BU Portal" checked={true} bgRequired={true}>
                <p className="p-3 text-sm">
                  "BU Portal" is a specific term mentioned in a contract, you
                  should refer to the contract itself or any related
                  documentation to understand its meaning. Look for sections or
                  clauses that discuss the portal, its purpose, and the rights
                  and responsibilities of the parties involved.
                </p>
              </Accordion>
            </div>
          )}
          {/* help document */}
          {faq === "document" && (
            <div className="mt-4 rounded-md border-2 border-slate-200 p-3">
              {HelpDocuments.map((val) => (
                <div
                  key={val.id}
                  className="documents mb-2 flex justify-between items-center border-b px-2"
                >
                  <div className="flex flex-col pb-4">
                    <span className="cursor-pointer hover:underline">
                      {val.name}
                    </span>
                    <small className="text-slate-400">{val.notes ? val.notes : "-"}</small>
                  </div>
                  <span>
                    <BsDownload />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Faqs;
