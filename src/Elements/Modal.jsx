import { memo } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";

const Modal = memo(function Modal({ toggleModal, heading, children }) {
  return (
    <>
      <div className="modal_component">
        <div
          className={`modal inset-0 z-50 items-center justify-center fixed h-[100vh] bg-black/40`}
        >
          <div className="flex justify-center mt-10">
            <div className="modal-content relative rounded-sm bg-white pb-8 drop-shadow-xl max-w-xl w-11/12 animation-zoomIn">
              <div className="modal-header px-2 py-3 border-b border-slate-400">
                <h2 className="text-xl text-start px-2 text-gray-800">
                  {heading}
                </h2>
                <div
                  className="text-2xl absolute top-4 right-6 font-bold leading-8 cursor-pointer
               text-slate-500 hover:text-slate-700"
                  onClick={toggleModal}
                >
                  <RxCross2 />
                </div>
              </div>
              <div className="text-start px-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
