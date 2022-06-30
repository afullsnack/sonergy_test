import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Biodata() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
      <OnboardCard>
          {/* <progress className="progress bg-blue-300 w-full mb-2" value="50" max="100"></progress> */}
          <span className="text-lg font-[600] text-gray-700 mb-1">Bio Data</span>
          <span className="text-[14px] font-[400] text-gray-600 mb-4">Complete / Update your personal information.</span>

          {/* <span className="text-sm font-medium text-gray-800 mb-3">
            Responses
          </span> */}
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">First Name</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">Last Name</span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          {/* <span className="text-sm font-medium text-gray-800 mb-3">
            Number of questions
          </span> */}
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Date of Birth</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Gender</span>
            </label>
            <select className="select select-bordered w-full bg-transparent text-slate-400">
              <option disabled selected>- Select -</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Address</span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                placeholder="Enter address"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">Nationality</span>
            </label>
            <select className="select select-bordered w-full bg-transparent text-slate-400">
              <option disabled selected>- Select -</option>
              <option>Nigeria</option>
              <option>Algeria</option>
              <option>Canada</option>
              <option>Mali</option>
              <option>Ghana</option>
            </select>
          </div>
          
          <ButtonPrimary type="normal" text="Save" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "Save bio data")} />
        </OnboardCard>
      </div>
    </div>
  );
}


export default withLayout(Biodata);