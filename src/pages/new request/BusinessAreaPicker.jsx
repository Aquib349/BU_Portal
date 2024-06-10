import Accordion from "../../Elements/Accordion";
import { MdDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";

function BusinessAreaPicker({
  setBusinessArea,
  showModal,
  setShowModal,
  RequestBusinessAreas,
}) {
  return (
    <>
      <div className="p-2">
        {RequestBusinessAreas.map((val) => (
          <div key={val.id} className="border-b">
            <Accordion heading={val.name} checked={false}>
              <div
                className="flex items-center gap-2 px-3 py-2"
                onClick={() => {
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
  setBusinessArea: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  RequestBusinessAreas: PropTypes.array.isRequired,
};

export default BusinessAreaPicker;
