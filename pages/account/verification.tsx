import { ButtonGhost, ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Verification() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
      <OnboardCard>
          {/* <progress className="progress bg-blue-300 w-full mb-2" value="50" max="100"></progress> */}
          <span className="text-lg font-[600] text-gray-700 mb-1">Verification</span>
          <span className="text-[14px] font-[400] text-gray-600 mb-4">Supply your KYC information.</span>
          
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Identity Type</span>
            </label>
            <select className="select select-bordered w-full bg-transparent text-slate-400">
              <option disabled selected>- Select -</option>
              <option>National Identification Number</option>
              <option>International Passport</option>
              <option>Voters Card</option>
              <option>Drivers License</option>
            </select>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">ID Number</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                placeholder="Enter ID number"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              {/* <span>USD</span> */}
            </label>
          </div>

          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Upload File</span>
            </label>
            <div className="flex justify-center items-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-auto bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-6 pb-7">
                      <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF (Max upload size. 100MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          
          <ButtonPrimary type="normal" text="Submit" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "Submit clicked")} />
          <ButtonGhost type="normal" text="Advanced verification" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "advanced verification clicked")} />
        </OnboardCard>
      </div>
    </div>
  );
}

const VerificationAlert = () => (
  <div className="flex p-4 mb-4 text-sm  bg-blue-100 rounded-lg border-blue-400 border-dashed border-[1.5px] dark:border-blue-400 dark:bg-blue-200 " role="alert">
    <svg className="inline flex-shrink-0 mr-3 w-5 h-5 text-gray-700 dark:text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <div>
      <span className="font-[400] text-xs dark:text-gray-700 text-gray-700">
        Your verification document has been received, It typically takes 48 hours to be reviewed. Track your verification status on your profile tab.
      </span>
    </div>
  </div>
);


export default withLayout(Verification);