import usePermission from "@/hooks/permission";
import useAccount from "@/states/useAccount";
import { useEffect } from "react";

let timer: NodeJS.Timeout | undefined = undefined;

export default function KycUpdater() {
  const { sync: syncPermission } = usePermission();
  const { address, accountUpdate } = useAccount((state) => ({
    address: state.publicKeyBase58,
    accountUpdate: state.update,
  }));

  useEffect(() => {
    if (address) {
      syncPermission(address);

      timer = setInterval(() => {
        syncPermission(address);
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
