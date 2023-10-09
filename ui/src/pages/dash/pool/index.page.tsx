import Layout from "@/components/Layout";
import { Button, Divider, Tabs } from "react-daisyui";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import clsx from "classnames";
import usePools from "@/states/usePools";
import { Pool } from "@/types/pool";
import PermissionedPools from "./PermissionedPools";
import PermissionLessPools from "./PermissionLessPools";
import type { NextPageWithLayout } from "@/pages/_app.page";

const PoolPage: NextPageWithLayout = () => {
  const router = useRouter();

  const pools: Pool[] = usePools((state) => state.pools);
  const [tabValue, setTabValue] = useState(0);

  return (
    <div className="px-4">
      <div className="card max-w-3xl">
        <div className="flex justify-between items-center px-12 py-6">
          <Tabs size="lg" value={tabValue} onChange={setTabValue}>
            <Tabs.Tab
              className={clsx("font-medium", {
                "text-primary text-2xl ": tabValue === 0,
                "text-default text-xl": tabValue !== 0,
              })}
              value={0}
            >
              Public
            </Tabs.Tab>
            <Tabs.Tab
              className={clsx("font-medium", {
                "text-primary text-2xl ": tabValue === 1,
                "text-default text-xl": tabValue !== 1,
              })}
              value={1}
            >
              Permissioned
            </Tabs.Tab>
          </Tabs>
        </div>

        <Divider className="bg-primary h-1 m-0" />

        <div className="w-full">
          {tabValue === 0 && <PermissionLessPools pools={pools} />}
          {tabValue === 1 && <PermissionedPools pools={pools} />}
        </div>
      </div>
    </div>
  );
};

PoolPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PoolPage;
