import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ButtonPrimary } from "../../components/Button";
import Logo from "../../components/Logo";
import OnboardCard from "../../components/OnboardCard";

export default function Home() {
  const router = useRouter();
  // Params
  const { query } = router;
  const [accountType, setAccountType] = useState();

  return (
    <div className="container">
      <div className="w-[100%] mobile:bg-white desktop:bg-transparent flex items-center mobile:justify-between desktop:justify-center justify-center pr-4 mb-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div className="bg-primary rounded-md w-8 h-8 desktop:hidden"></div>
      </div>
      <div className="w-[100%] desktop:max-w-screen-desktop mobile:max-w-screen-mobile mobile:p-2 h-auto flex flex-col items-start justify-center my-0 mx-auto">
        <AccountType
          setAccountType={setAccountType}
          accountType={accountType}
          router={router}
        />

        <div className="w-[100%] flex flex-col items-center justify-end mt-14">
          <span className="text-gray-600 text-xs font-normal mb-2">
            © 2022 - Sonergy.io
          </span>
          <span className="text-gray-600 text-xs font-normal mb-2">
            Terms & conditions - Privacy policy
          </span>
        </div>
      </div>
    </div>
  );
}

const AccountType = ({ accountType, setAccountType, router }) => (
  <>
    <OnboardCard>
      <h3 className="text-black text-lg font-medium">Select account type</h3>
      <p className="text-slate-500 font-normal text-sm">
        Choose an account type that best fits your current needs for Sonergy.
      </p>
      <br />

      <div
        className={`w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] ${
          accountType === "researcher" ? "border-[#0059AC]" : "border-[#E2EDF6]"
        } border-solid hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all`}
        onClick={(e) => {
          setAccountType("researcher");
          console.log(accountType);
        }}
      >
        <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
          {/* <Image className="h-12 w-12" src="/Image/logo.svg" alt="User logo" /> */}
          <img
            src="/onboarding/researcher_icon.svg"
            alt="Researcher account type logo"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-black">
            Researcher / Respondent
          </div>
          <p className="text-slate-500 text-sm">
            I am an individual, I intend to use Sonergy to create, provide
            survey data and earn rewards.
          </p>
        </div>
      </div>
      <div
        className={`w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid ${
          accountType === "merchant" ? "border-[#0059AC]" : "border-[#E2EDF6]"
        } hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all`}
        onClick={(e) => {
          setAccountType("merchant");
          console.log(accountType);
        }}
      >
        <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#01AAF0]">
          {/* <Image className="h-12 w-12" src="/Image/logo.svg" alt="User logo" /> */}
          <img
            src="/onboarding/merchant_icon.svg"
            alt="Merchant account type logo"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-black">Merchant</div>
          <p className="text-slate-500 text-sm">
            I am an institution / organization, I want to integrate Sonergy’s
            API on my application.
          </p>
        </div>
      </div>
      <ButtonPrimary
        text="Continue"
        icon={null}
        iconPosition={null}
        onClick={(e) => {
          console.info("Button comp clicked", e);
          router.push("/register");
        }}
        isLoading={null}
        type={"normal"}
        disabled={false}
        block={false}
      />
    </OnboardCard>
    <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
      <span className="text-slate-500 text-sm">Already have an account?</span>
      <span className="text-primary text-sm">
        <Link href="/onboarding/login" passHref>
          <a>Log in</a>
        </Link>
      </span>
    </div>
  </>
);
