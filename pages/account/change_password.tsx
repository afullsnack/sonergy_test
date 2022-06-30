import { FaEyeSlash, FaLock } from "react-icons/fa";
import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function ChangePassword() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
      <OnboardCard>
          {/* <progress className="progress bg-blue-300 w-full mb-2" value="50" max="100"></progress> */}
          <span className="text-lg font-[600] text-gray-700 mb-1">Change Password</span>
          <span className="text-[14px] font-[400] text-gray-600 mb-4">Change or update your password frequently for additional security on your account.</span>

          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Old Password</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaLock color="#8895A7" />
              </span>
              <input
                type="text"
                placeholder="Enter old password"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              <span className="flex items-center justify-center pl-1 pr-4 bg-transparent">
                <FaEyeSlash color="#8895A7" />
              </span>
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">New Password</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaLock color="#8895A7" />
              </span>
              <input
                type="text"
                placeholder="Enter new password"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              <span className="flex items-center justify-center pl-1 pr-4 bg-transparent">
                <FaEyeSlash color="#8895A7" />
              </span>
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Confirm Password</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaLock color="#8895A7" />
              </span>
              <input
                type="text"
                placeholder="Confirm new password"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              <span className="flex items-center justify-center pl-1 pr-4 bg-transparent">
                <FaEyeSlash color="#8895A7" />
              </span>
            </label>
          </div>
          <ButtonPrimary type="normal" text="Change password" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "Change password clicked")} />
        </OnboardCard>
      </div>
    </div>
  );
}


export default withLayout(ChangePassword);