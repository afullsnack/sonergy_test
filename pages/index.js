import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaEnvelope,
  FaEyeSlash,
  FaHome,
  FaLock,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import Button from "../components/Button";
import Logo from "../components/Logo";
import OnboardCard from "../components/OnboardCard";

export default function Home() {
  const router = useRouter();
  // Params
  const { params, query } = router;
  const [stage, setStage] = useState();

  return (
    <div className="container">
      <div className="w-[100%] mobile:bg-white desktop:bg-transparent flex items-center mobile:justify-between desktop:justify-center justify-center pr-4 mb-2">
        <Logo />
        <div className="bg-primary rounded-md w-8 h-8 desktop:hidden"></div>
      </div>
      <div className="w-[100%] desktop:max-w-screen-desktop mobile:max-w-screen-mobile mobile:p-2 h-auto flex flex-col items-start justify-center my-0 mx-auto">
        <SetNewPassword />

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

const AccountType = () => (
  <>
    <OnboardCard>
      <h3 className="text-black text-lg font-medium">Select account type</h3>
      <p className="text-slate-500 font-normal text-sm">
        Choose an account type that best fits your current needs for Sonergy.
      </p>
      <br />

      <div className="p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-[#E2EDF6] hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
        <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
          {/* <img class="h-12 w-12" src="/img/logo.svg" alt="User logo" /> */}
          <FaUserCircle color="#0059AC" />
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
      <div className="p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-[#E2EDF6] hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
        <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#01AAF0]">
          {/* <img class="h-12 w-12" src="/img/logo.svg" alt="User logo" /> */}
          <FaHome color="#01AAF0" />
        </div>
        <div>
          <div className="text-sm font-medium text-black">Merchant</div>
          <p className="text-slate-500 text-sm">
            I am an institution / organisation, I want to integrate Sonergy’s
            API on my application.
          </p>
        </div>
      </div>
      <Button
        text="Continue"
        onClick={(e) => console.info("Button comp clicked", e)}
      />
    </OnboardCard>
    <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
      <span className="text-slate-500 text-sm">Already have an account?</span>
      <span className="text-primary text-sm">Log in</span>
    </div>
  </>
);

const NewAccount = () => {
  return (
    <>
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">Create your account</h3>
        <p className="text-slate-500 font-normal text-sm">
          Welcome, provide your details below to create your account.
        </p>
        <br />

        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">Username</span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaUser color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            {/* <span>USD</span> */}
          </label>
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">
              Email Address
            </span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaEnvelope color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            {/* <span>USD</span> */}
          </label>
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">Password</span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaLock color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="Enter password"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            <span
              className="flex items-center justify-center pr-4 pl-1 bg-transparent"
              onClick={(e) => console.log(e, "Eye slash click")}
            >
              <FaEyeSlash color="#8895A7" />
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <input
              type="checkbox"
              // checked="checked"
              onChange={(e) => console.log(e, "Checkbox changed")}
              class="checkbox checkbox-sm rounded-md checkbox-primary"
            />
            <span class="label-text text-xs ml-2">
              By creating an account, you agree to our
              <b>Terms & conditions</b> and <b>Privacy policy</b>
            </span>
          </label>
        </div>

        <Button
          text="Create account"
          onClick={(e) => console.info("Button comp clicked", e)}
        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Already have an account?</span>
        <span className="text-primary text-sm font-bold">Log in</span>
      </div>
    </>
  );
};

const Login = () => {
  return (
    <>
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">
          Sign in to your account
        </h3>
        <p className="text-slate-500 font-normal text-sm">
          Welcome, provide your login details below to sign in to your account.
        </p>
        <br />

        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">
              Email Address
            </span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaEnvelope color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            {/* <span>USD</span> */}
          </label>
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">Password</span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaLock color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="Enter password"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            <span
              className="flex items-center justify-center pr-4 pl-1 bg-transparent"
              onClick={(e) => console.log(e, "Eye slash click")}
            >
              <FaEyeSlash color="#8895A7" />
            </span>
          </label>
        </div>

        <Button
          text="Log in"
          onClick={(e) => console.info("Button comp clicked", e)}
        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Don't have an account?</span>
        <span className="text-primary text-sm font-bold">Sign in</span>
      </div>
      <div className="flex items-center justify-center px-10 mt-6 w-[100%]">
        <a href="#">
          <span className="text-primary text-sm font-bold">
            Forgot password?
          </span>
        </a>
      </div>
    </>
  );
};

const ForgotPassword = () => {
  return (
    <>
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">Forgot password?</h3>
        <p className="text-slate-500 font-normal text-sm">
          Provide your registered email and we’ll send you a link to reset your
          password.
        </p>
        <br />

        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">
              Email Address
            </span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaEnvelope color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            {/* <span>USD</span> */}
          </label>
        </div>

        <Button
          text="Reset password"
          onClick={(e) => console.info("Button comp clicked", e)}
        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Remember your password?</span>
        <span className="text-primary text-sm font-bold">Log in</span>
      </div>
      {/* <div className="flex items-center justify-center px-10 mt-6 w-[100%]">
        <a href="#">
          <span className="text-primary text-sm font-bold">
            Forgot password?
          </span>
        </a>
      </div> */}
    </>
  );
};

const SetNewPassword = () => {
  return (
    <>
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">Set new password</h3>
        <p className="text-slate-500 font-normal text-sm">
          Enter your new password. Should be something you could easily
          remember.
        </p>
        <br />

        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">
              New Password
            </span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaLock color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="Enter new password"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            <span
              className="flex items-center justify-center pr-4 pl-1 bg-transparent"
              onClick={(e) => console.log(e, "Eye slash click")}
            >
              <FaEyeSlash color="#8895A7" />
            </span>
          </label>
        </div>
        <div class="form-control mb-2">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">
              Confirm Password
            </span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
              <FaLock color="#B8C4CE" />
            </span>
            <input
              type="text"
              placeholder="Confirm new password"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
            />
            <span
              className="flex items-center justify-center pr-4 pl-1 bg-transparent"
              onClick={(e) => console.log(e, "Eye slash click")}
            >
              <FaEyeSlash color="#8895A7" />
            </span>
          </label>
        </div>

        <Button
          text="Change password"
          onClick={(e) => console.info("Button comp clicked", e)}
        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Remember your password?</span>
        <span className="text-primary text-sm font-bold">Log in</span>
      </div>
      {/* <div className="flex items-center justify-center px-10 mt-6 w-[100%]">
        <a href="#">
          <span className="text-primary text-sm font-bold">
            Forgot password?
          </span>
        </a>
      </div> */}
    </>
  );
};
