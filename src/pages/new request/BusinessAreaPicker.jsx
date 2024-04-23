import Accordion from "../../Elements/Accordion";
import { MdDoubleArrow } from "react-icons/md";
import PropTypes from "prop-types";

function BusinessAreaPicker({ setBusinessArea, showModal, setShowModal }) {
  return (
    <>
      <div className="p-2">
        <Accordion heading="Human Resource" checked={false}>
          <div
            className="flex items-center gap-2 px-3 py-2"
            onClick={() => {
              setBusinessArea("Human Resource- Business Area");
              setShowModal(!showModal);
            }}
          >
            <span>
              <MdDoubleArrow />
            </span>
            <small>Human Resource- Business Area</small>
          </div>
        </Accordion>
        <Accordion heading="Information Technology" checked={false}>
          <div
            className="flex items-center gap-2 px-3 py-2"
            onClick={() => {
              setBusinessArea("Information Technology- Business Area");
              setShowModal(!showModal);
            }}
          >
            <span>
              <MdDoubleArrow />
            </span>
            <small>Information Technology- Business Area</small>
          </div>
        </Accordion>
        <Accordion heading="Legal Affairs" checked={false}>
          <div
            className="flex items-center gap-2 px-3 py-2"
            onClick={() => {
              setBusinessArea("Legal Affairs- Business Area");
              setShowModal(!showModal);
            }}
          >
            <span>
              <MdDoubleArrow />
            </span>
            <small>Legal Affairs- Business Area</small>
          </div>
        </Accordion>
        <Accordion heading="Procurement" checked={false}>
          <div
            className="flex items-center gap-2 px-3 py-2"
            onClick={() => {
              setBusinessArea("Procurement- Business Area");
              setShowModal(!showModal);
            }}
          >
            <span>
              <MdDoubleArrow />
            </span>
            <small>Procurement- Business Area</small>
          </div>
        </Accordion>
      </div>
    </>
  );
}

BusinessAreaPicker.propTypes = {
  setBusinessArea: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default BusinessAreaPicker;
