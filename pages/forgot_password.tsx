import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";
import OnboardCard from "../components/OnboardCard";
import { forgotPassword } from "../lib/mutations";

function ForgotPassword() {
  /**
   * @Page => ForgotPassword page
   * @States => email
   * @Event => Call forgotPassword() mutation function and redirect to new password page
   */

  const queryClient = useQueryClient();
  const router = useRouter();

  /* State */
  const [email, setEmail] = useState<string>("");
  // DONE: setup useMutation
  const { mutate, isLoading, data } = useMutation(forgotPassword, {
    onSuccess: (data) => {
      console.log(data, "Returned reset password data");
      if (data?.success) {
        router.push("/new_password");
      }
    },
    onError: () => console.error("There was an error trying to reset password"),
    // onSettled: () => queryClient.invalidateQueries("login"),
  });

  return (
    <div className="container">
      <div className="w-[100%] mobile:bg-white desktop:bg-transparent flex items-center mobile:justify-between desktop:justify-center justify-center pr-4 mb-2">
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <div className="bg-primary rounded-md w-8 h-8 desktop:hidden"></div>
      </div>
      <div className="w-[100%] desktop:max-w-screen-desktop mobile:max-w-screen-mobile mobile:p-2 h-auto flex flex-col items-start justify-center my-0 mx-auto">
        <OnboardCard>
          <h3 className="text-black dark:text-gray-300 text-lg font-medium">
            Forgot password?
          </h3>
          <p className="text-slate-500 dark:text-gray-300 font-normal text-sm">
            Provide your registered email and we’ll send you a link to reset
            your password.
          </p>
          <br />

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 dark:text-gray-300 font-medium">
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
                className="input input-bordered bg-transparent text-black dark:text-gray-300 outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
                value={email}
                onChange={(e) => {
                  console.log("Email for reset password", e.target.value);
                  setEmail(e.target.value);
                }}
              />
              {/* <span>USD</span> */}
            </label>
          </div>

          <ButtonPrimary
            text="Reset password"
            icon={null}
            iconPosition={null}
            isLoading={isLoading}
            onClick={(e) => {
              console.info("Reset password btn clicked", e);
              // Call mutate and
              mutate(email);
            }}
            disabled={false}
            type={"normal"}
            block={true}
          />
        </OnboardCard>
        <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
          <span className="text-slate-500 dark:text-gray-300 text-sm">
            Remember your password?
          </span>
          <span className="text-primary text-sm font-bold">
            <Link href="/onboarding/login" passHref>
              Log in
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
          <span className="text-gray-600 dark:text-gray-300 text-xs font-normal mb-2">
            © 2022 - Sonergy.io
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-xs font-normal mb-2">
            Terms & conditions - Privacy policy
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
