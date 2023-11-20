import React, { ReactElement, useState, useEffect } from "react";
import ZKPid from "@/services/zkpid";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Button, Input } from "react-daisyui";
import { NextPageWithLayout } from "@/pages/_app.page";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const KYBPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<"guidance" | "started" | "finished">(
    "guidance"
  );

  const onStartVerification = () => {
    setStep("started");
  };

  const onSubmitVerification = async () => {
    const mode =
      typeof window !== "undefined" && window.localStorage.getItem("TestMode");

    const address = searchParams.get("address");
    if (!address) {
      console.error("Address is null!");
      return;
    }
    const body = {
      data: {
        address,
        mode: mode === "true" ? "APPROVED" : undefined,
        verified: true,
      },
    };
    await fetch("/api/kyb", { method: "POST", body: JSON.stringify(body) });

    setStep("finished");
  };

  const onClose = () => {
    router.push("/dash");
  };

  const renderGuidance = () => (
    <>
      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">What is it?</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>
              Business verification, commonly called KYB (i.e. Know Your
              Business), is performed by an external service provider.
            </p>
          </li>
          <li>
            <p>
              The final credential will be stored in your wallet and may be
              re-used with Lumina and complying applications.
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">Get ready</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>Enter your business information in the next page.</p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3 className="font-bold text-xl">Next steps</h3>
        <ul className="list-disc pl-6">
          <li>
            <p>
              You will be notified of the outcome once the verification has been
              completed.
            </p>
          </li>
        </ul>
      </div>

      <div className="w-full flex justify-center">
        <Button
          className="font-orbitron"
          color="primary"
          onClick={onStartVerification}
        >
          Start Verification
        </Button>
      </div>
    </>
  );

  const renderForm = () => (
    <>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl">
          Enter the following information, then click ‘Submit Verification’
        </p>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <Input placeholder="Enter First Name" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <Input placeholder="Enter Last Name" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Business Email</span>
          </label>
          <Input placeholder="Enter Business Email" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Business Name</span>
          </label>
          <Input placeholder="Enter Business Name" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Business Legal Address</span>
          </label>
          <Input placeholder="Enter Business Legal Address" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Business Tax Identification Number
            </span>
          </label>
          <Input placeholder="Enter Tax ID Number" />
        </div>

        <div className="w-full flex justify-center">
          <Button
            className="font-orbitron"
            color="primary"
            onClick={onSubmitVerification}
          >
            Submit Verification
          </Button>
        </div>
      </div>
    </>
  );

  const renderResult = () => (
    <div className="card bg-blue-100 max-w-3xl p-12 gap-6 font-metrophobic relative">
      <p className="text-xl">
        Thank you for submitting your business information. You will be notified
        by email about the status of your KYB check. If approved, the final
        credential will be stored in your wallet and may be re-used with Lumina
        and complying applications.
      </p>
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

  if (step === "finished") {
    return renderResult();
  }

  return (
    <div className="card bg-blue-100 max-w-3xl p-6 gap-6 font-metrophobic">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">Welcome to KYB check</h1>
      </div>

      {step === "guidance" && renderGuidance()}
      {step === "started" && renderForm()}
    </div>
  );
};

KYBPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYBPage;
