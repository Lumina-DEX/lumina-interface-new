import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useLoad from "@/states/useLoad";

const LoadingState = () => {
  const [visible, setVisible] = useState(true);

  const { loadMsg, loadState, process } = useLoad((state) => ({
    loadMsg: state.msg,
    loadState: state.state,
    process: state.process,
  }));

  useEffect(() => {
    if (loadState) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [loadState]);

  return visible ? (
    <div className="fixed top-[80px] w-full flex justify-center z-10">
      <div className="w-[300px] text-xl min-[630px]:text-2xl">
        <ProgressBar completed={process} />
        <div className="w-full flex justify-center">
          {loadState ? (
            <p> Success </p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: loadMsg }} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LoadingState;
