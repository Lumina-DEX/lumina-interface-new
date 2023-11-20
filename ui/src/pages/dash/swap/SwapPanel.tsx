import TokenSelector from "@/components/Selector/TokenSelector";
import TransactionsSetting from "@/components/DropDown/TransactionSettings";
import useAccount from "@/states/useAccount";
import useTokens from "@/states/useTokens";
import { Token } from "@/types/token";
import clsx from "classnames";
import Decimal from "decimal.js";
import React, { useEffect, useMemo, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Button, Dropdown, Tabs } from "react-daisyui";
import { BiCog } from "react-icons/bi";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import useLoad from "@/states/useLoad";
import { connect } from "@/lib/wallet";

type Percent = number | string;

const SwapPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokens = useTokens((state) => state.tokens);
  const { kycVerified, address, balances } = useAccount((state) => ({
    kycVerified: state.kycVerified,
    address: state.publicKeyBase58,
    balances: state.balances,
  }));
  const [tabValue, setTabValue] = useState(0);

  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [fromAmount, setFromAmount] = useState("");
  const fromTokenBalance = useMemo(() => {
    let tokenName = fromToken!.symbol;
    return balances[tokenName.toLowerCase()] || 0;
  }, [balances, fromToken]);

  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [toAmount, setToAmount] = useState("0.0");
  const toTokenBalance = useMemo(
    () => balances[toToken!.symbol.toLowerCase()] || 0,
    [balances, toToken]
  );

  const [slippagePercent, setSlippagePercent] = useState<Percent>(0);

  const { loadState } = useLoad((state) => ({
    loadState: state.state,
  }));

  useEffect(() => {
    setFromAmount("0");
    if (fromToken === toToken) {
      setFromToken(toToken);
      setToToken(
        tokens.find((token) => token.id === searchParams.get("fromToken"))!
      );
    }
    const newSearchParams = new URLSearchParams();
    newSearchParams.append("fromToken", fromToken.id);
    newSearchParams.append("toToken", toToken.id);

    router.push({
      pathname: router.pathname,
      search: newSearchParams.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromToken]);

  useEffect(() => {
    setFromAmount("0");
    if (fromToken === toToken) {
      setFromToken(
        tokens.find((token) => token.id === searchParams.get("toToken"))!
      );
      setToToken(fromToken);
    }
    const newSearchParams = new URLSearchParams();
    newSearchParams.append("fromToken", fromToken.id);
    newSearchParams.append("toToken", toToken.id);

    router.push({
      pathname: router.pathname,
      search: newSearchParams.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toToken]);

  const handleConnectWallet = async () => {
    connect();
  };

  return (
    <div className="bg-light-200 card w-[400px] overflow-hidden max-[420px]:w-[300px]">
      <Tabs
        className="w-full"
        variant="lifted"
        size="lg"
        value={tabValue}
        onChange={setTabValue}
      >
        <Tabs.Tab
          className={clsx("!border-0 grow", {
            "text-primary": tabValue === 0,
            "text-disabled": tabValue !== 0,
          })}
          value={0}
        >
          Swap
        </Tabs.Tab>
        <Tabs.Tab
          className={clsx(
            "!border-0 grow",
            {
              "text-primary": tabValue === 1,
              "text-disabled": tabValue !== 1,
            },
            "pointer-events-none"
          )}
          value={1}
          disabled
        >
          Limit
        </Tabs.Tab>
      </Tabs>

      {/* Swap from */}
      <div className="relative w-full p-8 pt-12 bg-light-100 font-metrophobic">
        <div className="absolute top-3 right-3 cursor-pointer">
          <Dropdown horizontal="left" vertical="bottom">
            <Dropdown.Toggle className="[&>button]:p-0">
              <BiCog className="text-default p-0" size={30} />
            </Dropdown.Toggle>
            <TransactionsSetting setSlippagePercent={setSlippagePercent} />
          </Dropdown>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full">
            <TokenSelector token={fromToken} setToken={setFromToken} />
            <span className="font-metrophobic">Balance {fromTokenBalance}</span>
          </div>
          <div className="flex justify-between items-center w-full flex-row">
            <div className="basis-1/2">
              <div className="flex flex-row items-baseline gap-2 justify-between">
                <div className="text-left">
                  <CurrencyFormat
                    className="w-full bg-transparent text-default text-3xl focus:outline-none "
                    thousandSeparator={true}
                    decimalScale={2}
                    placeholder="0.0"
                    value={fromAmount}
                    onValueChange={({ value }) => setFromAmount(value)}
                  />
                </div>
                <div className="text-left">
                  <CurrencyFormat
                    className="w-full font-metrophobic text-disabled"
                    displayType="text"
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix="~$"
                    value={new Decimal(fromToken!.usd_price || "0")
                      .times(fromAmount || "0")
                      .toString()}
                  />
                </div>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="flex justify-end gap-x-2">
                <Button
                  className="text-white bg-pink-200"
                  color="secondary"
                  size="xs"
                  onClick={() =>
                    setFromAmount((Number(fromTokenBalance) / 2).toString())
                  }
                >
                  50%
                </Button>
                <Button
                  className="text-white bg-pink-200"
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
      </div>

      {/* Swap to */}
      <div className="w-full p-8 font-metrophobic">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full">
            <TokenSelector token={toToken} setToken={setToToken} />
            <span className="font-metrophobic">Balance {toTokenBalance}</span>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/2">
              <div className="flex flex-row items-baseline gap-2 justify-between">
                <div className="text-left">
                  <CurrencyFormat
                    displayType="text"
                    className="w-full bg-transparent text-default text-3xl text-left focus:outline-none"
                    thousandSeparator={true}
                    decimalScale={2}
                    placeholder="0.0"
                    value={toAmount}
                  />
                </div>
                <div className="text-left">
                  <CurrencyFormat
                    displayType="text"
                    className="font-metrophobic text-disabled"
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix="~$"
                    value={new Decimal(toToken!.usd_price || "0")
                      .times(toAmount || "0")
                      .toString()}
                  />
                </div>
              </div>
            </div>
            <div className="basis-1/2"></div>
          </div>
          {/* Slippage Tolerance */}

          <div className="flex justify-between text-black">
            <p> Slippage Tolerance </p>

            <p>
              {typeof slippagePercent === "number"
                ? new Intl.NumberFormat("en-US", {
                    style: "percent",
                    maximumFractionDigits: 2,
                  }).format(slippagePercent / 100)
                : "Invalid"}
            </p>
          </div>
          {address ? (
            <div className="flex flex-col gap-y-4">
              <Button
                className="w-full h-[60px] min-h-0 shadow-md font-orbitron"
                color="primary"
                size="lg"
                disabled={!loadState}
              >
                Swap
              </Button>
              {!kycVerified && address && (
                <div>
                  Complete KYC to access additional permissioned pool liquidity
                </div>
              )}
            </div>
          ) : (
            <Button
              className="btn-primary text-white font-orbitron"
              onClick={handleConnectWallet}
              disabled={!loadState}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapPanel;
