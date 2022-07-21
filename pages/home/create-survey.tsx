import { utils } from "ethers";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import { FaCheck } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ButtonGhost, ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useModal } from "../../components/Modal";
import OnboardCard from "../../components/OnboardCard";
import { SurveyQAEntry, SurveyQuestionsData } from "../../components/Survey";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { addSurvey } from "../../lib/mutations";
import { getSurveyPlans } from "../../lib/queries";

export enum Stage {
  Plan = "Plan",
  Config = "Config",
  Rewards = "Rewards",
  Questions = "Questions",
  Review = "Review",
}

function CreateSurvey() {
  // State
  const [stage, setStage] = useState(Stage.Plan);

  // Survey config
  const [planId, setPlanId] = useState<string>();
  const [surveyTopic, setSurveyTopic] = useState<string>();
  const [surveyDescription, setSurveyDescription] = useState<string>();
  const [commissionerCount, setCommissionerCount] = useState<number>();
  const [validatorCount, setValidatorCount] = useState<number>();
  const [commissionerFee, setCommissionerFee] = useState<number>();
  const [validatorFee, setValidatorFee] = useState<number>();
  const [questionCount, setQuestionCount] = useState<number>();
  const [createdAt, setCreatedAt] = useState<string>();
  const [expireAt, setExpireAt] = useState<string>();

  // Survey questions
  const [questions, setQuestions] = useState<SurveyQuestionsData[]>([]);

  return (
    <div className="w-full">
      {stage === Stage.Plan && (
        <SurveyPlans
          setPlanId={setPlanId}
          planId={planId}
          setStage={setStage}
        />
      )}
      {stage === Stage.Config && (
        <SurveyConfigs
          setSurveyTopic={setSurveyTopic}
          setSurveyDescription={setSurveyDescription}
          surveyTopic={surveyTopic}
          surveyDescription={surveyDescription}
          setCreatedAt={setCreatedAt}
          setExpireAt={setExpireAt}
          setStage={setStage}
        />
      )}
      {stage === Stage.Rewards && (
        <SurveyRewards
          commissionerCount={commissionerCount}
          validatorCount={validatorCount}
          questionCount={questionCount}
          setCommissionerCount={setCommissionerCount}
          setValidatorCount={setValidatorCount}
          setQuestionCount={setQuestionCount}
          commissionerFee={commissionerFee}
          setCommissionerFee={setCommissionerFee}
          validatorFee={validatorFee}
          setValidatorFee={setValidatorFee}
          setStage={setStage}
        />
      )}

      {stage === Stage.Questions && (
        <SurveyQuestions
          questionCount={questionCount}
          setStage={setStage}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}

      {stage === Stage.Review && (
        <SurveyReview
          planId={planId}
          surveyTopic={surveyTopic}
          surveyDescription={surveyDescription}
          commissionerCount={commissionerCount}
          validatorCount={validatorCount}
          questionCount={questionCount}
          commissionerFee={commissionerFee}
          validatorFee={validatorFee}
          createdAt={createdAt}
          expireAt={expireAt}
          questions={questions}
          setStage={setStage}
        />
      )}
    </div>
  );
}

interface SurveyPlanProps {
  setPlanId: Dispatch<SetStateAction<string>>;
  planId: string | undefined;
  setStage: Dispatch<SetStateAction<Stage>>;
}
const SurveyPlans = ({ planId, setPlanId, setStage }: SurveyPlanProps) => {
  const [{ token }] = useCookies(["token"]);

  // State
  const [plansData, setPlansData] = useState([]);

  // query for survey plans
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    ["getSurveyPlans", token],
    () => getSurveyPlans(token),
    {
      onSuccess({ data, message, success }) {
        console.log(data, success, message, "Data from getSurveyPlans query");
        setPlansData(data);
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    }
  );
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-transparent mobile:p-3 mb-10">
        {!isLoading &&
          !!plansData.length &&
          plansData
            .filter((item) => item?.status === true)
            .map((plan) => (
              <div
                key={plan.planID}
                className="w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-slate-200 hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all"
                onClick={() => {
                  setPlanId(plan?.planID);
                  setStage(Stage.Config);
                }}
              >
                <div className="shrink-0 p-3 rounded-box border border-[#E2EDF6]">
                  <img
                    // className="h-12 w-12"
                    src="/surveys/task-square.svg"
                    alt="Survey plan logo"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-black">
                    {plan?.planName}
                  </div>
                  <p className="text-slate-500 text-sm">
                    {/* Max. response - <b className="font-medium text-black">15</b> */}
                    Commissioner profit % -{" "}
                    <b className="font-medium text-black">
                      {plan.providerProfit}
                    </b>
                    <br />
                    Validator profit % -{" "}
                    <b className="font-medium text-black">
                      {plan.validatorsProfit}
                    </b>
                    {/* Max. validated response -{" "}
              <b className="font-medium text-black">0</b> */}
                    <br />
                    Min Amount -{" "}
                    <b className="font-medium text-black">
                      {utils.formatUnits(plan.minAmount, 18)} SNEGYTEST
                    </b>
                    <br />
                  </p>
                </div>
              </div>
            ))}
        {isLoading && <Loader />}
        {/* <div className="w-full p-6 mx-auto my-1 bg-white rounded-lg flex items-start space-x-4 border-[1px] border-solid border-slate-200 hover:border-[#0059AC] hover:cursor-pointer active:ring-4 active:ring-offset-1 active:ring-blue-300 transition-all">
          <div className="shrink-0 p-3 rounded-md border-[1px] border-solid border-[#0059AC]">
            
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
        </div> */}
      </div>
      {/* <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Choose plan"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Choose survey")}
          isLoading={false}
        />
      </div> */}
    </>
  );
};

