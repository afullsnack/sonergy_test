import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaCaretRight,
  FaEnvelope,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";
import { useModal } from "../components/Modal";
import OnboardCard from "../components/OnboardCard";
import OTPInput from "../components/OTPInput";
import {
  RegisterData,
  registerUser,
  resendEmailOTP,
  verifyEmailOTP,
  VerifyEmailOTPData,
} from "../lib/mutations";
// import {Modal} from "flowbite-react/lib/esm/components/Modal";

function NewAccount() {
  const queryClient = useQueryClient();
  /**
   * @Page => Register page
   * @States => username, email, password, isHidden, isTOCChecked
   * @Event => Call loginUser() mutation function and store the user token in localStorage/cookie
   */

  /* States */
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isTOCChecked, setIsTOCChecked] = useState<boolean>(false);
  const [code, setCode] = useState();

  // DONE: setup modal
  const [otpModal, OTPModal] = useModal({
    title: "Enter OTP Code",
    content: <RegisterOTPModal email={email} otpCode={code} />,
  });

  // DONE: setup useMutation
  const { mutate, isLoading, data } = useMutation(registerUser, {
    onSuccess: ({ data, message, success }) => {
      console.log(data, message, "Returned register data");
      if (message === "User with the email already exist") {
        setCode(data?.otp);
      } else {
        setCode(data?.otp);
      }
      otpModal.show();
    },
    onError: () => console.error("There was an error trying to register"),
    onSettled: () => queryClient.invalidateQueries("register"),
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
            Create your account
          </h3>
          <p className="text-slate-500 font-normal text-sm">
            Welcome, provide your details below to create your account.
          </p>
          <br />

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Full Name
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span>
              <input
                type="text"
                placeholder="James Doe"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
                value={fullName}
                onChange={(e) => {
                  console.info("Full name", e.target.value);
                  setFullName(e.target.value);
                }}
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Username
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-1 w-[100%]"
                value={username}
                onChange={(e) => {
                  console.info("Username", e.target.value);
                  setUsername(e.target.value);
                }}
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
                type="email"
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
          <div className="form-control">
            <label className="cursor-pointer label flex items-center justify-center">
              <input
                type="checkbox"
                // checked="checked"
                checked={isTOCChecked}
                onChange={(e) => {
                  console.log(e.target.checked, "TOC Checkbox changed");
                  setIsTOCChecked(e.target.checked);
                }}
                className="checkbox checkbox-sm rounded-md checked:bg-primary"
              />
              <span className="label-text text-xs ml-2">
                By creating an account, you agree to our
                <b>Terms & conditions</b> and <b>Privacy policy</b>
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
            text="Create account"
            icon={null}
            iconPosition={null}
            onClick={async (e) => {
              console.info("Button comp clicked", e);
              const data: RegisterData = {
                fullName: fullName,
                username: username,
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
          <span className="text-slate-500 text-sm">
            Already have an account?
          </span>
          <span className="text-primary text-sm font-bold">
            <Link href="/login" passHref>
              <a>Log in</a>
            </Link>
          </span>
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
      <OTPModal />
    </div>
  );
}

const RegisterOTPModal = ({ email, otpCode }) => {
  const { push } = useRouter();
  //Passing in the otp here is just for dev test and should be removed in production
  const queryClient = useQueryClient();
  const resendOTPMutation = useMutation(resendEmailOTP, {
    onSuccess: (data) => {
      console.log(data, "Returned resend OTP data");
    },
    onError: () => console.error("There was an error trying to resend OTP"),
    // onSettled: () => queryClient.invalidateQueries("resend_otp"),
  });

  const confirmOTPMutation = useMutation(verifyEmailOTP, {
    onSuccess: (data) => {
      console.log(data, "Returned verify OTP data");
    },
    onError: () => console.error("There was an error trying to verify OTP"),
    // onSettled: () => queryClient.invalidateQueries("verify"),
  });

  const [otp, setOTP] = useState<string | undefined>();

  return (
    <>
      <div className="flex flex-col mt-4 items-center">
        <span>Enter the OTP you received at</span>
        <span className="font-bold">{email}</span>
        <span>
          Enter {otpCode} into the input field *NOTE: this is just for test
          purposes and will be changed in production
        </span>
      </div>
      <OTPInput
        autoFocus
        isNumberInput={false}
        length={6}
        onChangeOTP={function (otp: string) {
          console.log(otp, "OTP String", otp.length);
          setOTP(otp);
        }}
        className="flex flex-row justify-center text-center px-2 mt-5"
        inputClassName="m-2 border h-10 w-10 desktop:w-14 desktop:h-14 text-center form-control rounded"
      />
      <div className="flex justify-center text-center mt-5">
        {!resendOTPMutation.isLoading && (
          <a
            className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
            onClick={async (e) => {
              const data = await resendOTPMutation.mutateAsync(email);
              console.log(data, "Resend OTP data");
            }}
          >
            <span className="font-bold">Resend OTP</span>
            <FaCaretRight />
          </a>
        )}
        {resendOTPMutation.isLoading && (
          <svg
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
      <ButtonPrimary
        text="Confirm OTP"
        icon={null}
        iconPosition={null}
        onClick={async (e) => {
          console.info("Button comp clicked", e);
          const data: VerifyEmailOTPData = {
            code: otp,
            email: email,
          };
          const { success, message } = await confirmOTPMutation.mutateAsync(
            data
          );
          console.log(success, message, "Verify OTP response data");
          push("/login");
        }}
        isLoading={confirmOTPMutation.isLoading}
        type={"normal"}
        disabled={false}
        block={true}
      />
    </>
  );
};

export default NewAccount;
