import React from "react";
import useLoad from "@/states/useLoad";
import { Loading } from "react-daisyui";

const Footer = () => {
  const { loadMsg, loadState } = useLoad((state) => ({
    loadMsg: state.msg,
    loadState: state.state,
  }));

  return (
    <div className="fixed bottom-14 w-full min-[630px]:bottom-2">
      <div className="flex justify-center text-primary text-xl min-[630px]:text-2xl">
        {loadState ? (
          <div> success </div>
        ) : (
          <div className="flex flex-row gap-x-2">
            <Loading color="primary" /> {loadMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