interface SurveyConfigProps {
  setSurveyTopic: Dispatch<SetStateAction<string>>;
  setSurveyDescription: Dispatch<SetStateAction<string>>;
  surveyTopic: string;
  surveyDescription: string;
  setCreatedAt: Dispatch<SetStateAction<string>>;
  setExpireAt: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<Stage>>;
}
const SurveyConfigs = ({
  setSurveyTopic,
  setSurveyDescription,
  surveyTopic,
  surveyDescription,
  setCreatedAt,
  setExpireAt,
  setStage,
}: SurveyConfigProps) => {
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
                value={surveyTopic}
                onChange={(e) => setSurveyTopic(e.target.value)}
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Description
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <textarea
                placeholder="Enter description"
                rows={3}
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
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
                  type="datetime-local"
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  onChange={(e) => setCreatedAt(e.target.value)}
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
                  type="datetime-local"
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  onChange={(e) => setExpireAt(e.target.value)}
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          {/* <span className="text-sm font-medium text-gray-800 mb-3">
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
          </div> */}
        </OnboardCard>
      </div>
      <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Continue"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => setStage(Stage.Rewards)}
          isLoading={false}
          disabled={false}
        />
      </div>
    </>
  );
};

interface SurveyRewardProps {
  setCommissionerCount: Dispatch<SetStateAction<number>>;
  setValidatorCount: Dispatch<SetStateAction<number>>;
  setQuestionCount: Dispatch<SetStateAction<number>>;
  commissionerCount: number;
  validatorCount: number;
  questionCount: number;
  commissionerFee: number;
  setCommissionerFee: Dispatch<SetStateAction<number>>;
  validatorFee: number;
  setValidatorFee: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<Stage>>;
}
const SurveyRewards = ({
  commissionerCount,
  validatorCount,
  questionCount,
  setCommissionerCount,
  setValidatorCount,
  setQuestionCount,
  commissionerFee,
  setCommissionerFee,
  validatorFee,
  setValidatorFee,
  setStage,
}: SurveyRewardProps) => {
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
                  value={commissionerCount}
                  onChange={(e) => setCommissionerCount(Number(e.target.value))}
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
                  value={commissionerFee}
                  onChange={(e) => setCommissionerFee(Number(e.target.value))}
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
                  value={validatorCount}
                  onChange={(e) => setValidatorCount(Number(e.target.value))}
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
                  value={validatorFee}
                  onChange={(e) => setValidatorFee(Number(e.target.value))}
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
                // value="0"
                step="1"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
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
          onClick={(e) => setStage(Stage.Config)}
          isLoading={false}
          disabled={false}
        />
        <ButtonPrimary
          type="normal"
          text="Next"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => setStage(Stage.Questions)}
          isLoading={false}
          disabled={false}
        />
      </div>
    </>
  );
};

