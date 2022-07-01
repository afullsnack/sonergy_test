import Link from "next/link";
import { FaEyeSlash, FaLock } from "react-icons/fa";
import { ButtonPrimary } from "../components/Button";
import OnboardCard from "../components/OnboardCard";

function SetNewPassword() {
  return (
    <>
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">Set new password</h3>
        <p className="text-slate-500 font-normal text-sm">
          Enter your new password. Should be something you could easily
          remember.
        </p>
        <br />

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">
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
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">
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

        <ButtonPrimary
          text="Change password"
          icon={null}
          iconPosition={null}
          onClick={(e) => console.info("Button comp clicked", e)} type={"small"} block={false}        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Remember your password?</span>
        <span className="text-primary text-sm font-bold"><Link href="/login" passHref><a>Log in</a></Link></span>
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

export default SetNewPassword;
