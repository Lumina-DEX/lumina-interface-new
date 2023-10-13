import { useRouter } from "next/router";
import useAccount from "@/states/useAccount";
import useSupabaseFunctions from "@/services/supabase";
import { useState, useEffect } from "react";
import { MINA_SUB_DECIMAL } from "@/lib/wallet";
import ZkappWorkerClient from "@/lib/zkappWorkerClient";
import { PublicKey } from "snarkyjs";

export default function KycUpdater() {
  const router = useRouter();
  const [checkingAttestation, setCheckingAttestation] = useState(false);
  const { getPermissioned } = useSupabaseFunctions();

  const {
    address,
    walletConnected,
    kycVerified,
    publicKeyBase58,
    accountExists,
    zkappWorkerClient,
    accountUpdate,
  } = useAccount((state) => ({
    address: state.publicKeyBase58,
    walletConnected: state.hasBeenSetup,
    kycVerified: state.kycVerified,
    publicKeyBase58: state.publicKeyBase58,
    accountExists: state.accountExists,
    zkappWorkerClient: state.zkappWorkerClient,
    accountUpdate: state.update,
  }));

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    (async () => {
      if (!walletConnected) {
        const zkappWorkerClient = new ZkappWorkerClient();
        console.log("Loading web worker...");
        await timeout(3);
        console.log("Done loading web worker");

        await zkappWorkerClient.setActiveInstanceToBerkeley();
        console.log("Set Active InstanceToBerkeley");
        const mina = (window as any).mina;
        if (mina == null) {
          accountUpdate({ hasWallet: false });
          return;
        }
        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);
        console.log(`Using key:${publicKey.toBase58()}`);
        console.log("Checking if fee payer account exists...");
        const res = await zkappWorkerClient.fetchAccount({
          publicKeyBase58: publicKeyBase58!,
        });
        const accountExists = res.error === null;
        await zkappWorkerClient.loadContract();
        console.log("Compiling zkApp...");
        await zkappWorkerClient.compileContract();
        console.log("zkApp compiled");
        const zkappPublicKey = PublicKey.fromBase58(
          "B62qjshG3cddKthD6KjCzHZP4oJM2kGuC8qRHN3WZmKH5B74V9Uddwu"
        );
        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        console.log(11111111, {
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          publicKeyBase58,
          zkappPublicKey,
          accountExists,
        });
        accountUpdate({
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          publicKeyBase58,
          zkappPublicKey,
          accountExists,
        });
      }
    })();
  }, []);

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

  useEffect(() => {
    console.log("walletConnected", walletConnected);
    console.log("accountExists", accountExists);
    console.log({ zkappWorkerClient });

    (async () => {
      if (!!zkappWorkerClient) {
        if (walletConnected && !accountExists) {
          for (;;) {
            const res = await zkappWorkerClient!.fetchAccount({
              publicKeyBase58: publicKeyBase58!,
            });
            const accountExists = res.error == null;
            if (accountExists) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
          accountUpdate({ accountExists: true });
        } else if (walletConnected && accountExists) {
          const balance = await zkappWorkerClient!.getBalance(publicKeyBase58!);
          console.log("balance in kyc", balance);
          accountUpdate({
            balances: { mina: Number(balance.toString()) / MINA_SUB_DECIMAL },
          });
        }
      }
    })();
  }, [walletConnected, !!zkappWorkerClient]);

  return <></>;
}
