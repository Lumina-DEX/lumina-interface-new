import React, { PropsWithChildren, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AppContext } from "@/contexts/AppContext";
import { LoadingContext } from "@/contexts/LoadingContext";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <LoadingContext.Provider
        value={{ isLoading, setLoading, loadingMessage, setLoadingMessage }}
      >
        <Header />
        <div className="absolute w-screen h-screen flex flex-col items-center justify-center bg-lumina bg-cover bg-no-repeat">
          {children}
        </div>
        <Footer />
      </LoadingContext.Provider>
    </AppContext.Provider>
  );
};

export default Layout;
