import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "../lib/reactCOIServiceWorker";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactElement, ReactNode, useState } from "react";
import { Database } from "@/lib/database.types";
import { NextPage } from "next";
import Updaters from "@/updaters";
import Head from "next/head";
import LockPage from "./lock";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
  initialSession: Session;
}) {
  const token =
    (typeof window !== "undefined" && window?.localStorage?.getItem("token")) ||
    "";
  const [supabase] = useState(() => createPagesBrowserClient<Database>());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Lumina DEX</title>
      </Head>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        {!token || Number(token) < new Date().getTime() ? (
          <LockPage />
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
        {/* <Updaters /> */}
      </SessionContextProvider>
    </>
  );
}
