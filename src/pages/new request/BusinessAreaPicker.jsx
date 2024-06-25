import Accordion from "../../Elements/Accordion";
import { MdDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";

function BusinessAreaPicker({
  setBusinessArea,
  showModal,
  setShowModal,
  RequestBusinessAreas,
  getDetail,
}) {

  return (
    <>
      <div className="p-2">
        {RequestBusinessAreas.map((val) => (
          <div key={val.id} className="border-b">
            <Accordion heading={val.name} checked={false} bgRequired={true}>
              <div
                className="flex items-center gap-2 px-3 py-2"
                onClick={() => {
                  getDetail(val.id, val.name);
                  setBusinessArea(val.businessArea);
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
