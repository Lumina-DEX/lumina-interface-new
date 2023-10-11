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
      <div className="card">
        <div
          className={clsx(
            "flex justify-between items-center rounded-t-[18px]",
            {
              "bg-light-100": tabValue === 1,
              "bg-light-200": tabValue !== 1,
            }
          )}
        >
          <Tabs
            size="lg"
            value={tabValue}
            onChange={setTabValue}
            className="flex-nowrap"
          >
            <Tabs.Tab
              style={{ lineHeight: "8px" }}
              className={clsx("font-medium rounded-tl-[18px]  pr-16 py-7", {
                "text-primary text-2xl bg-light-100": tabValue === 0,
                "text-default text-xl bg-light-200": tabValue !== 0,
              })}
              value={0}
            >
              Public
            </Tabs.Tab>
            <Tabs.Tab
              style={{ lineHeight: "8px" }}
              className={clsx(
                "font-medium rounded-tl-[18px]  ml-[-10px] py-7 leading-[8px]",
                {
                  "text-primary text-2xl bg-light-100": tabValue === 1,
                  "text-default text-xl bg-light-200": tabValue !== 1,
                }
              )}
              value={1}
            >
              Permissioned
            </Tabs.Tab>
          </Tabs>
        </div>
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
