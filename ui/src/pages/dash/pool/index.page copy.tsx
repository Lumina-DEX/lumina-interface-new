import Layout from "@/components/Layout";
import useSupabaseFunctions from "@/services/supabase";
import useAccount from "@/states/useAccount";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";

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
        <ul>
          <li>pool1</li>
          <li>pool2</li>
          <li>pool3</li>
        </ul>
      ) : (
        <Button color="primary" onClick={verify}>
          Permissioned
        </Button>
      )}
    </div>
  );
}

export default PoolPage;
