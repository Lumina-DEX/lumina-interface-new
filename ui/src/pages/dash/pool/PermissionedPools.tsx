import React, { useEffect, useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Table, Button } from "react-daisyui";
import { Pool } from "@/types/pool";
import useAccount from "@/states/useAccount";
import { CgUnavailable } from "react-icons/cg";
import Link from "next/link";
import { connect } from "@/lib/wallet";
interface Props {
  pools: Pool[];
}

const PermissionedPools: React.FC<Props> = ({ pools }) => {
  const { walletConnected, kycVerified } = useAccount((state) => ({
    walletConnected: state.hasBeenSetup,
    kycVerified: state.kycVerified,
  }));
  const handleConnectWallet = async () => {
    connect();
  };

  return (
    <div className=" pt-2 pb-4">
      {kycVerified ? (
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
                    <div className="flex items-center gap-2">
                      <Avatar.Group>
                        <Avatar
                          className="border-0"
                          src={pool.x.icon}
                          shape="circle"
                          size={30}
                        />
                        <Avatar
                          className="border-0"
                          src={pool.y.icon}
                          shape="circle"
                          size={30}
                        />
                      </Avatar.Group>
                      <span className="uppercase text-base">
                        {pool.x.symbol} / {pool.y.symbol}
                      </span>
                    </div>
                    <div className="flex flex-row items-center">
                      <CgUnavailable className="text-rose-500" /> Restricted
                    </div>
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
                    value={pool.liquidity}
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
      ) : walletConnected ? (
        <div className="flex justify-center">
          <Link
            href="/dash/kyc"
            className="btn py-2 shadow-md btn-primary w-[160px] text-lg"
          >
            Start KYC
          </Link>
        </div>
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
    </div>
  );
};

export default PermissionedPools;