// Survey questions comp
interface SurveyQuestionsProps {
  questionCount: number;
  questions: any[];
  setQuestions: Dispatch<SetStateAction<SurveyQuestionsData[]>>;
  setStage: Dispatch<SetStateAction<Stage>>;
}
const SurveyQuestions = ({
  questionCount,
  setStage,
  setQuestions,
  questions,
}: SurveyQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <progress
            className="progress bg-blue-300 w-full mb-2"
            value="70"
            max="100"
          ></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">
            Step 3 of 4
          </span>
          <span className="text-md font-medium text-gray-800 mb-8">
            Add survey questions
          </span>
          <span className="text-base font-medium text-gray-800 mb-4">
            Question {currentQuestion} of {questionCount}
          </span>

          {/* <span className="text-sm font-medium text-gray-800 mb-3">
            Survey Topic
          </span> */}

          {new Array(questionCount)
            .fill("autoComp")
            .map((ignore, idx: number) => (
              <>
                {currentQuestion === idx + 1 && (
                  <SurveyQAEntry
                    key={idx.toString()}
                    currentQuestion={currentQuestion}
                    questionCount={questionCount}
                    setCurrentQuestion={setCurrentQuestion}
                    setStage={setStage}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                )}
              </>
            ))}
        </OnboardCard>
      </div>
    </>
  );
};

