import { AiFillCheckSquare } from "react-icons/ai";
import { ButtonGhost, ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";

function CreateSurvey() {
  return (
    <div className="w-full">
      <SurveyRewards />
    </div>
  );
}

const SurveyPlans = (props) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <div className="w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-slate-200 hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
          <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
            {/* <Image class="h-12 w-12" src="/Image/logo.svg" alt="User logo" /> */}
            <AiFillCheckSquare color="#0059AC" />
          </div>
          <div>
            <div className="text-sm font-medium text-black">Free plan</div>
            <p className="text-slate-500 text-sm">
              Max. response - <b className="font-medium text-black">15</b>
              <br />
              Max. validated response -{" "}
              <b className="font-medium text-black">0</b>
              <br />
              Cost - <b className="font-medium text-black">0 SNEGY</b>
              <br />
            </p>
          </div>
        </div>
        <div className="w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-slate-200 hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
          <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
            {/* <Image class="h-12 w-12" src="/Image/logo.svg" alt="User logo" /> */}
            <AiFillCheckSquare color="#0059AC" />
          </div>
          <div>
            <div className="text-sm font-medium text-black">Basic plan</div>
            <p className="text-slate-500 text-sm">
              Max. response - <b className="font-medium text-black">50</b>
              <br />
              Max. validated response -{" "}
              <b className="font-medium text-black">10</b>
              <br />
              Cost - <b className="font-medium text-black">500 SNEGY</b>
              <br />
            </p>
          </div>
        </div>
        <div className="w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-slate-200 hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
          <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
            {/* <Image class="h-12 w-12" src="/Image/logo.svg" alt="User logo" /> */}
            <AiFillCheckSquare color="#0059AC" />
          </div>
          <div>
            <div className="text-sm font-medium text-black">Cooperate plan</div>
            <p className="text-slate-500 text-sm">
              Max. response -{" "}
              <b className="font-medium text-black">Unlimited</b>
              <br />
              Max. validated response -{" "}
              <b className="font-medium text-black">Unlimited</b>
              <br />
              Cost - <b className="font-medium text-black">10 SNEGY</b> per
              response
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Choose plan"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Choose survey")}
          isLoading={false}
        />
      </div>
    </>
  );
};

const SurveyConfigs = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <progress
            className="progress bg-blue-300 w-full mb-2"
            value="30"
            max="100"
          ></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">
            Step 1 of 4
          </span>
          <span className="text-md font-medium text-gray-800 mb-8">
            Survey configuration
          </span>

          <span className="text-sm font-medium text-gray-800 mb-3">
            Survey Topic
          </span>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Topic
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                placeholder="Enter topic"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <span className="text-sm font-medium text-gray-800 mb-3">
            Duration of survey
          </span>
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-4">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  From
                </span>
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
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  To
                </span>
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
          </div>
          <span className="text-sm font-medium text-gray-800 mb-3">
            Question type
          </span>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="checkbox"
                className="checkbox mr-2 checked:bg-primary"
              />
              <span className="label-text text-slate-800">Multiple choice</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="checkbox"
                className="checkbox mr-2 checked:bg-primary"
              />
              <span className="label-text text-slate-800">Optional</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="checkbox"
                className="checkbox mr-2 checked:bg-primary"
              />
              <span className="label-text text-slate-800">
                Free form
                <div className="badge bg-orange-200 text-orange-700 text-xs border-none ml-2 mb-3">
                  Coming soon
                </div>
              </span>
            </label>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Continue"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Choose survey")}
          isLoading={false}
        />
      </div>
    </>
  );
};

const SurveyRewards = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <progress
            className="progress bg-blue-300 w-full mb-2"
            value="50"
            max="100"
          ></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">
            Step 2 of 4
          </span>
          <span className="text-md font-medium text-gray-800 mb-8">
            Responses, validation and rewards
          </span>

          <span className="text-sm font-medium text-gray-800 mb-3">
            Responses
          </span>
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  Required response
                </span>
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
                <span className="label-text text-slate-700 font-medium">
                  Reward per response
                </span>
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
                <span className="label-text text-slate-700 font-medium">
                  Required validators
                </span>
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
                <span className="label-text text-slate-700 font-medium">
                  Reward per validator
                </span>
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
              <span className="label-text text-slate-700 font-medium">
                Number of survey questions
              </span>
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
        <ButtonGhost
          type="normal"
          text="Previous"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Previous survey")}
          isLoading={false}
        />
        <ButtonPrimary
          type="normal"
          text="Next"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Next survey")}
          isLoading={false}
        />
      </div>
    </>
  );
};

export default withLayout(CreateSurvey);
