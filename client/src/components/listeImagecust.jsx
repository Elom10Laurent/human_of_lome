import React from "react";

export const listeImagecust = () => {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 mt-1 sm:py-32 ">
        <img
          src=""
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className=" flex items-center justify-center just mx-auto max-w-7xl  text-center px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="grid mt-2 gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              <div className="cursor-pointer gap-1 bg-transparent p-6 text-4xl text-gray-600 inline-flex justify-center ">
                Series
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
