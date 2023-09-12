import { useRouter } from "next/router";
import AccountUpdater from "./account";

export default function Updaters() {
  const router = useRouter();

  return <>{router.pathname.startsWith("/dash") && <AccountUpdater />}</>;
}
