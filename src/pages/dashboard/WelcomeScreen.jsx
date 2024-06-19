import { useState } from "react";
import Modal from "../../Elements/Modal";
import Faqs from "./Faqs";

function WelcomeScreen() {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <>
      {show && (
        <Modal
          toggleModal={toggleModal}
          heading="FAQ's & Help Documents"
          set_Width={true}
        >
          <Faqs />
        </Modal>
      )}
      <div className="grid grid-cols-4 px-1">
        <div className="col-span-3 pt-10">
          <div className="relative flex gap-3">
            <h1 className="text-4xl">Welcome to the eContracts Portal !</h1>
            <button className="box shadow-faq" onClick={() => setShow(!show)}>
              <span>FAQ</span>
            </button>
          </div>
          <p className="py-4 pr-[6rem] text-sm">
            This portal allows you to request preparation or review of contracts
            or related documents. To begin a new request, please click on the
            blue “Submit a New Request” button in the top right corner. You may
            also see your previously submitted contract requests under “My
            Requests” below.
          </p>
        </div>
        <div>
          <img
            src="https://app-otbt-econ-test.azurewebsites.net/Content/BUPortal/Images/welcome_bg.svg"
            alt="image"
            className="w-[250px]"
          />
        </div>
      </div>
    </>
  );
}

export default WelcomeScreen;
