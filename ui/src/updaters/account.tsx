import useAccount from "@/states/useAccount";
import { PublicKey } from "snarkyjs";
import ZkappWorkerClient from "@/lib/zkappWorkerClient";
import { useEffect, useState } from "react";
import { MINA_SUB_DECIMAL } from "@/lib/wallet";
import useLoad from "@/states/useLoad";

export default function AccountUpdater() {
  const state = useAccount();

  const [displayText, setDisplayText] = useState("");
  const [transactionlink, setTransactionLink] = useState("");
  const { loadUpdate } = useLoad((state) => ({
    loadUpdate: state.update,
  }));
  // -------------------------------------------------------
  // Do Setup

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    (async () => {
      if (!state.hasBeenSetup) {
        loadUpdate({ msg: "Loading web worker...", process: 0 });
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);

        loadUpdate({ msg: "Done loading web worker", process: 0.25 });
        await timeout(5);

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          state.update({ hasWallet: false });
          loadUpdate({
            msg: `<a href="https://www.aurowallet.com/" target="_blank" rel="noreferrer">Install Auro wallet</a>`,
            process: 60,
          });
          return;
        }

        await zkappWorkerClient.loadContract();

        loadUpdate({ msg: "Compiling zkApp...", process: 0.5 });
        await zkappWorkerClient.compileContract();
        loadUpdate({ msg: "zkApp compiled...", process: 0.75 });
        await timeout(5);

        const zkappPublicKey = PublicKey.fromBase58(
          "B62qjshG3cddKthD6KjCzHZP4oJM2kGuC8qRHN3WZmKH5B74V9Uddwu"
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        state.update({
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey: null,
          publicKeyBase58: "",
          zkappPublicKey,
          accountExists: false,
        });
        loadUpdate({ state: true, process: 1 });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  // useEffect(() => {
  //   (async () => {
  //     if (state.hasBeenSetup && !state.accountExists) {
  //       // for (;;) {
  //       //   const res = await state.zkappWorkerClient!.fetchAccount({
  //       //     publicKeyBase58: state.publicKeyBase58!,
  //       //   });
  //       //   const accountExists = res.error == null;
  //       //   if (accountExists) {
  //       //     break;
  //       //   }
  //       //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //       // }
  //       // state.update({ accountExists: true });
  //     } else if (state.hasBeenSetup && state.accountExists) {
  //       const balance = await state.zkappWorkerClient!.getBalance(
  //         state.publicKeyBase58!
  //       );
  //       state.update({
  //         balances: { mina: Number(balance.toString()) / MINA_SUB_DECIMAL },
  //       });
  //     }
  //   })();
  // }, [state.hasBeenSetup]);

  // -------------------------------------------------------
  // Create UI elements
  return null;

  // let hasWallet;
  // if (state.hasWallet != null && !state.hasWallet) {
  //   const auroLink = "https://www.aurowallet.com/";
  //   const auroLinkElem = (
  //     <a href={auroLink} target="_blank" rel="noreferrer">
  //       Install Auro wallet here
  //     </a>
  //   );
  //   hasWallet = <div>Could not find a wallet. {auroLinkElem}</div>;
  // }

  // const stepDisplay = transactionlink ? (
  //   <a href={displayText} target="_blank" rel="noreferrer">
  //     View transaction
  //   </a>
  // ) : (
  //   displayText
  // );

  // let setup = (
  //   <div className="leading-5 font-bold text-2xl">
  //     {stepDisplay}
  //     {hasWallet}
  //   </div>
  // );

  // let accountDoesNotExist;
  // if (state.hasBeenSetup && !state.accountExists) {
  //   const faucetLink =
  //     "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
  //   accountDoesNotExist = (
  //     <div>
  //       Account does not exist.
  //       <a href={faucetLink} target="_blank" rel="noreferrer">
  //         Visit the faucet to fund this fee payer account
  //       </a>
  //     </div>
  //   );
  // }

  // if (state.hasBeenSetup && state.accountExists) {
  //   return null;
  // }

  // return null;
}
