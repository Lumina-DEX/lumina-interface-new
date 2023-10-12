import React from "react";
import Link from "next/link";

const KYCPanel = () => {
  return (
    <div className="p-8 bg-light-100 rounded-3xl shadow-lg flex flex-col gap-y-4 w-[400px] overflow-hidden max-[420px]:w-[300px]">
      <p className="text-black">
        Complete KYC to access additional liquidity on Lumina
      </p>
      <div className="flex justify-center">
        <Link
          href="/dash/kyc"
          className="btn w-full min-h-0 shadow-md btn-primary text-lg"
        >
          Start KYC
        </Link>
      </div>
    </div>
  );
};

export default KYCPanel;
