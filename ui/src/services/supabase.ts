import { Database } from "@/lib/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback } from "react";
import useTestMode from "@/states/useTestMode";
import React, { useContext, useEffect } from "react";

export default function useSupabaseFunctions() {
  const supabase: SupabaseClient<Database> = useSupabaseClient();
  const { testMode, updateTestMode } = useTestMode((state) => ({
    testMode: state.state,
    updateTestMode: state.update,
  }));

  useEffect(() => {
    const flag = localStorage.getItem("TestMode");
    flag === "true"
      ? updateTestMode({ state: true })
      : updateTestMode({ state: false });
  }, []);

  const getPermissioned = useCallback(
    (walletAddress: string) =>
      testMode
        ? supabase
            .from("permissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .eq("mode", "APPROVED")
        : supabase
            .from("permissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .is("mode", null),
    [supabase]
  );

  const getPools = useCallback(
    () =>
      supabase.from("pools").select(
        `
          id,
          total_liquidity, 
          apr, 
          from_token(id, symbol, icon), 
          to_token(id, symbol, icon),
          created_at
        `
      ),
    [supabase]
  );

  return {
    getPermissioned,
    getPools,
  };
}
