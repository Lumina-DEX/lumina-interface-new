import Layout from "@/components/Layout";
import { Avatar, Loading, Table, Dropdown } from "react-daisyui";
import { ReactElement } from "react";
import clsx from "classnames";
import type { NextPageWithLayout } from "@/pages/_app.page";
import CurrencyFormat from "react-currency-format";

const ManagePage: NextPageWithLayout = () => {
  const tokens = [
    {
      id: "id_USDCxxxx",
      symbol: "USDC",
      icon: "/assets/tokens/usdc.png",
      type: "Token",
      usdPrice: 1.0,
      priceChange: 0.02,
      balance: 1.83,
    },
    {
      id: "id_USDCUSTSYxxxx",
      symbol: ["USDC", "USTSY"],
      icon: ["/assets/tokens/usdc.png", "/assets/tokens/ustsy.png"],
      type: "LP",
      usdPrice: 1.25,
      priceChange: -0.1,
      balance: 10.3,
    },
  ];

  return (
    <div className="px-4">
      <div className="card font-metrophobic">
        <div className="flex flex-col gap-y-4 py-6">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl font-orbitron">Manage</h1>
          </div>
          <div className="hidden md:block">
            {tokens.length ? (
              <Table className="rounded-box px-8" zebra>
                <Table.Head className="text-base text-default">
                  <span>Name</span>
                  <span className="max-md:hidden">Type</span>
                  <span className="max-sm:hidden">Price</span>
                  <span>Value</span>
                  <span></span>
                </Table.Head>

                <Table.Body>
                  {tokens.map((token, index) => {
                    const type = token.type;
                    return (
                      <Table.Row key={index} className="text-disabled">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            {type === "Token" && (
                              <>
                                <Avatar
                                  className="border-0"
                                  src={token.icon as string}
                                  shape="circle"
                                  size={30}
                                />
                                <span className="uppercase text-base">
                                  {token.symbol as string}
                                </span>
                              </>
                            )}
                            {type === "LP" && (
                              <>
                                <Avatar.Group className="overflow-visible">
                                  {(token.icon as string[]).map(
                                    (icon, index) => (
                                      <Avatar
                                        key={index}
                                        className="border-0"
                                        src={icon}
                                        shape="circle"
                                        size={30}
                                      />
                                    )
                                  )}
                                </Avatar.Group>
                                <span className="uppercase text-base">
                                  {(token.symbol as string[]).join(" / ")}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col text-base">
                          <span>{token.type}</span>
                        </div>
                        <div className="flex flex-col text-base">
                          <CurrencyFormat
                            displayType="text"
                            className="font-secondary text-left text-base max-md:hidden"
                            thousandSeparator
                            decimalScale={2}
                            prefix="$"
                            value={token.usdPrice}
                          />
                          <CurrencyFormat
                            displayType="text"
                            className={clsx(
                              "font-secondary text-left text-base max-md:hidden",
                              {
                                "text-green-500": token.priceChange >= 0,
                                "text-red-500": token.priceChange < 0,
                              }
                            )}
                            {...(token.priceChange > 0 ? { prefix: "+" } : {})}
                            suffix="%"
                            value={token.priceChange}
                          />
                        </div>
                        <div className="flex flex-col text-base">
                          <CurrencyFormat
                            displayType="text"
                            className="font-secondary text-left text-base max-md:hidden"
                            thousandSeparator
                            decimalScale={2}
                            prefix="$"
                            value={token.usdPrice * token.balance}
                          />
                          <CurrencyFormat
                            displayType="text"
                            className="font-secondary text-left text-base max-md:hidden"
                            decimalScale={2}
                            suffix={
                              token.type === "Token"
                                ? (token.symbol as string)
                                : "LP"
                            }
                            value={token.balance}
                          />
                        </div>
                        <div className="flex flex-col text-base">
                          <Dropdown end>
                            <Dropdown.Toggle>Actions</Dropdown.Toggle>
                            <Dropdown.Menu className="z-10 fixed w-[100px]">
                              {token.type === "Token" && (
                                <>
                                  <Dropdown.Item>Swap</Dropdown.Item>
                                  <Dropdown.Item>Send</Dropdown.Item>
                                  <Dropdown.Item>Pool</Dropdown.Item>
                                </>
                              )}
                              {token.type === "LP" && (
                                <>
                                  <Dropdown.Item>Send</Dropdown.Item>
                                  <Dropdown.Item>Manage</Dropdown.Item>
                                </>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
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
        </div>
      </div>
    </div>
  );
};

ManagePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagePage;
