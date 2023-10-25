import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { shortenAddress } from "@/utils/address";
import { toggleHTMLClass } from "@/utils/theme";
import { WalletDropdownList } from "@/constants/menu";
import { Button, Dropdown, Form, Toggle } from "react-daisyui";
import useAccount from "@/states/useAccount";
import { FiCopy } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { disconnect, connect } from "@/lib/wallet";
import Link from "next/link";
import { BiSolidCheckCircle } from "react-icons/bi";
import useLoad from "@/states/useLoad";
import useSupabaseFunctions from "@/services/supabase";

const ConnectWallet = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  const { kycVerified, balances, accountUpdate } = useAccount((state) => ({
    kycVerified: state.kycVerified,
    balances: state.balances,
    accountUpdate: state.update,
  }));

  const address: string | any = useAccount((state) => state.publicKeyBase58);
  const { getPermissioned } = useSupabaseFunctions();
  const { loadState } = useLoad((state) => ({
    loadState: state.state,
  }));
  const [testMode, setTestFlag] = useState("false");

  const handleConnectWallet = async () => {
    connect();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    toggleHTMLClass(darkMode);
  };

  const handleClick = () => {
    console.log("connect wallet dropdown");
  };

  useEffect(() => {
    const testMode =
      typeof window !== "undefined" && window.localStorage.getItem("TestMode");
    setTestFlag(String(testMode));
  }, []);

  const setTestMode = () => {
    if (typeof window === "undefined") {
      return;
    }
    const testMode = window.localStorage.getItem("TestMode");
    console.log("testMode", testMode);
    if (testMode === "true") {
      window.localStorage.setItem("TestMode", "false");
      setTestFlag("false");
    } else {
      console.log("else testMode", testMode);
      window.localStorage.setItem("TestMode", "true");
      setTestFlag("true");
    }
    getPermissioned(address, window.localStorage.getItem("TestMode")).then(
      (response) => {
        const { status, data } = response;
        if (status === 200 && data) {
          accountUpdate({ kycVerified: !!data[0] });
        }
      }
    );
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return (
    // {walletConnected && (
    //   <Button size="sm">{balances.mina ?? 0} Mina</Button>
    //
    <div className="flex gap-2 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:h-14 max-sm:w-full max-sm:z-[2] max-sm:bg-background-l1 max-sm:shadow-10 max-sm:px-4 max-sm:justify-start max-sm:items-center max-sm:flex">
      <div>
        {address ? (
          kycVerified ? (
            <div className="text-emerald-400 font-bold flex flex-row items-center">
              <BiSolidCheckCircle />
              <p className="block max-sm:hidden">KYC Passed</p>
              <p className="hidden max-sm:block">KYC</p>
            </div>
          ) : (
            <Link
              href={`/dash/kyc?address=${address}`}
              className="btn w-full min-h-0 shadow-md btn-primary text-lg text-white h-7"
            >
              <p className="block max-sm:hidden">Start KYC</p>
              <p className="hidden max-sm:block">KYC</p>
            </Link>
          )
        ) : (
          <></>
        )}
      </div>
      {address && <Button size="sm">{balances.mina ?? 0} Mina</Button>}
      <div className="font-primary ">
        {address ? (
          // <Button text={shortenAddress(accounts[0])} variant="secondary" onClick={() => setOpen(!open)} />
          <Dropdown className="font-primary text-gray-800 z-50">
            <Dropdown.Toggle> {shortenAddress(address)}</Dropdown.Toggle>
            <Dropdown.Menu className="px-4 top-[42px] bg-pink-50 w-[262px] max-sm:top-[-317px] right-[-24px] z-10">
              <CopyToClipboard text={address}>
                <Dropdown.Item
                  className="flex justify-between"
                  onClick={(e) => e.preventDefault()}
                >
                  <div>
                    <p className="truncate w-32">{address}</p>
                  </div>
                  <div className="flex justify-end">
                    <FiCopy size={18} />
                  </div>
                </Dropdown.Item>
              </CopyToClipboard>

              {WalletDropdownList.map(
                (link: { label: string; href: string }, index: number) => (
                  <li key={index}>
                    <Link href={link.label}>{link.label}</Link>
                  </li>
                )
              )}

              <Dropdown.Item
                className="flex justify-between"
                onClick={disconnectWallet}
              >
                <div>Disconnect</div>
                <div className="flex justify-end">
                  <RxExit size={18} />
                </div>
              </Dropdown.Item>

              <hr />
              <Dropdown.Item>zkKYC</Dropdown.Item>
              <Dropdown.Item className="flex justify-between">
                <div>Language(EN)e</div>
                <div className="flex justify-end">
                  <AiOutlineRight size={18} />
                </div>
              </Dropdown.Item>
              <Dropdown.Item className="flex justify-between">
                <div onClick={toggleTheme}>
                  {darkMode ? "Darkmode" : "Lightmode"}
                </div>
                <div className="flex justify-end">
                  <MdOutlineDarkMode size={18} />
                </div>
              </Dropdown.Item>

              <Dropdown.Item>
                <Form.Label
                  title="Real / Test(KYC)"
                  className="text-[12px] w-100"
                >
                  {testMode === "true" ? (
                    <Toggle
                      defaultChecked
                      color="primary"
                      className="ml-[14px]"
                      onChange={setTestMode}
                    />
                  ) : (
                    <Toggle
                      color="primary"
                      className="ml-[14px]"
                      onChange={setTestMode}
                    />
                  )}
                </Form.Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            className="btn w-full min-h-0 shadow-md btn-primary h-7 text-white "
            onClick={handleConnectWallet}
            disabled={!loadState}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
