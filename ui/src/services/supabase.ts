import { Database } from "@/lib/database.types";
import { IBusinessContact } from "@/types/businessContact";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback } from "react";

export default function useSupabaseFunctions() {
  const supabase: SupabaseClient<Database> = useSupabaseClient();

  const getPermissioned = useCallback(
    (walletAddress: string, testMode: string | null) =>
      testMode === "true"
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
      supabase
        .from("pools")
        .select(
          `
          id,
          total_liquidity, 
          apr, 
          from_token(id, symbol, icon), 
          to_token(id, symbol, icon),
          created_at,
          US
        `
        )
        .order("US", { ascending: true }),
    [supabase]
  );

  const getTokens = useCallback(
    () =>
      supabase.from("tokens").select(
        `
          id,
          symbol, 
          usd_price, 
          price_change, 
          day_volume,
          liquidity,
          icon
        `
      ),
    [supabase]
  );

  const submitBusinessForm = useCallback(
    (walletAddress: string, formData: IBusinessContact) =>
      supabase.from("businessContacts").insert({
        wallet_address: walletAddress,
        first_name: formData.firstName,
        last_name: formData.lastName,
        business_email: formData.businessEmail,
        business_name: formData.businessName,
        business_address: formData.businessAddress,
        business_tax_id: formData.businessTaxId,
      }),
    [supabase]
  );

  return {
    getPermissioned,
    getPools,
    getTokens,
    submitBusinessForm,
  };
}
