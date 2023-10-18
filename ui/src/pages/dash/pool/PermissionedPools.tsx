import React, { useEffect, useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Table, Button, Collapse, Loading } from "react-daisyui";
import { Pool } from "@/types/pool";
import useAccount from "@/states/useAccount";
import { CgUnavailable } from "react-icons/cg";
import Link from "next/link";
import { connect } from "@/lib/wallet";
import { BsCircle } from "react-icons/bs";
import useLoad from "@/states/useLoad";
interface Props {
  pools: Pool[];
}

const PermissionedPools: React.FC<Props> = ({ pools }) => {
  const { location, kycVerified, address } = useAccount((state) => ({
    location: state.location,
    kycVerified: state.kycVerified,
    address: state.publicKeyBase58,
  }));
  const { loadState } = useLoad((state) => ({
    loadState: state.state,
  }));

  const handleConnectWallet = async () => {
    connect();
  };

  return (
    <div className="flex flex-col gap-y-4 py-4">
      <div className="text-center font-bold text-black px-2 text-base sm:text-base min-[320px]:text-[13px]">
        Connect Wallet and Complete KYC to access permissioned liquidity on
        Lumina
      </div>
      <div className="hidden md:block">
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
                        location === "US" ? (
                          pool.US ? (
                            <div className="flex flex-row items-center gap-x-1 w-28 justify-start">
                              <BsCircle className="text-emerald-400 font-bold" />
                              Available
                            </div>
                          ) : (
                            <div className="flex flex-row items-center gap-x-1 w-28 justify-start">
                              <CgUnavailable className="text-rose-500 text-[18px]" />
                              Restricted
                            </div>
                          )
                        ) : pool.US ? (
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
                  value={pool.total_liquidity}
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
      <div className="text-center font-bold text-black px-2 text-base sm:text-base min-[320px]:text-[13px]">
        Permissioned pool creation and management only available <br />
        to Enterprise users who complete KYB
      </div>
      {address ? (
        !kycVerified ? (
          <div className="flex justify-center mb-4">
            <Link
              href={`/dash/kyc?address=${address}`}
              className="btn py-2 shadow-md btn-primary w-[160px] text-lg"
            >
              Start KYC
            </Link>
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className="flex justify-center mb-4">
          <Button
            className="btn-primary text-white"
            onClick={handleConnectWallet}
            disabled={!loadState}
          >
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default PermissionedPools;
