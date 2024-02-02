import { Database } from "@/lib/database.types";
import { IBusinessContact } from "@/types/businessContact";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback } from "react";

export default function useSupabaseFunctions() {
  const supabase: SupabaseClient<Database> = useSupabaseClient();

  const getKYCPermissioned = useCallback(
    (walletAddress: string, testMode: string | null) =>
      testMode === "true"
        ? supabase
            .from("KYCpermissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .eq("mode", "APPROVED")
        : supabase
            .from("KYCpermissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .is("mode", null),
    [supabase]
  );

  const getKYBPermissioned = useCallback(
    (walletAddress: string, testMode: string | null) =>
      testMode === "true"
        ? supabase
            .from("KYBpermissions")
            .select("*")
            .eq("wallet_address", walletAddress)
            .eq("mode", "APPROVED")
        : supabase
            .from("KYBpermissions")
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

  const getLeaderboard = useCallback(
    () =>
      supabase.from("leaderboard").select(
        `
          id,
          name,
          points,
          created_at
        `
      ),
    [supabase]
  );

  const getRisk = useCallback(
    (address: string) =>
      supabase
        .from("risk")
        .select(
          `
          address,
          score,
          info
        `
        )
        .eq("address", address)
        .single(),
    [supabase]
  );

  const saveRisk = useCallback(
    (address: string, score: string, info: string) =>
      supabase.from("risk").insert({
        address,
        score,
        info,
      }),
    [supabase]
  );

  const submitBusinessForm = useCallback(
    (
      walletAddress: string,
      formData: IBusinessContact,
      mode: "APPROVED" | undefined
    ) =>
      supabase.from("KYBpermissions").insert({
        wallet_address: walletAddress,
        first_name: formData.firstName,
        last_name: formData.lastName,
        business_email: formData.businessEmail,
        business_name: formData.businessName,
        business_address: formData.businessAddress,
        business_tax_id: formData.businessTaxId,
        mode: mode,
      }),
    [supabase]
  );

  const updateKYCClaimStatus = useCallback(
    (
      walletAddress: string,
      mode: "APPROVED" | undefined,
      claimStatus: "Unclaimed" | "Pending" | "Claimed"
    ) =>
      mode
        ? supabase
            .from("KYCpermissions")
            .update({
              claim_status: claimStatus,
            })
            .eq("wallet_address", walletAddress)
            .eq("mode", "APPROVED")
        : supabase
            .from("KYCpermissions")
            .update({
              claim_status: claimStatus,
            })
            .eq("wallet_address", walletAddress)
            .neq("mode", "APPROVED"),
    [supabase]
  );

  return {
    getKYCPermissioned,
    getKYBPermissioned,
    getPools,
    getTokens,
    getLeaderboard,
    getRisk,
    saveRisk,
    submitBusinessForm,
    updateKYCClaimStatus,
  };
}
