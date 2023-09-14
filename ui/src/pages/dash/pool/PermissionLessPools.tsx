import React from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Table } from "react-daisyui";
import { Pool } from "@/types/pool";

interface Props {
  pools: Pool[];
}

const PermissionLessPools: React.FC<Props> = ({ pools }) => {
  return (
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
  );
};

export default PermissionLessPools;
