import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Biodata() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-5">
      <OnboardCard>
          <progress className="progress bg-blue-300 w-full mb-2" value="50" max="100"></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">Step 2 of 4</span>
          <span className="text-md font-medium text-gray-800 mb-8">Responses, validation and rewards</span>

          <span className="text-sm font-medium text-gray-800 mb-3">
            Responses
          </span>
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">Required response</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">Reward per response</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="number"
                  placeholder="0 SNEGY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-800 mb-3">
            Validations
          </span>
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">Required validators</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">Reward per validator</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="number"
                  placeholder="0 SNEGY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-800 mb-3">
            Number of questions
          </span>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Number of survey questions</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="number"
                placeholder="0"
                min="1"
                max="10"
                // value="0"
                step="1"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          
        </OnboardCard>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-white w-full mobile:p-3">
        <ButtonPrimary type="normal" text="Save" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "Save bio data")} />
      </div>
    </div>
  );
}


export default withLayout(Biodata);