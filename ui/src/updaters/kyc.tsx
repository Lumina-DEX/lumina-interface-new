import useAccount from "@/states/useAccount";
import useSupabaseFunctions from "@/services/supabase";
import { useEffect } from "react";

let timer: NodeJS.Timeout | undefined = undefined;

export default function KycUpdater() {
  const { getKYCPermissioned, getKYBPermissioned } = useSupabaseFunctions();

  const { address, accountUpdate } = useAccount((state) => ({
    address: state.publicKeyBase58,
    accountUpdate: state.update,
  }));

  const updatePermission = (address: string) => {
    const testMode =
      typeof window !== "undefined" && window.localStorage.getItem("TestMode");
    getKYCPermissioned(address, testMode || null).then((response) => {
      const { status, data } = response;
      if (status === 200 && data) {
        accountUpdate({
          kycVerified: !!data[0],
          location: !!data[0] ? data[0].location : null,
        });
      }
    });
    getKYBPermissioned(address).then((response) => {
      const { status, data } = response;
      if (status === 200 && data) {
        accountUpdate({
          kybVerified: !!data[0] && (data[0].is_verified ?? false),
        });
      }
    });
  };

  useEffect(() => {
    if (address) {
      updatePermission(address);

      timer = setInterval(() => {
        updatePermission(address);
      }, 1000 * 10);
    }
    return () => {
      clearInterval(timer);
      accountUpdate({ kycVerified: false, kybVerified: false, location: null });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return <></>;
}
