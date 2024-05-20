import React from "react";

const RequestDetailShimmer = () => {
  return (
    <>
      <div className="w-8/12 m-auto grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-3">
          <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
          <div className="grid grid-cols-4 gap-x-4">
            <div className="h-8 bg-slate-200 rounded my-1"></div>
            <div className="h-8 bg-slate-200 rounded my-1"></div>
            <div className="h-8 bg-slate-200 rounded my-1"></div>
            <div className="h-8 bg-slate-200 rounded my-1"></div>
          </div>
          <div className="">
            <div className="flex gap-4 items-center">
              <div className="h-8 w-3/12 bg-slate-200 rounded my-1"></div>
              <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-8 w-3/12 bg-slate-200 rounded my-1"></div>
              <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-8 w-3/12 bg-slate-200 rounded my-1"></div>
              <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-8 w-3/12 bg-slate-200 rounded my-1"></div>
              <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-8 w-full bg-slate-200 rounded my-1 mb-2"></div>
          <div className="h-8 w-full bg-slate-200 rounded my-1 mb-2"></div>
          <div className="h-8 w-full bg-slate-200 rounded my-1 mb-2"></div>
          <div className="h-8 w-full bg-slate-200 rounded my-1 mb-2"></div>
          <div className="h-8 w-full bg-slate-200 rounded my-1 mb-2"></div>
          <div className="h-8 w-full bg-slate-200 rounded my-1"></div>
        </div>
      </div>
    </>
  );
};

export default RequestDetailShimmer;
