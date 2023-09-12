import useSupabaseFunctions from "@/services/supabase";
import useAccount from "@/states/useAccount";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function PoolPage() {
  const router = useRouter();
  const { getPermissioned } = useSupabaseFunctions();
  const walletAddress = useAccount((state) => state.publicKeyBase58);
  const [kycVerified, setKycVerified] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      getPermissioned(walletAddress).then((response) => {
        const { status, data } = response;
        if (status === 200) {
          setKycVerified(!!data);
        }
      });
    }
  }, [walletAddress]);

  const verify = () => {
    router.push(`/dash/kyc?address=${walletAddress}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>Permissioned Pool Page</h1>

      {kycVerified ? (
        <p>List Permissioned Pools</p>
      ) : (
        <button onClick={verify}>Permissioned</button>
      )}
    </div>
  );
}

export default PoolPage;
