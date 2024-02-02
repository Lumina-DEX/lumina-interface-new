import useSupabaseFunctions from "@/services/supabase";
import useAccount from "@/states/useAccount";

export default function usePermission() {
  const { getKYCPermissioned, getKYBPermissioned } = useSupabaseFunctions();
  const { hasSideos, accountUpdate } = useAccount((state) => ({
    hasSideos: state.hasSideos,
    accountUpdate: state.update,
  }));

  const sync = (address: string) => {
    const testMode =
      typeof window !== "undefined" && window.localStorage.getItem("TestMode");

    getKYCPermissioned(address!, testMode === "true").then((response) => {
      const { status, data } = response;
      if (status === 200 && data && data.length > 0) {
        accountUpdate({
          kycStarted: !!data[0],
          kycVerified: hasSideos
            ? !!data[0] && data[0].claim_status === "Claimed"
            : !!data[0],
          kycClaimed: data[0]?.claim_status || "",
          nationality: data[0]?.nationality,
          kycJwt: data[0]?.jwt || "",
        });
      }
    });
    getKYBPermissioned(address!, testMode === "true").then((response) => {
      const { status, data } = response;
      if (status === 200 && data && data.length > 0) {
        accountUpdate({
          kybStarted: !!data[0],
          kybVerified: data[0]?.is_verified ?? false,
        });
      }
    });
  };

  return { sync };
}
