import React, { useEffect, useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Button, Table } from "react-daisyui";
import { Pool } from "@/types/pool";
import { connect } from "@/lib/wallet";
import useAccount from "@/states/useAccount";
import { useRouter } from "next/router";
import useSupabaseFunctions from "@/services/supabase";
import { CgUnavailable } from "react-icons/cg";
interface Props {
  pools: Pool[];
}

const PermissionedPools: React.FC<Props> = ({ pools }) => {
  const router = useRouter();
  const { address, walletConnected, kycVerified, accountUpdate } = useAccount(
    (state) => ({
      address: state.publicKeyBase58,
      walletConnected: state.hasBeenSetup,
      kycVerified: state.kycVerified,
      accountUpdate: state.update,
    })
  );
  const { getPermissioned } = useSupabaseFunctions();
  const [checkingAttestation, setCheckingAttestation] = useState(false);

  useEffect(() => {
    if (address) {
      setCheckingAttestation(true);
      getPermissioned(address).then((response) => {
        const { status, data } = response;
        if (status === 200 && data) {
          accountUpdate({ kycVerified: !!data[0] });
        }
        setCheckingAttestation(false);
      });
    }
    return () => {
      accountUpdate({ kycVerified: false });
      setCheckingAttestation(false);
    };
  }, [address]);

  const verify = () => {
    router.push({ pathname: "/dash/kyc", query: { address } });
  };

  if (checkingAttestation) {
    return <>Loading...</>;
  }

  return (
    <>
      {kycVerified ? (
        <Table className="rounded-box px-8" zebra>
          <Table.Head className="text-base text-default">
            <span />
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
            <span />
          </Table.Head>

          <Table.Body>
            {pools.map((pool, index) => {
              return (
                <Table.Row key={index} className="text-disabled">
                  <span />
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
                    <CgUnavailable />
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
                  <span />
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <div className="flex justify-center">
          <button className="btn h-8 min-h-0 shadow-md btn-primary w-[110px] ">
            Start KYC
          </button>
        </div>
      )}
    </>
  );
};

export default PermissionedPools;
