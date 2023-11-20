import { Mina, PrivateKey, PublicKey, UInt64, fetchAccount } from "snarkyjs";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { Add } from "../contracts/Add";

const state = {
  Add: null as null | typeof Add,
  zkapp: null as null | Add,
  transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { Add } = await import("../contracts/Add.js");
    state.Add = Add;
  },
  compileContract: async (args: {}) => {
    await state.Add!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  getBalance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    const balance = Mina.getBalance(publicKey);
    return JSON.stringify(balance.toJSON());
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.Add!(publicKey);
  },
  getNum: async (args: {}) => {
    const currentNum = await state.zkapp!.num.get();
    return JSON.stringify(currentNum.toJSON());
  },
  createUpdateTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.update();
    });
    state.transaction = transaction;
  },
  createTransferTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.transferToAddress(
        PublicKey.fromBase58(
          "B62qnhmGKDtNsXitJcqkckRxaUfjBGGFSK3dfPxyqSwYqesNspPyYky"
        ),
        PublicKey.fromBase58(
          "B62qoEM26H9XzUhWQxjzpNN4B5ysMdAW7YnbRRbj3M3sStdyn3e8Npc"
        ),
        UInt64.from(1)
      );
    });
    state.transaction = transaction;
  },
  proveTransaction: async (args: {}) => {
    const tx = state.transaction!;
    await tx.prove();

    return await tx
      .sign([
        PrivateKey.fromBase58(
          "EKErfsUVCf773SsUcYKZMZCTJpkikM7tAeAvHum1Y9xYnihDyTEv"
        ),
      ])
      .send();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== "undefined") {
  addEventListener(
    "message",
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}
