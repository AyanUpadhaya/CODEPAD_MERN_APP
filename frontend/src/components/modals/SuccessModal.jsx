import React from "react";
import { success } from "../../assets/getAssets";
const SuccessModal = ({ data, msg, isSuccess, handleNavigate }) => {
  return (
    <>
      <input
        type="checkbox"
        id="successModal"
        className="modal-toggle"
        checked={isSuccess}
        onChange={() => {}}
      />
      <div className="modal px-6" role="dialog">
        <div className="modal-box w-full max-w-[640px] bg-neutral-50 border rounded-3xl p-4 sm:pt-16 sm:px-16 sm:pb-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mx-auto">
                <img
                  src={success}
                  alt=""
                  className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className=" text-successs font-monts text-xl sm:text-4xl font-bold">
                  Successful!
                </h2>
                {data?.secret && (
                  <p className=" text-black-700 font-monts text-base sm:text-2xl">
                    {"Your secret key: " + data?.secret}
                  </p>
                )}
                <p className=" text-black-700 font-monts text-base sm:text-2xl">
                  {msg}
                </p>
              </div>
            </div>
            <div>
              <div className="w-full flex justify-center">
                <label
                  onClick={() => {
                    handleNavigate(`/details/${data.id}`);
                  }}
                  htmlFor="successModal"
                  className="btn btn-success"
                >
                  Continue
                </label>
              </div>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="successModal">
          Close
        </label>
      </div>
    </>
  );
};

export default SuccessModal;
