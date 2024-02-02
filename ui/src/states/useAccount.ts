import ZkappWorkerClient from "@/lib/zkappWorkerClient";
import { RiskInfo } from "@/types/risk";
import { Field, PublicKey } from "snarkyjs";
import { create } from "zustand";

interface AccountModel {
  zkappWorkerClient: null | ZkappWorkerClient;
  hasWallet: null | boolean;
  hasSideos: boolean;
  hasBeenSetup: boolean;
  accountExists: boolean;
  currentNum: null | Field;
  publicKey: null | PublicKey;
  publicKeyBase58: null | string;
  zkappPublicKey: null | PublicKey;
  creatingTransaction: boolean;
  //
  network: null | string;
  balances: { [id: string]: number };
  kycStarted: boolean;
  kycVerified: boolean;
  kybStarted: boolean;
  kybVerified: boolean;
  nationality: null | string;
  kycClaimed: string; // "" | "Unclaimed" | "Pending" | "Claimed"
  kycJwt: string;
  //
  risking?: RiskInfo;
}

interface AccountState extends AccountModel {
  update: (value: Partial<AccountModel>) => void;
}

const useAccount = create<AccountState>((set) => ({
  zkappWorkerClient: null,
  hasWallet: null,
  hasSideos: false,
  hasBeenSetup: false,
  accountExists: false,
  currentNum: null,
  publicKey: null,
  publicKeyBase58: null,
  zkappPublicKey: null,
  creatingTransaction: false,
  network: null,
  balances: {},
  kycStarted: false,
  kycVerified: false,
  kybStarted: false,
  kybVerified: false,
  nationality: null,
  kycClaimed: "",
  kycJwt: "",
  update: (value: Partial<AccountModel>) => {
    set((state) => ({ ...state, ...value }));
  },
}));

export default useAccount;
