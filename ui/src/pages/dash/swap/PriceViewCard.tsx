import useTokens from "@/states/useTokens";
import { Token } from "@/types/token";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CoinPriceChart from "./CoinPriceChart";

function PriceViewCard() {
  const tokens = useTokens((state) => state.tokens);
  const searchParams = useSearchParams();
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);

  useEffect(() => {
    setFromToken(
      tokens.find((token) => token.id === searchParams.get("fromToken"))!
    );
    setToToken(
      tokens.find((token) => token.id === searchParams.get("toToken"))!
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="w-full h-[500px] grow card justify-between p-4 flex-1 max-lg:hidden overflow-hidden z-0 font-metrophobic">
      <div className="flex flex-row justify-between w-full h-16 pl-8 pb-3 pr-32 items-end max-2xl:pr-10 ">
        <div className="font-bold text-xl">
          {fromToken ? `${fromToken.symbol} / ${toToken.symbol}` : ""}
        </div>
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
  );
}

export default PriceViewCard;
