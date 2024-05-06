import { IoIosArrowDown } from "react-icons/io";
import MultiBusinessAreaRoute from "./MultiBusinessAreaRoute";
import usePortalConfig from "../../customhooks/usePortalConfig";
import axios from "axios";
import { useCallback, useState } from "react";
import DynamicForms from "../../components/DynamicForms";
import NewRequestShimmer from "../../shimmer/NewRequestShimmer";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Elements/loading spinner/LoadingSpinner";

const NewRequest = () => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;
  const { ConfigData, loading } = usePortalConfig();
  const [DynamicForm, setDynamicForm] = useState([]);
  const [LoadSpinner, setLoadSpinner] = useState(false);

  // function to handle the request-types
  const handleRequestType = useCallback(async (event) => {
    setLoadSpinner(true);
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/Requests/requesttypes/metadatas?requesttypename=${event.target.value}`,
        { headers }
      );

      const promise = toast.promise(
        new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(true);
          } else {
            reject(
              new Error(
                "Could not create. There might be some issue with the API"
              )
            );
          }
        }),
        {
          loading: "Creating...",
          success: <b>Successfully Created!</b>,
          error: <b>Could not create. There might some issue with API</b>,
        },
        {
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "0.8rem",
          },
        }
      );
      await promise;
      setLoadSpinner(false);
      const Data = response.data;
      const filteredData = Data.filter(
        (item) =>
          item.FieldDisplayName !== "Request Type" &&
          item.FieldDisplayName !== "Business Area"
      );
      setDynamicForm(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <>
        <NewRequestShimmer />
      </>
    );
  }

  return (
    <>
      {LoadSpinner && <LoadingSpinner />}
      <div className="newrequest-component">
        <div className="main">
          <div className="w-8/12 m-auto">
            <div className="leading-[0.5rem] py-4 px-2">
              <h1 className="text-2xl">Submit a New Request</h1>
              <small className="text-slate-500">
                Submit a New Request to Legal
              </small>
            </div>
            <div className="bg-white p-2">
              {ConfigData.map((val) => (
                <div key={val.RowKey} className={`relative overflow-hidden`}>
                  <input
                    type="checkbox"
                    className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
                    defaultChecked={true}
                  />
                  <div className="px-2">
                    <span className="flex items-center h-[40px] text-lg">
                      Primary Fields
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
                    <IoIosArrowDown />
                  </div>
                  <div
                    className={`max-h-0 peer-checked:max-h-full
          transition-all ease-in-out duration-500 bg-slate-100 overflow-hidden`}
                  >
                    <div className="primary-fields px-4 py-2 pb-2 bg-white shadow-sm">
                      <form>
                        {/* multi business area route */}
                        <MultiBusinessAreaRoute
                          isMultiArea={val.IsMultiBusinessAreaRoute}
                          RequestBusinessAreas={val.RequestBusinessAreas}
                        />
                        <div className="flex flex-col py-2">
                          <label>
                            Request Type
                            <span className="text-red-500 font-bold">*</span>
                          </label>
                          <select
                            name="request_type"
                            className="text-sm p-2 rounded-md border border-slate-300 outline-blue-300 text-black"
                            onChange={handleRequestType}
                          >
                            <option>-select-</option>
                            {val.RequestTypes.map((req) => (
                              <option key={req.id} value={req.type}>
                                {req.type}
                              </option>
                            ))}
                          </select>
                          <small className="px-1 text-slate-500">
                            Type of contract or related document requested
                          </small>
                        </div>

                        {/* dynamic forms */}

                        <DynamicForms DynamicFormData={DynamicForm} />

                        <div className="submit-button flex items-center gap-4 justify-end mt-4 text-sm">
                          <button
                            type="button"
                            className="flex justify-center items-center px-8 py-2 bg-slate-500 text-white rounded-sm"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex justify-center items-center px-8 py-2 bg-blue-500 text-white rounded-sm"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default NewRequest;
