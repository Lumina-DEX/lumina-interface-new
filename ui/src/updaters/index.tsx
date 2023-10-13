import { useRouter } from "next/router";
import AccountUpdater from "./account";
import useAccount from "@/states/useAccount";
import useSupabaseFunctions from "@/services/supabase";
import { useState, useEffect } from "react";
export default function Updaters() {
  const router = useRouter();
  const [checkingAttestation, setCheckingAttestation] = useState(false);
  const { getPermissioned } = useSupabaseFunctions();

  const { address, walletConnected, kycVerified, accountUpdate } = useAccount(
    (state) => ({
      address: state.publicKeyBase58,
      walletConnected: state.hasBeenSetup,
      kycVerified: state.kycVerified,
      accountUpdate: state.update,
    })
  );

  useEffect(() => {
    if (address) {
      setCheckingAttestation(true);
      getPermissioned(address).then((response) => {
        const { status, data } = response;
        if (status === 200 && data) {
          accountUpdate({ kycVerified: !!data[0] });
        }
        setCheckingAttestation(false);
      });
    }
    return () => {
      accountUpdate({ kycVerified: false });
      setCheckingAttestation(false);
    };
  }, [address]);
  // return <>{router.pathname.startsWith("/dash") && <AccountUpdater />}</>;
  return <></>;
}
