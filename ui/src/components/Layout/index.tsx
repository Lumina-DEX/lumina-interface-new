import React, { PropsWithChildren, useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AppContext } from "@/contexts/AppContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { toast, ToastContainer } from "react-toastify";
import useLoad from "@/states/useLoad";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const { loadMsg, loadState } = useLoad((state) => ({
    loadMsg: state.msg,
    loadState: state.state,
  }));

  useEffect(() => {
    if (loadMsg && !loadState) {
      console.log("loadState", loadState);
      toast.info(loadMsg, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (loadState) {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  }, [loadMsg, loadState]);

  useEffect(() => {
    window.addEventListener("passive", function (event) {
      event.preventDefault();
    });
  }, []);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <LoadingContext.Provider
        value={{ isLoading, setLoading, loadingMessage, setLoadingMessage }}
      >
        <Header />
        <div className="absolute w-full min-h-screen h-auto flex flex-col items-center justify-center bg-lumina bg-cover bg-no-repeat overflow-x-hidden py-40 px-2">
          {children}
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </LoadingContext.Provider>
    </AppContext.Provider>
  );
};

export default Layout;
