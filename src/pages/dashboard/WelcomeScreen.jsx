function WelcomeScreen() {
  return (
    <>
      <div className="px-1 grid grid-cols-4">
        <div className="col-span-3 pt-10">
          <h1 className="text-4xl heading">
            Welcome to the eContracts Portal !
          </h1>
          <p className="py-4 text-sm pr-[6rem]">
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
