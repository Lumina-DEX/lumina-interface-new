import React, { useEffect, useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import CurrencyFormat from "react-currency-format";
import { Avatar, Table, Collapse } from "react-daisyui";
import { Pool } from "@/types/pool";
import { CgUnavailable } from "react-icons/cg";
import { BsCircle } from "react-icons/bs";
import Link from "next/link";
interface Props {
  pools: Pool[];
}

const PermissionLessPools: React.FC<Props> = ({ pools }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener(
      "resize",
      function (event) {
        setScreenWidth(window.innerWidth);
      },
      true
    );
  }, []);

  return (
    <div>
      {screenWidth > 700 ? (
        <div className="flex flex-col gap-y-4 py-2">
          <Table className="rounded-box" zebra>
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
                      {/* <div className="flex flex-row items-center">
                    <CgUnavailable className="text-rose-500" /> Restricted
                  </div> */}
                      <div className="flex flex-row items-center">
                        <BsCircle className="text-green-300 font-bold" />{" "}
                        Available
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
                    <span />
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          <div className="flex justify-center">
            <Link
              href="/dash/add"
              className="btn h-8 min-h-0 shadow-md btn-primary w-[120px] "
            >
              +New Pool
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {pools.map((pool, index) => (
            <Collapse checkbox>
              <Collapse.Title className="text-xl font-medium">
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
      )}
    </div>
  );
};

export default PermissionLessPools;
