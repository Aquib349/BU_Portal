function Shimmer() {
  return (
    <>
      <div className="dashboard-shimmer flex w-11/12 m-auto">
        <div className="main w-9/12 p-2">
          <div className="h-8 w-9/12 bg-slate-200 rounded my-1"></div>
          <div className="h-2 w-11/12 bg-slate-200 rounded my-2"></div>
          <div className="h-2 w-10/12 bg-slate-200 rounded my-2"></div>

          {/* request table */}
          <div>
            <div className="h-8 w-5/12 bg-slate-200 rounded mt-8"></div>
            <div className="h-8 bg-slate-200 rounded mt-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
          </div>

          {/* bookmark table */}
          <div>
            <div className="h-8 w-5/12 bg-slate-200 rounded mt-8"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
            <div className="h-4 bg-slate-200 rounded my-2"></div>
          </div>
        </div>
        <div className="main w-3/12 p-2">
          <div>
            <div className="h-8 bg-slate-200 rounded my-1"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
          </div>
          <div>
            <div className="h-8 bg-slate-200 rounded mt-10"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
            <div className="h-16 bg-slate-200 rounded my-2"></div>
            <div className="h-2 bg-slate-200 rounded my-2"></div>
            <div className="h-16 bg-slate-200 rounded my-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shimmer;
