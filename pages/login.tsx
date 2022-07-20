import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaEnvelope, FaEyeSlash, FaLock } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";
import OnboardCard from "../components/OnboardCard";
import { LoginData, loginUser } from "../lib/mutations";

function Login() {
  /**
   * @Page => Login page
   * @States => email, password, isHidden
   * @Event => Call loginUser() mutation function and store the user token in localStorage/cookie
   */
  const queryClient = useQueryClient();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  /* States */
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  // DONE: setup useMutation
  const { mutate, isLoading, data } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data, "Returned login data");
      if (data?.success && data?.data?.token) {
        // set cookie and redirect to the home page
        setCookie("token", data?.data?.token);
        router.push("/home/");
      }
    },
    onError: () => console.error("There was an error trying to login"),
    // onSettled: () => queryClient.invalidateQueries("login"),
  });

  return (
    <div className="container">
      <div className="w-[100%] mobile:bg-white desktop:bg-transparent flex items-center mobile:justify-between desktop:justify-center justify-center pr-4 mb-2">
        <Logo />
        <div className="bg-primary rounded-md w-8 h-8 desktop:hidden"></div>
      </div>
      <div className="w-[100%] desktop:max-w-screen-desktop mobile:max-w-screen-mobile mobile:p-2 h-auto flex flex-col items-start justify-center my-0 mx-auto">
        <OnboardCard>
          <h3 className="text-black text-lg font-medium">
            Sign in to your account
          </h3>
          <p className="text-slate-500 font-normal text-sm">
            Welcome, provide your login details below to sign in to your
            account.
          </p>
          <br />

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
                data-test="username"
                placeholder="example@gmail.com"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
                value={email}
                onChange={(e) => {
                  console.info("Email address", e.target.value);
                  setEmail(e.target.value);
                }}
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Password
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaLock color="#B8C4CE" />
              </span>
              <input
                type={`${isHidden ? "password" : "text"}`}
                placeholder="Enter password"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
                value={password}
                onChange={(e) => {
                  console.info("Password", e.target.value);
                  setPassword(e.target.value);
                }}
              />
              <span
                className="flex items-center justify-center pr-4 pl-1 bg-transparent"
                onClick={(e) => {
                  console.log(e, "Eye slash click");
                  setIsHidden(!isHidden);
                }}
              >
                <FaEyeSlash color="#8895A7" />
              </span>
            </label>
          </div>

          {data && !data?.success && (
            <div
              id="toast-warning"
              className="flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="ml-3 text-sm font-normal">{data?.message}</div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-warning"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          <ButtonPrimary
            text="Log in"
            icon={null}
            iconPosition={null}
            onClick={async (e) => {
              console.info("Button comp clicked", e);
              const data: LoginData = {
                email: email,
                password: password,
              };

              console.info("Form Data", data);

              mutate(data);
            }}
            isLoading={isLoading}
            type={"normal"}
            disabled={false}
            block={false}
          />
        </OnboardCard>
        <div className="flex items-center justify-between px-10 mt-6 w-[100%]">
          <span className="text-slate-500 text-sm">Don't have an account?</span>
          <span className="text-primary text-sm font-bold">
            <Link href="/register" passHref>
              Sign in
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-center px-10 mt-6 w-[100%]">
          <Link href="/forgot_password" passHref>
            <span className="text-primary text-sm font-bold">
              Forgot password?
            </span>
          </Link>
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
}

export default Login;
