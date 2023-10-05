import Layout from "@/components/Layout";
import React, { ReactElement } from "react";
import CoinPriceChart from "./CoinPriceChart";
import SwapPanel from "./SwapPanel";
import TransactionTable from "./TransactionTable";

function SwapPage() {
  return (
    <div className="flex flex-col gap-y-12 container max-sm:mt-0 ">
      <div className="w-full flex flex-row justify-between gap-x-10 max-lg:justify-center">
        <div className="w-full flex flex-col grow bg-light-100 rounded-3xl shadow-lg px-4 max-lg:hidden max-2xl:basis-1/2">
          <div className="flex flex-row justify-between w-full h-16 pl-8 pb-3 pr-32 items-end max-2xl:pr-10 ">
            <div className="font-bold text-xl">ETH/MINA</div>
            <div className="text-emerald-400 text-sm"> 2000 </div>
            <div className="flex flex-col text-sm max-2xl:text-xs">
              <div className="text-black">Change</div>
              <div className="text-emerald-400">0.1111</div>
            </div>
            <div className="flex flex-col text-sm text-black max-2xl:text-xs">
              <div>24H High</div>
              <div>0.1111</div>
            </div>
            <div className="flex flex-col text-sm text-black max-2xl:text-xs">
              <div>24H Low</div>
              <div>0.1111</div>
            </div>
            <div className="flex flex-col text-sm text-black max-2xl:text-xs">
              <div>24H Vol</div>
              <div>0.1111</div>
            </div>
          </div>
          <div className="w-full">
            <CoinPriceChart />
          </div>
        </div>
        <SwapPanel />
      </div>
      <div className="flex flex-col max-sm:hidden">
        <div className="text-left font-bold text-xl">Transactions</div>
        <TransactionTable />
      </div>
    </div>
  );
}

SwapPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
