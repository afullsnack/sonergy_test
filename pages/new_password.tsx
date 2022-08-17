import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEyeSlash, FaLock } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";
import OnboardCard from "../components/OnboardCard";
import {
  createNewForgotPassword,
  CreateNewPasswordData,
} from "../lib/mutations";

function SetNewPassword() {
  /**
   * @Page => ForgotPassword page
   * @States => email, otp, newPassword, confirmPassword
   * @Event => Call createNewForgotPassword() mutation function and redirect to login page
   */

  const queryClient = useQueryClient();
  const router = useRouter();

  /* State */
  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // DONE: setup useMutation
  const { mutate, isLoading, data } = useMutation(createNewForgotPassword, {
    onSuccess: (data) => {
      console.log(data, "Returned create new password data");
      if (data?.success) {
        router.push("/login");
      }
    },
    onError: () => console.error("There was an error trying to reset password"),
    // onSettled: () => queryClient.invalidateQueries("login"),
  });

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
                value={newPassword}
                onChange={(e) => {
                  console.log("New password", e.target.value);
                  setNewPassword(e.target.value);
                }}
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
                value={confirmPassword}
                onChange={(e) => {
                  console.log("Confirm password", e.target.value);
                  setConfirmPassword(e.target.value);
                }}
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
            isLoading={isLoading}
            onClick={(e) => {
              console.info("Button comp clicked", e);
              const data: CreateNewPasswordData = {
                code: otp,
                email: email,
                newPassword: confirmPassword,
              };
              mutate(data);
            }}
            type={"normal"}
            disabled={false}
            block={true}
          />
        </OnboardCard>
        <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
          <span className="text-slate-500 text-sm">
            Remember your password?
          </span>
          <span className="text-primary text-sm font-bold">
            <Link href="/onboarding/login" passHref>
              <a>Log in</a>
            </Link>
          </span>
        </div>
        {/* <div className="flex items-center justify-center px-10 mt-6 w-[100%]">
        <a href="#">
          <span className="text-primary text-sm font-bold">
            Forgot password?
          </span>
        </a>
      </div> */}
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

export default SetNewPassword;
