import React from "react";

import { error, warningtwo } from "../../assets/getAssets";

function ConfirmationModal({ onChange,handleDelete }) {
  return (
    <>
      <input type="checkbox" id="ConfirmationModal" className="modal-toggle" />
      <div className="modal px-6" role="dialog">
        <div className="modal-box w-full max-w-[640px] bg-neutral-50  rounded-3xl py-4 px-4 sm:pt-16 sm:px-16 sm:pb-8 ">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mx-auto">
                <img
                  src={warningtwo}
                  alt=""
                  className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className=" text-errors-82 font-monts text-xl sm:text-4xl font-bold">
                  Delete
                </h2>
                <p className=" text-black-700 font-monts text-base sm:text-2xl">
                  <input
                    type="text"
                    id="key"
                    name="key"
                    placeholder="SECRET KEY"
                    required
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-900"
                  />
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6">
              <label
                htmlFor="ConfirmationModal"
                className="btn btn-warning sm:w-[200px] text-xs sm:text-base"
              >
                No, Cancel
              </label>
              <label
                htmlFor="ConfirmationModal"
                onClick={() => handleDelete()}
                className="btn btn-error text-white  sm:w-[200px] text-xs sm:text-base"
              >
                Yes, Delete
              </label>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="ConfirmationModal">
          Close
        </label>
      </div>
    </>
  );
}

export default ConfirmationModal;
