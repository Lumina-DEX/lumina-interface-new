import Layout from "@/components/Layout";
import TokenSelector from "@/components/Selector/TokenSelector";
import { NextPageWithLayout } from "@/pages/_app.page";
import useAccount from "@/states/useAccount";
import useTokens from "@/states/useTokens";
import { Token } from "@/types/token";
import React, { ReactElement, useMemo, useState } from "react";
import CurrencyFormat from "react-currency-format";
import Decimal from "decimal.js";
import { Button, Input } from "react-daisyui";

const TransferPage: NextPageWithLayout = () => {
  const tokens = useTokens((state) => state.tokens);
  const balances = useAccount((state) => state.balances);

  const [token, setToken] = useState<Token>(tokens[0]);
  const tokenBalance = useMemo(
    () => balances[token!.id] || 0,
    [balances, token]
  );
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <div className="card max-w-md">
      <div className="flex flex-col items-center pt-6">
        <h1 className="font-bold text-2xl">Send</h1>
      </div>

      {/* Send */}
      <div className="w-full bg-light-100 py-6 px-10">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between items-center w-full">
            <TokenSelector token={token} setToken={setToken} />
            <span className="font-secondary">
              Balance {tokenBalance.toString(2)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full flex-row gap-2">
            <div className="flex flex-row items-baseline gap-2 justify-between">
              <div className="text-left">
                <CurrencyFormat
                  className="w-full bg-transparent text-default text-3xl focus:outline-none "
                  thousandSeparator={true}
                  decimalScale={2}
                  placeholder="0.0"
                  value={amount}
                  onValueChange={({ value }) => setAmount(value)}
                />
              </div>
              <div className="text-left">
                <CurrencyFormat
                  className="w-full font-secondary text-disabled"
                  displayType="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix="~$"
                  value={new Decimal(token!.usdPrice || "0")
                    .times(amount || "0")
                    .toString()}
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-2">
              <Button
                className="text-white bg-pink-200"
                color="secondary"
                size="xs"
                onClick={() => setAmount((Number(tokenBalance) / 2).toString())}
              >
                50%
              </Button>
              <Button
                className="text-white bg-pink-200"
                color="secondary"
                size="xs"
                onClick={() => setAmount(tokenBalance.toString())}
              >
                Max
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient */}
      <div className="w-full bg-light-200 py-6 px-10 text-black rounded-b-3xl">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-lg">Recipient</h2>
          <Input
            className="w-full bg-transparent"
            placeholder="View on Minascan"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </div>

        <Button
          className="w-full h-[48px] min-h-0 shadow-md mt-6"
          color="primary"
          size="lg"
          disabled={!recipient || !amount}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

TransferPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TransferPage;
