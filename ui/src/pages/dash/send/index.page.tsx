import Layout from "@/components/Layout";
import TokenSelector from "@/components/Selector/TokenSelector";
import { NextPageWithLayout } from "@/pages/_app.page";
import useAccount from "@/states/useAccount";
import useTokens from "@/states/useTokens";
import { Token } from "@/types/token";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import CurrencyFormat from "react-currency-format";
import Decimal from "decimal.js";
import { Button, Input, Loading } from "react-daisyui";
import { mina } from "@/lib/wallet";
import {
  SendTransactionResult,
  ProviderError,
} from "@aurowallet/mina-provider";

const TransferPage: NextPageWithLayout = () => {
  const tokens = useTokens((state) => state.tokens);
  const address = useAccount((state) => state.publicKeyBase58);
  const balances = useAccount((state) => state.balances);

  const [token, setToken] = useState<Token>(tokens[0]);
  const tokenBalance = useMemo(
    () => (token ? balances[token!.symbol.toLowerCase()] || 0 : 0),
    [balances, token]
  );
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    try {
      setErrorMessage("");
      setLoading(true);

      let data: SendTransactionResult | ProviderError = await mina
        ?.sendPayment({
          amount: amount,
          to: recipient,
          fee: "",
          memo: "",
        })
        .catch((err: any) => err);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [recipient]);

  return (
    <div className="card max-w-md font-metrophobic">
      {tokens.length > 0 ? (
        <div>
          <div className="flex flex-col items-center pt-6">
            <h1 className="font-bold text-2xl font-orbitron">Send</h1>
          </div>

          {/* Send */}
          <div className="w-full bg-light-100 py-6 px-10 max-[420px]:px-6">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-between items-center w-full">
                <TokenSelector token={token} setToken={setToken} />
                <span className="font-secondary">Balance {tokenBalance}</span>
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
                      value={new Decimal(token!.usd_price || "0")
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
                    onClick={() =>
                      setAmount((Number(tokenBalance) / 2).toString())
                    }
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
          <div className="w-full bg-light-200 py-6 px-10 text-black rounded-b-3xl max-[420px]:px-6">
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Recipient</h2>
              <Input
                className="w-full bg-transparent"
                placeholder="Enter Wallet Address"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
              />
            </div>

            <Button
              className="w-full h-[48px] min-h-0 shadow-md mt-6 font-orbitron"
              color="primary"
              size="lg"
              disabled={!address || !recipient || !amount}
              onClick={handleSend}
              loading={loading}
            >
              Send
            </Button>

            <p className="text-error">{errorMessage}</p>
          </div>
        </div>
      ) : (
        <Loading color="primary" />
      )}
    </div>
  );
};

TransferPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TransferPage;
