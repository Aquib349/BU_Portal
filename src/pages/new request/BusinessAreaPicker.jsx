import Accordion from "../../Elements/Accordion";
import { MdDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";
import axios from "axios";

function BusinessAreaPicker({
  setBusinessArea,
  showModal,
  setShowModal,
  RequestBusinessAreas,
  setBusinessAreaName,
  setContractAreaAdministrators,
  setBusinessAreaOwners,
  setBusinessAreaPath,
}) {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  // function to get contractAdiministrator, businessareowner, businessareapath
  async function getDetail(id, contractAreaName) {
    const headers = {
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      // Perform all three API calls concurrently
      const [response1, response2, response3] = await Promise.all([
        axios.get(
          `${api}/api/accounts/${account_id}/businessarea?businessareaid=${id}`,
          { headers },
        ),
        axios.get(
          `${api}/api/accounts/${account_id}/businessarea/businessarealocation?businessareaid=${id}`,
          { headers },
        ),
        axios.get(
          `${api}/api/accounts/${account_id}/businessarea/contractareadetailsbyname?contractareaname=${contractAreaName}`,
          { headers },
        ),
      ]);

      // Destructure data from responses
      const { data: data1 } = response1;
      const { data: data2 } = response2;
      const { data: data3 } = response3;

      // Set state or handle data as needed
      setBusinessAreaOwners(data1.Owner);
      setBusinessAreaPath(data2);
      setContractAreaAdministrators(data3.Owner);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }

  return (
    <>
      <div className="p-2">
        {RequestBusinessAreas.map((val) => (
          <div key={val.id} className="border-b">
            <Accordion heading={val.name} checked={false}>
              <div
                className="flex items-center gap-2 px-3 py-2"
                onClick={() => {
                  getDetail(val.id, val.name);
                  setBusinessArea(val.businessArea);
                  setBusinessAreaName(val.name);
                  setShowModal(!showModal);
                }}
              >
                <span>
                  <MdDoubleArrow />
                </span>
                <small>{val.businessArea}</small>
              </div>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}

BusinessAreaPicker.propTypes = {
  setBusinessArea: PropTypes.func,
  setBusinessAreaName: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  RequestBusinessAreas: PropTypes.array,
  setContractAreaAdministrators: PropTypes.func,
  setBusinessAreaOwners: PropTypes.func,
  setBusinessAreaPath: PropTypes.func,
};

export default BusinessAreaPicker;
