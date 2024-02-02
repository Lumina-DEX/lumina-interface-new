import usePermission from "@/hooks/permission";
import useAccount from "@/states/useAccount";
import { useEffect } from "react";

let timer: NodeJS.Timeout | undefined = undefined;

export default function KycUpdater() {
  const { sync: syncPermission } = usePermission();
  const { address, kycClaimed, kycJwt, hasSideos, hasWallet, accountUpdate } =
    useAccount((state) => ({
      address: state.publicKeyBase58,
      kycClaimed: state.kycClaimed,
      kycJwt: state.kycJwt,
      hasSideos: state.hasSideos,
      hasWallet: state.hasWallet,
      accountUpdate: state.update,
    }));

  console.log({ kycJwt, kycClaimed });

  const sendDAWOfferCredential = () => {
    (document.querySelector("#dawOfferCredential") as any).click();
  };

  useEffect(() => {
    if (address) {
      syncPermission(address);

      timer = setInterval(() => {
        syncPermission(address);
      }, 1000 * 10);
    }
    return () => {
      clearInterval(timer);
      accountUpdate({
        kycVerified: false,
        kybVerified: false,
        nationality: null,
        kycClaimed: "",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    switch (kycClaimed) {
      case "Pending":
        alert("Pending in claiming KYC credentials");
        break;
      case "Unclaimed":
        if (!hasSideos) {
          alert("Download Sideos Wallet");
        } else {
          alert("Claim KYC Credential with DAW");
          sendDAWOfferCredential();
        }
        break;
      case "Claimed":
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycClaimed]);

  return (
    <>
      <button
        className="hidden"
        type="button"
        id="dawOfferCredential"
        data-jwt={kycJwt}
      >
        Pick up the credential
      </button>
    </>
  );
}
