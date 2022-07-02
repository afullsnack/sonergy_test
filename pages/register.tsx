import Link from "next/link";
import { FaEnvelope, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";
import OnboardCard from "../components/OnboardCard";

function NewAccount () {
  return (
    <div className="container">
      <div className="w-[100%] mobile:bg-white desktop:bg-transparent flex items-center mobile:justify-between desktop:justify-center justify-center pr-4 mb-2">
        <Logo />
        <div className="bg-primary rounded-md w-8 h-8 desktop:hidden"></div>
      </div>
      <div className="w-[100%] desktop:max-w-screen-desktop mobile:max-w-screen-mobile mobile:p-2 h-auto flex flex-col items-start justify-center my-0 mx-auto">
      <OnboardCard>
        <h3 className="text-black text-lg font-medium">Create your account</h3>
        <p className="text-slate-500 font-normal text-sm">
          Welcome, provide your details below to create your account.
        </p>
        <br />

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">Username</span>
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
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">
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
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">Password</span>
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
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              // checked="checked"
              onChange={(e) => console.log(e, "Checkbox changed")}
              className="checkbox checkbox-sm rounded-md checkbox-primary"
            />
            <span className="label-text text-xs ml-2">
              By creating an account, you agree to our
              <b>Terms & conditions</b> and <b>Privacy policy</b>
            </span>
          </label>
        </div>

        <ButtonPrimary
          text="Create account"
          icon={null}
          iconPosition={null}
          onClick={(e) => console.info("Button comp clicked", e)}
          isLoading={null}
          type={"normal"}
          block={false}
        />
      </OnboardCard>
      <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
        <span className="text-slate-500 text-sm">Already have an account?</span>
        <span className="text-primary text-sm font-bold"><Link href="/login" passHref><a>Log in</a></Link></span>
      </div>
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
};

export default NewAccount;