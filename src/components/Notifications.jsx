import PropType from "prop-types";
import { RxCross2 } from "react-icons/rx";

function Notification({ showModal, setShowModal }) {
  return (
    <>
      <div className="Notification-component">
        <div className="main">
          {showModal ? (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="fixed w-full h-full top-0 right-0 flex justify-end">
                  <div
                    className="w-[400px] bg-white border border-gray-300 rounded-sm
                     transition-all ease-in-out duration-700"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="relative flex flex-col">
                      <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 bg-slate-100 rounded-t">
                        <h3 className="text-xl font-medium">Alerts</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-7 float-right focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="text-black opacity-7 text-2xl">
                            <RxCross2/>
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <div className="gap-4 text-sm pb-6 p-2 flex items-center">
                          <span className="shadow shadow-slate-400 px-3 py-1 rounded-sm cursor-pointer font-medium text-blue-600">Unread</span>
                          <span className="">Contracts | Follow</span>
                        </div>
                        <div className="">
                            <div className=" leading-5 border-b border-slate-200 p-3 mb-2
                             cursor-pointer">
                                <p>{('IT Service Agreement Request / 16th FEB 24 - 1 Request deleted by Hariharan N').slice(0,40)}...</p>
                                <small className="text-slate-500 text-[0.8rem]">2 months ago</small>
                            </div>

                            <div className=" leading-5 border-b border-slate-200 p-2 mb-2
                             cursor-pointer">
                                <p>{('IT Service Agreement Request / 16th FEB 24 - 1 Request deleted by Hariharan N').slice(0,40)}...</p>
                                <small className="text-slate-500 text-[0.8rem]">2 months ago</small>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* <div
            className={`fixed h-full bg-white p-2 transition-all ease-linear duration-300 
          ${showModal ? "w-4/12" : "w-0 overflow-hidden"}`}
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              consequatur qui quidem doloremque eaque facilis, optio quisquam
              est aliquam nemo adipisci. Consequatur ipsam eum sapiente sit
              exercitationem explicabo natus veniam.
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}

Notification.propTypes = {
  showModal: PropType.bool.isRequired,
  setShowModal: PropType.func.isRequired,
};

export default Notification