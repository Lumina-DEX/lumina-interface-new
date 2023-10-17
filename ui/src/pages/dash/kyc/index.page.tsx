import React, { ReactElement, useState, useEffect } from "react";
import ZKPid from "@/services/zkpid";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "react-daisyui";
import { NextPageWithLayout } from "@/pages/_app.page";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import useTestMode from "@/states/useTestMode";

const KYCPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [url, setUrl] = useState("");

  const { testMode, updateTestMode } = useTestMode((state) => ({
    testMode: state.state,
    updateTestMode: state.update,
  }));

  useEffect(() => {
    const flag = localStorage.getItem("TestMode");
    flag === "true"
      ? updateTestMode({ state: true })
      : updateTestMode({ state: false });
  }, []);

  const handleStartVerification = () => {
    getUrl();
    setUpCallback();
  };

  const getUrl = async () => {
    const address = searchParams.get("address");
    if (!address) {
      console.error("Address is null!");
      return;
    }
    const zkpid = new ZKPid();

    await zkpid.login();
    const url = await zkpid.startkyc({
      address,
      uid: "unique session",
      test: testMode ? "APPROVED" : undefined,
    });
    setUrl(url);
  };

  const setUpCallback = () => {
    window && window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event: any) {
      console.log("Event:", event);
      if (event.data.status === "approved") {
        // do sth
      }
    }
  };

  const onClose = () => {
    router.push("/dash");
  };

  if (url) {
    return (
      <div className="card max-w-3xl p-6 gap-6 h-[80vh] relative">
        <iframe
          id="iframe"
          title="Lumina KYC"
          width="100%"
          height="100%"
          src={url}
          allow="cross-origin-isolated"
          // @ts-ignore
          credentialless="true"
        ></iframe>
        <Button
          className="absolute top-2 right-2"
          shape="circle"
          variant="link"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="card max-w-3xl p-6 gap-6">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">
          Welcome to ZKP-ID check connection
        </h1>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">What is it?</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>
              The ID verification, commonly called KYC (i.e. Know Your
              Customer), is performed by zkp-ID. The final credential will be
              stored in this app and may be re-used with complying businesses.
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">Get ready</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>
              Get your ID or passport, you will need to scan them front and
              back. You will also be required to take a photo of your face.
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">Next steps</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>
              You will be notified once the verification has been completed.
            </p>
          </li>
        </ul>
      </div>

      <div className="w-full flex justify-center">
        <Button color="primary" onClick={handleStartVerification}>
          Start Verification
        </Button>
      </div>
    </div>
  );
};

KYCPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYCPage;
