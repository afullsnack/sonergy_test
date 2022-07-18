import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";

function TakeSurvey() {
  const { asPath, pathname, push } = useRouter();

  // Get stages from asPath route info
  const [stage, setStage] = useState<string | undefined>(asPath.split("#")[1]);
  const TOTAL_QUESTIONS: number = 10;

  // Effect when asPath changes i.e: when #question-{n} in the path changes
  useEffect(() => {
    setStage((prevStage) =>
      asPath.split("#")[1] === prevStage ? prevStage : asPath.split("#")[1]
    );
    console.log(stage, asPath, "Path and path modification");
  }, [asPath]);

  // Next and Previous action callbacks
  const nextClick = useCallback(
    (n: string) => push(`/home/take-survey#question-${n}`),
    [stage]
  );
  const prevClick = useCallback(
    (n: string) => push(`/home/take-survey#question-${n}`),
    [stage]
  );

  // TODO: render template will be to have a slider that works based in the current asPath or stage value

  return (
    <div className="w-full">
      <SurveyFinished />
    </div>
  );
}

const SurveyDetail = ({ router }) => (
  <>
    <div className="flex flex-col items-start justify-start w-full max-h-full bg-transparent mobile:p-3 mb-10">
      <div
        className="flex items-center justify-start space-x-1 mb-3"
        onClick={(e) => router.back()}
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
            200.
            <small className="text-xs">
              00 <span className="text-2xs font-light ml-1">SNEGY</span>
            </small>
          </b>
        </p>
        <div className="w-full flex flex-col border-dashed border-slate-400 border-[1px] bg-slate-100 rounded-lg p-4">
          <span className="text-xs text-gray-500 mb-1">Survey topic</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            Blockchain development and utilization in sub-saharan Africa.
          </span>
          <span className="text-xs text-gray-500 mb-1">Questions</span>
          <span className="text-xs font-medium text-gray-800 mb-3">12</span>
          <span className="text-xs text-gray-500 mb-1">
            Required respondents
          </span>
          <span className="text-xs font-medium text-gray-800 mb-3">50</span>
          <span className="text-xs text-gray-500 mb-1">
            Required validators
          </span>
          <span className="text-xs font-medium text-gray-800 mb-3">10</span>
          <span className="text-xs text-gray-500 mb-1">Expiry date</span>
          <span className="text-xs font-medium text-gray-800 mb-3">
            July 24, 2022 11:35 AM
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
        onClick={(e) => console.log(e, "answer survey")}
        isLoading={false}
      />
    </div>
  </>
);

const SurveyQuestion = ({ router }) => {
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
            Questions 1 of 3
          </span>
          <span className="text-md font-medium text-gray-800 mb-5">
            What is your favorite type of dessert?
          </span>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-primary"
                checked
              />
              <span className="label-text">Pastries</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-primary"
                checked
              />
              <span className="label-text">Candies and chocolates</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-primary"
                checked
              />
              <span className="label-text">Cakes</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-primary"
                checked
              />
              <span className="label-text">Cookies</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input
                type="radio"
                name="radio-6"
                className="radio mr-2 checked:bg-primary"
                checked
              />
              <span className="label-text">None of the above</span>
            </label>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3">
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

const SurveyFinished = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <div className="py-24 flex flex-col items-center justify-center">
            <Image src="/surveys/completed-survey.svg" alt="Survey done" />
            <span className="text-center text-slate-800 text-lg font-semibold mb-2">
              Congratulations!
            </span>
            <span className="text-center text-slate-400 text-sm font-light">
              Your survey is complete and you will earn{" "}
              <b className="text-slate-800 font-medium">500</b> SNEGY once your
              answers have been verified if applicable.
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
          onClick={(e) => console.log(e, "Lets do more")}
          isLoading={false}
        />
      </div>
    </>
  );
};

export default withLayout(TakeSurvey);
