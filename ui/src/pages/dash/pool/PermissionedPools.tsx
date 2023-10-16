import React, { useEffect, useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Table, Button, Collapse, Loading } from "react-daisyui";
import { Pool } from "@/types/pool";
import useAccount from "@/states/useAccount";
import { CgUnavailable } from "react-icons/cg";
import Link from "next/link";
import { connect } from "@/lib/wallet";
import useSupabaseFunctions from "@/services/supabase";
import { BsCircle } from "react-icons/bs";
import { Database } from "@/lib/database.types";
interface Props {
  pools: Pool[];
}

const PermissionedPools: React.FC<Props> = () => {
  const [pools, setPools] = useState<any[]>([]);
  const { getPools } = useSupabaseFunctions();
  const { walletConnected, kycVerified } = useAccount((state) => ({
    walletConnected: state.hasBeenSetup,
    kycVerified: state.kycVerified,
  }));

  useEffect(() => {
    getPools().then((response) => {
      const { status, data } = response;
      if (status === 200 && data) {
        setPools(data);
      }
    });
  }, []);

  const handleConnectWallet = async () => {
    connect();
  };

  return (
    <div>
      <div className="py-4 hidden md:block">
        <div className="flex flex-col gap-y-4">
          <div className="text-center font-bold text-black">
            Connect Wallet and Complete KYC to access permissioned liquidity on
            Lumina
          </div>
          {pools.length ? (
            <Table className="rounded-box px-8" zebra>
              <Table.Head className="text-base text-default">
                <div className="flex items-center gap-4">
                  <span>Name</span>
                  <SearchInput
                    className="bg-transparent font-secondary py-2 px-3 h-auto pr-8"
                    placeholder="Search"
                  />
                </div>
                <span className="max-md:hidden">Your Liquidity</span>
                <span className="max-sm:hidden">Total Liquidity</span>
                <span>APR</span>
              </Table.Head>

              <Table.Body>
                {pools.map((pool, index) => {
                  return (
                    <Table.Row key={index} className="text-disabled">
                      <div className="flex justify-between">
                        <Link
                          href={`/dash/add?fromToken=${pool.from_token.id}&toToken=${pool.to_token.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar.Group>
                              <Avatar
                                className="border-0"
                                src={pool.from_token.icon}
                                shape="circle"
                                size={30}
                              />
                              <Avatar
                                className="border-0"
                                src={pool.to_token.icon}
                                shape="circle"
                                size={30}
                              />
                            </Avatar.Group>
                            <span className="uppercase text-base">
                              {pool.from_token.symbol} / {pool.to_token.symbol}
                            </span>
                          </div>
                        </Link>
                        {kycVerified ? (
                          index ? (
                            <div className="flex flex-row items-center gap-x-1 w-28 justify-start">
                              <CgUnavailable className="text-rose-500 text-[18px]" />
                              Restricted
                            </div>
                          ) : (
                            <div className="flex flex-row items-center gap-x-1 w-28 justify-start">
                              <BsCircle className="text-emerald-400 font-bold" />
                              Available
                            </div>
                          )
                        ) : (
                          <div className="flex flex-row items-center gap-x-1 w-28 justify-start">
                            <CgUnavailable className="text-rose-500 text-[18px]" />
                            Restricted
                          </div>
                        )}
                      </div>
                      <CurrencyFormat
                        displayType="text"
                        className="font-secondary text-left text-base max-md:hidden"
                        thousandSeparator
                        decimalScale={2}
                        value={0}
                      />
                      <CurrencyFormat
                        displayType="text"
                        className="font-secondary text-left text-base max-sm:hidden"
                        thousandSeparator
                        decimalScale={2}
                        value={pool.total_liquidity}
                      />
                      <CurrencyFormat
                        displayType="text"
                        className="font-secondary text-left text-base"
                        decimalScale={2}
                        suffix="%"
                        value={pool.apr}
                      />
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          ) : (
            <div className="text-center">
              <Loading variant="dots" />
            </div>
          )}

          {walletConnected ? (
            kycVerified ? (
              <div className="flex justify-center">
                <Link
                  href="/dash/kyc"
                  className="btn py-2 shadow-md btn-primary w-[160px] text-lg"
                >
                  Start KYC
                </Link>
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="flex justify-center">
              <Button
                className="btn-primary text-white"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            </div>
          )}
          <div className="text-center font-bold text-black">
            Permissioned pool creation and management only available <br />
            to Enterprise users who complete KYB
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {pools.map((pool, index) => (
          <Collapse checkbox icon="arrow" key={index}>
            <Collapse.Title className="text-xl font-medium">
              <div className="flex items-center gap-2">
                <Avatar.Group>
                  <Avatar
                    className="border-0"
                    src={pool.from_token.icon}
                    shape="circle"
                    size={30}
                  />
                  <Avatar
                    className="border-0"
                    src={pool.to_token.icon}
                    shape="circle"
                    size={30}
                  />
                </Avatar.Group>
                <span className="uppercase text-base">
                  {pool.from_token.symbol} / {pool.to_token.symbol}
                </span>
              </div>
            </Collapse.Title>
            <Collapse.Content>
              <div className="flex justify-between">
                <div>Your Liquidity</div>
                <CurrencyFormat
                  displayType="text"
                  className="font-secondary text-left text-base"
                  thousandSeparator
                  decimalScale={2}
                  value={0}
                />
              </div>
              <div className="flex justify-between">
                <div>Total Liquidity</div>
                <CurrencyFormat
                  displayType="text"
                  className="font-secondary text-left text-base"
                  thousandSeparator
                  decimalScale={2}
                  value={pool.liquidity}
                />
              </div>
              <div className="flex justify-between">
                <div>APR</div>
                <CurrencyFormat
                  displayType="text"
                  className="font-secondary text-left text-base"
                  decimalScale={2}
                  suffix="%"
                  value={pool.apr}
                />
              </div>
            </Collapse.Content>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default PermissionedPools;
