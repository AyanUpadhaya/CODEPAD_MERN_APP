import React from "react";
import { noData } from "../../assets/getAssets";


function NoData() {
  return (
    <div className="w-full py-10 h-full flex items-center justify-center">
      <div>
        <div className="mb-6">
          <img src={noData} alt="" className="w-48" />
        </div>
        <h2 className="text-center text-lg font-semibold">No Data Available!</h2>
      </div>
    </div>
  );
}

export default NoData;
