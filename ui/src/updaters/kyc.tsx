import useAccount from "@/states/useAccount";
import useSupabaseFunctions from "@/services/supabase";
import { useEffect } from "react";

export default function KycUpdater() {
  const { getPermissioned } = useSupabaseFunctions();

  const { address, accountUpdate } = useAccount((state) => ({
    address: state.publicKeyBase58,
    accountUpdate: state.update,
  }));

  useEffect(() => {
    if (address) {
      const testMode = localStorage.getItem("TestMode");
      getPermissioned(address, testMode || null).then((response) => {
        const { status, data } = response;
        if (status === 200 && data) {
          accountUpdate({
            kycVerified: !!data[0],
            location: !!data[0] ? data[0].location : null,
          });
        }
      });
    }
    return () => {
      accountUpdate({ kycVerified: false });
    };
  }, [address]);

  return <></>;
}
