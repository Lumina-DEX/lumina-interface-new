import { Database } from "@/lib/database.types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useCallback } from "react";

export default function useSupabaseFunctions() {
  const supabase: SupabaseClient<Database> = useSupabaseClient();
  const user: User | null = useUser();

  const getPermissioned = useCallback(
    (walletAddress: string) =>
      supabase
        .from("permissions")
        .select("*")
        .eq("wallet_address", walletAddress)
        .eq("mode", process.env.NODE_ENV)
        .single(),
    [supabase]
  );

  return {
    getPermissioned,
  };
}
