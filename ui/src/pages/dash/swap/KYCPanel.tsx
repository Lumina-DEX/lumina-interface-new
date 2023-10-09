import React, { useEffect, useMemo, useState } from "react";

const KYCPanel = () => {
  return (
    <div className="p-5 bg-light-100 rounded-3xl shadow-lg flex flex-col gap-y-4 w-[400px] overflow-hidden max-[420px]:w-[300px]">
      <p className="text-black">
        Complete KYC to access additional liquidity on Lumina
      </p>
      <div>
        <button className="btn w-full h-[50px] min-h-0 shadow-md btn-lg btn-primary">
          Start KYC
        </button>
      </div>
    </div>
  );
};

export default KYCPanel;
