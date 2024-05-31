import PropTypes from "prop-types";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ toggleModal, heading, children, set_Width }) => {
  useEffect(() => {
    // Add class to body to prevent scrolling when the modal is open
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalLeft = document.body.style.left;
    const originalScrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${originalScrollY}px`;
    document.body.style.width = "100%";
    document.body.style.left = "0";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.left = originalLeft;
      window.scrollTo(0, originalScrollY);
    };
  }, []);

  return (
    <>
      <div className="modal_component">
        <div
          className={`modal inset-0 z-50 items-center justify-center fixed h-[100vh] overflow-scroll bg-black/60`}
        >
          <div className="flex justify-center mt-10">
            <div
              className={`modal-content relative rounded-sm bg-white pb-4 drop-shadow-xl ${
                set_Width ? `max-w-6xl` : "max-w-xl"
              } w-11/12 animation-zoomIn`}
            >
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
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  heading: PropTypes.any,
  children: PropTypes.object.isRequired,
  set_Width: PropTypes.bool,
};

export default Modal;