interface SurveyReviewProps {
  planId: string;
  surveyTopic: string;
  surveyDescription: string;
  commissionerCount: number;
  validatorCount: number;
  questionCount: number;
  commissionerFee: number;
  validatorFee: number;
  createdAt: string;
  expireAt: string;
  questions: any[];
  setStage: Dispatch<SetStateAction<Stage>>;
}
const SurveyReview = ({
  planId,
  surveyTopic,
  surveyDescription,
  commissionerCount,
  validatorCount,
  questionCount,
  commissionerFee,
  validatorFee,
  createdAt,
  expireAt,
  questions,
  setStage,
}: SurveyReviewProps) => {
  const [{ token }] = useCookies(["token"]);
  const { address, approveSpend, sonergyBalance } = useWalletContext();
  const router = useRouter();
  const {
    pushQuestionsToIPFSForConnected,
    pushQuestionsToIPFSForInbuilt,
    isPushingData,
  } = useIPFSContext();

  // Modal
  const [createSurveyModal, CreateSurveyModal] = useModal();

  const { mutate, isLoading, error } = useMutation(addSurvey, {
    onSuccess: ({ data, success, message }) => {
      console.log(data, success, message, "Returned add survey data");

      if (success) {
      }
    },
    onError: () => console.error("There was an error adding survey"),
    // onSettled: () => queryClient.invalidateQueries("login"),
  });

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <progress
            className="progress bg-blue-300 w-full mb-2"
            value="100"
            max="100"
          ></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">
            Step 4 of 4
          </span>
          <span className="text-md font-medium text-gray-800 mb-8">
            Preview and commission survey
          </span>

          <div className="w-full flex flex-col border-dashed border-slate-400 border-[1px] bg-slate-100 rounded-lg p-4">
            <span className="text-xs text-gray-500 mb-1">Survey topic</span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {surveyTopic}
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Survey description
            </span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {surveyDescription}
            </span>
            <span className="text-xs text-gray-500 mb-1">Questions</span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {questionCount}
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Required respondents
            </span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {commissionerCount}
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Required validators
            </span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {validatorCount}
            </span>
            <span className="text-xs text-gray-500 mb-1">Expiry date</span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {new Date(expireAt).toLocaleDateString()}{" "}
              {new Date(expireAt).toLocaleTimeString()}
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Respondent rewards
            </span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {commissionerFee.toString()} {sonergyBalance.symbol}
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Validator rewards
            </span>
            <span className="text-xs font-medium text-gray-800 mb-3">
              {validatorFee.toString()} {sonergyBalance.symbol}
            </span>
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
          onClick={(e) => setStage(Stage.Questions)}
          isLoading={false}
          disabled={false}
        />
        <ButtonPrimary
          type="normal"
          text="Create Survey"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          disabled={false}
          onClick={async (e) => {
            // Call ipfs context push method
            console.log(e, "Submit survey to ipfs and create", questions);
            if (address) {
              //iF wallet is connected go this route
              const data = await pushQuestionsToIPFSForConnected(
                {
                  surveyTitle: surveyTopic,
                  description: surveyDescription,
                  dateCreated: createdAt,
                  dateExpiration: expireAt,
                  questions: questions,
                },
                {
                  surveyPlanId: planId,
                  numOfValidators: validatorCount.toString(),
                  amount: utils.parseUnits(
                    (
                      commissionerFee * commissionerCount +
                      validatorFee * validatorCount
                    ).toString(),
                    18
                  ),
                  numberOfCommissioners: commissionerCount.toString(),
                }
              );
              console.log(data, "Data");
              createSurveyModal.show({
                title: "Create survey",
                content: (
                  <SurveyCreationModalContent
                    surveyTopic={surveyTopic}
                    router={router}
                  />
                ),
              });
            } else {
              //USe inbuilt wallet address to create survey
              const data = await pushQuestionsToIPFSForInbuilt(
                {
                  surveyTitle: surveyTopic,
                  description: surveyDescription,
                  dateCreated: createdAt,
                  dateExpiration: expireAt,
                  questions: questions,
                },
                {
                  surveyPlanId: planId,
                  numOfValidators: validatorCount.toString(),
                  amount: utils.formatUnits(
                    utils.parseUnits(
                      (
                        commissionerFee * commissionerCount +
                        validatorFee * validatorCount
                      ).toString(),
                      18
                    ),
                    "wei"
                  ),
                  numberOfCommissioners: commissionerCount.toString(),
                }
              );
              console.log(data, "Data");
              createSurveyModal.show({
                title: "Create survey",
                content: (
                  <SurveyCreationModalContent
                    surveyTopic={surveyTopic}
                    router={router}
                  />
                ),
              });
            }

            // .map((item) => {
            //   if (typeof item?.options === "undefined") {
            //     item!.options = String(undefined);
            //   }

            //   return item;
            // }),

            // if (cid && typeof cid === "string") {
            //   mutate({
            //     token: token,
            //     surveyURI: cid,
            //     surveyPlanId: planId,
            //     address: address,
            //     // enrollForSurvey: "",
            //     numOfValidators: validatorCount.toString(),
            //     amount: "5000000000000000000",
            //     numberOfCommissioners: commissionerCount.toString(),
            //   });
            // }

            // console.log(cid, "Returned CID");
          }}
          isLoading={isPushingData}
        />
      </div>
      <CreateSurveyModal />
    </>
  );
};

const SurveyCreationModalContent = ({ surveyTopic, router }) => (
  <div className="w-full flex flex-col items-center space-y-2">
    <div className="w-10 h-10 rounded-full bg-primary mb-4 flex items-center justify-center">
      <FaCheck className="text-white text-lg" />
    </div>
    <span className="text-black text-lg font-[600] mb-2">
      Survey created successfully
    </span>
    <span className="text-black text-lg font-[600] text-center mb-5">
      Your survey on {surveyTopic} has been created successfully. you can access
      this on your surveys tab.
    </span>
    <ButtonPrimary
      type="normal"
      text="Ok, got it"
      icon={undefined}
      iconPosition={undefined}
      block={true}
      onClick={async (e) => router.push("/home/")}
      disabled={false}
      isLoading={false}
    />
  </div>
);

export default withLayout(CreateSurvey);
