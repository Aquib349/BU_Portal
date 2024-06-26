import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

function Alerts({ heading, link, setShowAlert, showAlert }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <div className="fixed left-0 top-0 z-20 flex h-screen w-[100vw] items-center justify-center overflow-hidden bg-black/50">
        <div
          className={`${
            showAlert ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          {/* toast body */}
          <div className="rounded bg-slate-300 p-1">
            <div className="relative rounded border border-slate-300 bg-white p-2">
              <div className="z-10 flex flex-col items-center justify-center gap-y-2">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-4xl text-red-400">
                    <MdErrorOutline />
                  </div>
                  <h1 className="text-md font-semibold pt-2">{heading}</h1>
                </div>
                <div className="buttons flex gap-4 text-xs text-white">
                  <button
                    type="button"
                    className="flex h-2 w-8 items-center justify-center rounded bg-green-500 p-3"
                    onClick={() => {
                      navigate(link);
                      setShowAlert(false);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="flex h-2 w-8 items-center justify-center rounded bg-red-600 p-3"
                    onClick={() => {
                      setShowAlert(false);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Alerts.propTypes = {
  heading: PropTypes.string,
  link: PropTypes.string,
  setShowAlert: PropTypes.func,
};

export default Alerts;
