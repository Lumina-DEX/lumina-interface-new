import TokenSelector from "@/components/Selector/TokenSelector";
import useTokens from "@/states/useTokens";
import clsx from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Tabs } from "react-daisyui";
import CurrencyFormat from "react-currency-format";
import useAccount from "@/states/useAccount";
import Decimal from "decimal.js";
import { Token } from "@/types/token";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const AddLiquidityPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokens = useTokens((state) => state.tokens);
  const balances = useAccount((state) => state.balances);
  const [tabValue, setTabValue] = useState(0);
  const [tmpToken, setTmpToken] = useState<Token>(tokens[0]);

  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [fromAmount, setFromAmount] = useState("");
  const fromTokenBalance = useMemo(
    () => balances[fromToken?.tokenId || ""] || 0,
    [balances, fromToken?.tokenId]
  );

  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [toAmount, setToAmount] = useState("0.0");
  const toTokenBalance = useMemo(
    () => balances[toToken?.tokenId || ""] || 0,
    [balances, toToken?.tokenId]
  );

  useEffect(() => {
    setFromAmount("0");
    let curPath = location.pathname;
    let tmp = searchParams.get("fromToken");
    if (fromToken === toToken) {
      setFromToken(toToken);
      setToToken(tokens.find((token) => token.symbol === tmp)!);
    }
    navigate({
      pathname: curPath,
      search: createSearchParams({
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
      }).toString(),
    });
  }, [fromToken]);

  useEffect(() => {
    setFromAmount("0");
    var curPath = location.pathname;
    let tmp = searchParams.get("toToken");
    if (fromToken === toToken) {
      setFromToken(tokens.find((token) => token.symbol === tmp)!);
      setToToken(fromToken);
    }
    navigate({
      pathname: curPath,
      search: createSearchParams({
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
      }).toString(),
    });
  }, [toToken]);

  return (
    <div className="bg-light-200 rounded-3xl shadow-lg flex flex-col w-[470px] overflow-hidden">
      {/* from */}
      <div className="w-full p-8 bg-light-100">
        <div className="flex flex-col w-full gap-4">
          <h3 className="text-primary text-xl font-semibold text-left">
            Add Liquidity
          </h3>

          <div className="flex justify-between items-center w-full">
            <TokenSelector token={fromToken} setToken={setFromToken} />
            <span className="font-secondary">
              Balance {fromTokenBalance.toString(2)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-baseline gap-2">
              <CurrencyFormat
                className="bg-transparent text-default text-3xl focus:outline-none w-40"
                thousandSeparator={true}
                decimalScale={2}
                placeholder="0.0"
                value={fromAmount}
                onValueChange={({ value }) => setFromAmount(value)}
              />
              <CurrencyFormat
                className="font-secondary text-disabled"
                displayType="text"
                thousandSeparator={true}
                decimalScale={2}
                prefix="~$"
                value={new Decimal(fromToken?.usdPrice || "0")
                  .times(fromAmount || "0")
                  .toString()}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="opacity-50"
                color="secondary"
                size="xs"
                onClick={() =>
                  setFromAmount((Number(fromTokenBalance) / 2).toString())
                }
              >
                50%
              </Button>
              <Button
                className="opacity-50"
                color="secondary"
                size="xs"
                onClick={() => setFromAmount(fromTokenBalance.toString())}
              >
                Max
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* to */}
      <div className="w-full p-8">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full">
            <TokenSelector token={toToken} setToken={setToToken} />
            <span className="font-secondary">
              Balance {toTokenBalance.toString(2)}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <CurrencyFormat
              displayType="text"
              className="bg-transparent text-default text-3xl text-left focus:outline-none w-40"
              thousandSeparator={true}
              decimalScale={2}
              placeholder="0.0"
              value={toAmount}
            />
            <CurrencyFormat
              displayType="text"
              className="font-secondary text-disabled"
              thousandSeparator={true}
              decimalScale={2}
              prefix="~$"
              value={new Decimal(toToken?.usdPrice || "0")
                .times(toAmount || "0")
                .toString()}
            />
          </div>

          <div className="w-full flex gap-8">
            {fromToken && toToken ? (
              <>
                <Button
                  className="grow h-[60px] min-h-0 shadow-md"
                  color="secondary"
                  size="lg"
                >
                  Approve {fromToken.symbol.toUpperCase()}
                </Button>
                <Button
                  className="grow h-[60px] min-h-0 shadow-md"
                  color="secondary"
                  size="lg"
                >
                  Approve {toToken.symbol.toUpperCase()}
                </Button>
              </>
            ) : (
              <Button
                className="w-full h-[60px] min-h-0 bg-light-300 shadow-md pointer-events-none"
                color="neutral"
                size="lg"
              >
                Invalid Pair
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLiquidityPanel;
