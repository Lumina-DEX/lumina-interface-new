import { Database } from "@/lib/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback } from "react";

export default function useSupabaseFunctions() {
  const supabase: SupabaseClient<Database> = useSupabaseClient();

  const getPermissioned = useCallback(
    (walletAddress: string) =>
      process.env.NEXT_PUBLIC_ZKPID_TEST_MODE
        ? supabase
            .from("permissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .eq("mode", process.env.NEXT_PUBLIC_ZKPID_TEST_MODE)
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
          from_token(id, symbol, icon, usd_price, price_change, day_volume, liquidity), 
          to_token(id, symbol, icon, usd_price, price_change, day_volume, liquidity)
        `
      ),
    [supabase]
  );

  return {
    getPermissioned,
    getPools,
  };
}
