import { utils } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import Loader from "../../components/Loader";
import OnboardCard from "../../components/OnboardCard";
import { SurveyAnswerEntry } from "../../components/Survey";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";

export enum AnswerStage {
  Details = "Details",
  Answers = "Answers",
  Finish = "Finish",
}

function TakeSurvey() {
  const {
    asPath,
    pathname,
    push,
    back,
    query: { surveyURI, amount, validatorCount, responseCount, surveyId },
  } = useRouter();
  // State
  const [stage, setStage] = useState(AnswerStage.Details);
  const [surveyDetails, setSurveyDetails] = useState<any>();

  // Context
  const { sonergyBalance } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();

  useEffect(() => {
    if (surveyURI) {
      (async () => {
        const json = await pullData(surveyURI);
        console.log(json, "Inside USEFFECT");
        setSurveyDetails(json);
      })();
    }
  }, [surveyURI]);

  return (
    <div className="w-full">
      {!isPullingData && stage === AnswerStage.Details && (
        <SurveyDetail
          setStage={setStage}
          back={back}
          details={{ amount, ...surveyDetails }}
          symbol={sonergyBalance.symbol}
          validatorCount={validatorCount}
          responseCount={responseCount}
        />
      )}
      {!isPullingData && stage === AnswerStage.Answers && (
        <SurveyAnswers
          setStage={setStage}
          questions={[...surveyDetails?.questions]}
          surveyID={Number(surveyId)}
        />
      )}
      {!isPullingData && stage === AnswerStage.Finish && (
        <SurveyFinished
          surveyReward={(Number(amount) / Number(responseCount)).toString()}
          push={push}
          symbol={sonergyBalance.symbol}
        />
      )}
      {isPullingData && <Loader />}
    </div>
  );
}

const SurveyDetail = ({
  setStage,
  back,
  details,
  symbol,
  validatorCount,
  responseCount,
}) => (
  <>
    <div className="flex flex-col items-start justify-start w-full max-h-full bg-transparent mobile:p-3 mb-10">
      <div
        className="flex items-center justify-start space-x-1 mb-3 hover:cursor-pointer"
        onClick={(e) => back()}
      >
        <AiFillLeftCircle />
        <span className="text-sm font-medium text-gray-800">
          Survey details
        </span>
      </div>
      <OnboardCard>
        <span className="text-xs text-center text-slate-800 font-light mb-2">
          Survey rewards
        </span>
        <p className="flex items-center justify-center mb-4">
          <b className="text-md text-slate-800 font-medium">
            {Number(utils.formatUnits(details?.amount || "2000000", 18))
              .toFixed(2)
              .split(".")[0] || "0"}
            <small className="text-xs">
              .
              {Number(utils.formatUnits(details?.amount || "200000", 18))
                .toFixed(2)
                .split(".")[1] || "00"}{" "}
              <span className="text-2xs font-light ml-1">
                {symbol || "SNEGY"}
              </span>
            </small>
          </b>
        </p>
        <div className="w-full flex flex-col border-dashed border-slate-400 border-[1px] bg-slate-100 rounded-lg p-4">
          <span className="text-xs text-gray-500 mb-1">Survey topic</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {details?.surveyTitle ||
              "Blockchain development and utilization in sub-saharan Africa."}
          </span>
          <span className="text-xs text-gray-500 mb-1">Survey description</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {details?.description || "Survey description"}
          </span>
          <span className="text-xs text-gray-500 mb-1">Questions</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {details?.questions?.length || "12"}
          </span>
          <span className="text-xs text-gray-500 mb-1">
            Required respondents
          </span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {responseCount || "15"}
          </span>
          <span className="text-xs text-gray-500 mb-1">
            Required validators
          </span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {validatorCount || "10"}
          </span>
          <span className="text-xs text-gray-500 mb-1">Expiry date</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            {new Date(details?.dateExpiration).toLocaleString() ||
              "July 24, 2022 11:35 AM"}
          </span>
        </div>
      </OnboardCard>
    </div>
    <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3">
      <ButtonPrimary
        type="normal"
        text="Answer survey"
        icon={undefined}
        iconPosition={undefined}
        block={true}
        onClick={(e) => {
          console.log(e, "answer survey");
          setStage(AnswerStage.Answers);
        }}
        disabled={false}
        isLoading={false}
      />
    </div>
  </>
);

const SurveyAnswers = ({
  setStage,
  questions,
  surveyID,
}: {
  setStage: any;
  questions: any;
  surveyID: number;
}) => {
  console.log(questions, "Questions");
  return (
    <SurveyAnswerEntry
      setStage={setStage}
      questions={questions}
      surveyID={surveyID}
    />
  );
};

const SurveyFinished = ({ surveyReward = "500", push, symbol }) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <div className="py-24 flex flex-col items-center justify-center">
            <img src="/surveys/completed-survey.svg" alt="Survey done" />
            <span className="text-center text-slate-800 text-lg font-semibold mb-2">
              Congratulations!
            </span>
            <span className="text-center text-slate-400 text-sm font-light">
              Your survey is complete and you will earn{" "}
              <b className="text-slate-800 font-medium">
                {Number(utils.formatUnits(surveyReward, 18)).toFixed()}
              </b>{" "}
              {symbol || "SNEGY"} once your answers have been verified if
              applicable.
            </span>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Let’s do more"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => {
            console.log(e, "Lets do more");
            push("/home/");
          }}
          isLoading={false}
          disabled={false}
        />
      </div>
    </>
  );
};

export default withLayout(TakeSurvey);
