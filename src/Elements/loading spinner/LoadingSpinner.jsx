import Spinner from "./Spinner";

function LoadingSpinner() {
  return (
    <>
      <div className="loading-spinner">
        <div
          className="main flex justify-center items-center w-full h-[100vh] overflow-hidden
         fixed top-0 bg-black/50 z-20"
        >
          <Spinner />
        </div>
      </div>
    </>
  );
}

export default LoadingSpinner;
