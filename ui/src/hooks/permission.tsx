import useSupabaseFunctions from "@/services/supabase";
import useAccount from "@/states/useAccount";

export default function usePermission() {
  const { getKYCPermissioned, getKYBPermissioned } = useSupabaseFunctions();
  const { accountUpdate } = useAccount((state) => ({
    accountUpdate: state.update,
  }));

  const sync = (address: string) => {
    const testMode =
      typeof window !== "undefined" && window.localStorage.getItem("TestMode");

    getKYCPermissioned(address!, testMode || null).then((response) => {
      const { status, data } = response;
      if (status === 200 && data) {
        accountUpdate({
          kycVerified: !!data[0],
          location: !!data[0] ? data[0].location : null,
        });
      }
    });
    getKYBPermissioned(address!, testMode || null).then((response) => {
      const { status, data } = response;
      if (status === 200 && data) {
        accountUpdate({
          kybVerified: !!data[0] && (data[0].is_verified ?? false),
        });
      }
    });
  };

  return { sync };
}
