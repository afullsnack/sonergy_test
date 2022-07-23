import { utils } from "ethers";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  AiFillClockCircle,
  AiFillDollarCircle,
  AiOutlineArrowRight,
  AiOutlineRight,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useIPFSContext } from "../lib/contexts/ipfsContext";
import { useWalletContext } from "../lib/contexts/walletContext";
import { Stage } from "../pages/home/create-survey";
import { AnswerStage } from "../pages/home/take-survey";
import { useToast } from "./Alerts";
import { ButtonGhost, ButtonPrimary } from "./Button";
import OnboardCard from "./OnboardCard";

export const MySurveyList = ({ title, count, onClick, icon }) => {
  return (
    <div
      className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 rounded-2xl border-solid border-[#E2EDF6] border-[.9px] p-3">
        <img src={icon} alt="My Survey logos" />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-sm font-light text-gray-600">{title}</div>
          <p className="text-[16px] text-gray-700 font-medium">{count}</p>
        </div>
        <AiOutlineRight color="black" />
      </div>
    </div>
  );
};

export const AvailableSurveyCarousel = ({ data }: { data: any[] }) => {
  const router = useRouter();

  return (
    <div className="w-full carousel max-w-full desktop:max-w-screen-desktop space-x-6 px-10 mobile:px-8 bg-transparent hover:cursor-pointer">
      {data?.map((item, idx) => (
        <div className="carousel-item mobile:min-w-full" key={idx?.toString()}>
          <OnboardCard>
            <div className="flex flex-col items-start justify-between mb-3">
              <span className="text-gray-700 text-sm font-normal text-left mb-2">
                {item?.description ||
                  "Blockchain development and utilisation in sub-saharan Africa."}
              </span>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillDollarCircle size={14} />{" "}
                <b className="text-gray-700 text-xs mr-1 ml-1">
                  {utils.formatUnits(item?.amount, 18) || "200"}
                </b>
                <span className="text-xs">{item?.symbol || "SNEGY"}</span>{" "}
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  Expires on{" "}
                  {`${new Date(
                    item.dateExpiration
                  ).toLocaleDateString()} ${new Date(
                    item.dateExpiration
                  ).toLocaleTimeString()}` || "2 days 11 hours"}
                </span>{" "}
              </p>
            </div>
            <ButtonGhost
              text="Take survey"
              type="normal"
              icon={<AiOutlineArrowRight />}
              iconPosition="right"
              block={true}
              onClick={(e) => {
                console.log("Take survey clicked", e);
                router.push(
                  `/home/take-survey?surveyURI=${item?.uri}&surveyId=${item?.surveyId}&amount=${item?.amount}&validatorCount=${item?.valCount}&responseCount=${item?.responseCount}`
                );
              }}
              disabled={false}
              isLoading={false}
            />
          </OnboardCard>
        </div>
      ))}
    </div>
  );
};

export const EmptySurveyList = () => {
  return (
    <OnboardCard>
      <div className="w-full flex flex-col items-center justify-around">
        <div className="p-4 rounded-full bg-slate-100 mb-2">
          <img src="/empty_state_icon.svg" width={70} alt="No transaction" />
        </div>
        <h2 className="text-gray-700 text-sm desktop:text-md font-semibold mb-1">
          No surveys at this time
        </h2>
        <span className="text-gray-500 text-xs text-center">
          There are currently no surveys, we’ll notify you when a new survey is
          available.
        </span>
      </div>
    </OnboardCard>
  );
};

export enum QuestionType {
  MultiChoice = "multi-choice",
  SingleChoice = "single-choice",
  FreeForm = "free-form",
}

export interface SurveyQuestionsData {
  id: string;
  questionType: string;
  question: string;
  options: { id: string; choice: string }[] | undefined | null;
}

interface SurveyQAEntryProps {
  questions: SurveyQuestionsData[];
  currentQuestion: number;
  questionCount: number;
  setQuestions: Dispatch<SetStateAction<SurveyQuestionsData[]>>;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  setStage: Dispatch<SetStateAction<Stage>>;
}

export const SurveyQAEntry = ({
  questions,
  currentQuestion,
  setQuestions,
  questionCount,
  setCurrentQuestion,
  setStage,
}: SurveyQAEntryProps) => {
  const [type, setType] = useState<string>(
    !!questions.length
      ? questions[currentQuestion - 1]?.questionType || QuestionType.MultiChoice
      : QuestionType.MultiChoice
  );
  const [q, setQ] = useState<string | undefined | null>(
    !!questions.length
      ? questions[currentQuestion - 1]?.question || undefined
      : undefined
  );
  const [a, setA] = useState<string[] | undefined | null>(
    !!questions.length
      ? questions[currentQuestion - 1]?.options?.map((item) => item.choice) ||
          undefined
      : type === QuestionType.MultiChoice || type === QuestionType.SingleChoice
      ? [""]
      : null
  );

  const setAnswer = useCallback(
    (value, idx) => {
      setA((prevA) => {
        if (Array.isArray(prevA)) {
          console.log(value, idx, prevA, "output and idx");
          prevA[idx] = value;
          return [...prevA];
        }
        return null;
      });
    },
    [a]
  );

  const handleTypeSelect = useCallback(
    (e) => {
      // console.log(e.target.value, "Check value");
      switch (e.target.value) {
        case QuestionType.FreeForm.toString():
          setType(QuestionType.FreeForm);
          setA(undefined);
          break;
        case QuestionType.MultiChoice.toString():
          setType(QuestionType.MultiChoice);
          setA([""]);
          break;
        case QuestionType.SingleChoice.toString():
          setType(QuestionType.SingleChoice);
          setA([""]);
      }
    },
    [type]
  );

  // Question navigation
  const nextClick = useCallback(() => {
    console.log("TO next question", currentQuestion);
    // update questions array and navigate questions
    setQuestions((prevQuestion) => {
      // IF there was a previously set data
      if (prevQuestion.length) {
        prevQuestion[currentQuestion - 1] = {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        };

        return [...prevQuestion];
      }
      console.log(
        {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        },
        "Previous question data",
        currentQuestion,
        "Current question",
        q,
        "Q/A",
        a
      );

      // Return previously set data and add the new one
      return [
        ...prevQuestion,
        {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        },
      ];
    });
    if (currentQuestion === questionCount) {
      setStage(Stage.Review);
    }

    setCurrentQuestion((prevQ) => prevQ + 1);
    console.info(questions, "Saved questions");
  }, [currentQuestion, a, q, type]);

  const prevClick = useCallback(() => {
    console.log("To previous question", currentQuestion);
    // update questions array and navigate questions
    setQuestions((prevQuestion) => {
      // IF there was a previously set data
      if (prevQuestion.length) {
        prevQuestion[currentQuestion - 1] = {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        };
        return [...prevQuestion];
      }
      console.log(
        {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        },
        "Previous question data",
        currentQuestion,
        "Current question",
        q,
        "Q/A",
        a
      );

      // Return previously set data and add the new one
      return [
        ...prevQuestion,
        {
          id: currentQuestion.toString(),
          questionType: type,
          question: q,
          options: Array.isArray(a)
            ? a.map((item, index) => {
                return {
                  id: (index + 1).toString(),
                  choice: item,
                };
              })
            : null,
        },
      ];
    });
    setCurrentQuestion((prevQ) => prevQ - 1);
    console.info(questions, "Saved questions");
    if (currentQuestion === 1) {
      setStage(Stage.Rewards);
    }
  }, [currentQuestion, a, q, type]);

  return (
    <>
      <div className="form-control mb-5">
        <label className="label">
          <span className="label-text text-slate-700 font-medium">
            Question
          </span>
        </label>
        <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
          {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
          <input
            type="text"
            placeholder="Enter question"
            className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {/* <span>USD</span> */}
        </label>
      </div>
      <div className="flex items-start justify-between">
        <div className="flex items-center mb-4">
          <input
            id={QuestionType.MultiChoice.toString()}
            type="radio"
            value={QuestionType.MultiChoice.toString()}
            name="question-type"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={type === QuestionType.MultiChoice}
            onChange={handleTypeSelect}
          />
          <label
            htmlFor={QuestionType.MultiChoice.toString()}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Multi Choice
          </label>
        </div>
        <div className="flex items-center">
          <input
            id={QuestionType.SingleChoice.toString()}
            type="radio"
            value={QuestionType.SingleChoice.toString()}
            name="question-type"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={type === QuestionType.SingleChoice}
            onChange={handleTypeSelect}
          />
          <label
            htmlFor={QuestionType.SingleChoice.toString()}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Single Choice
          </label>
        </div>
        <div className="flex items-center">
          <input
            id={QuestionType.FreeForm.toString()}
            type="radio"
            value={QuestionType.FreeForm.toString()}
            name="question-type"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={type === QuestionType.FreeForm}
            onChange={handleTypeSelect}
          />
          <label
            htmlFor={QuestionType.FreeForm.toString()}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Free Form
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        {Array.isArray(a) && (
          <>
            {a.map((item, idx) => (
              <div className="form-control mb-5" key={idx.toString()}>
                <label className="label">
                  <span className="label-text text-slate-700 font-medium">
                    Answer {idx + 1}
                  </span>
                </label>
                <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                  {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
                </span> */}
                  <input
                    placeholder="Enter answer"
                    className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                    value={item}
                    onChange={(e) => setAnswer(e.target.value, idx)}
                  />
                  {/* <span>USD</span> */}
                </label>
              </div>
            ))}
            <button
              className="text-primary text-sm outline-none border-none text-left flex items-center justify-start"
              onClick={() =>
                setA((prevA) => {
                  if (Array.isArray(prevA)) {
                    return [...prevA, ""];
                  }
                })
              }
            >
              <FaPlus className="mr-2" /> Add another answer
            </button>
          </>
        )}
        {typeof a === null &&
          typeof a === "undefined" &&
          type === "free-form" && (
            <span className="label-text text-slate-700 font-medium text-center">
              The user can enter any length of text they want, no need to
              pre-fill answers
            </span>
          )}
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-white w-full mobile:p-3">
        <ButtonGhost
          type="normal"
          text="Previous"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={prevClick}
          isLoading={false}
          disabled={false}
        />
        <ButtonPrimary
          type="normal"
          text="Next"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={nextClick}
          isLoading={false}
          disabled={false}
        />
      </div>
    </>
  );
};

// Answer interfaces
export interface SurveyAnswersData {
  questionId: string;
  questionType: string;
  answer: { id: string; choice: string }[] | string | null;
}

export const SurveyAnswerEntry = ({ setStage, questions, surveyID }) => {
  console.log(questions, "Questions");
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswer] = useState<any[] | undefined>([]);

  // IPFS Context
  const {
    pushAnswersToIPFSForConnected,
    pushAnswersToIPFSForInbuilt,
    isPushingData,
  } = useIPFSContext();
  const { address, inBuiltAddress } = useWalletContext();

  // Toast
  const [toast, ToastRender] = useToast();

  useEffect(() => console.log(answers, "The item answers"), [answers]);

  const MultiChoiceRender = ({ setAnswer, data, answers, questionId }) => (
    <>
      {data.map((item: any, idx: number) => (
        <div className="flex items-center mb-4 last:mb-0" key={idx}>
          <input
            id={item?.id}
            type="checkbox"
            value={item?.choice}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={
              typeof answers.find((item) => item.questionId === questionId)
                ?.answer === "undefined"
                ? false
                : answers
                    .find((item) => item.questionId === questionId)
                    ?.answer.some((a) => a === item?.choice)
            }
            onChange={(e) => {
              setAnswer((prevAnswers) => {
                if (prevAnswers.length) {
                  const idx = prevAnswers.findIndex(
                    (i) => i?.questionId === questionId
                  );
                  console.log("Inside MultiChoice if", idx);
                  if (idx !== -1) {
                    prevAnswers[idx] = {
                      questionId,
                      questionType: QuestionType.MultiChoice.toString(),
                      answer: e.target.checked
                        ? [...prevAnswers[idx].answer, item?.choice].filter(
                            (v, i, a) => a.indexOf(v) === i
                          )
                        : prevAnswers[idx].answer.filter(
                            (f) => f !== item?.choice
                          ),
                    };

                    return [...prevAnswers];
                  }
                }

                return [
                  ...prevAnswers,
                  {
                    questionId,
                    questionType: QuestionType.MultiChoice.toString(),
                    answer: [e.target.value],
                  },
                ];
              });
            }}
          />
          <label
            htmlFor={item?.id}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {item?.choice}
          </label>
        </div>
      ))}
    </>
  );

  const SingleChoiceRender = ({ setAnswer, data, answers, questionId }) => (
    <>
      {data.map((item: any, idx: number) => (
        <div className="flex items-center mb-4 last:mb-0" key={idx}>
          <input
            id={item?.id}
            type="radio"
            value={item?.choice}
            name={questionId.toString()}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={
              typeof answers.find((item) => item.questionId === questionId)
                ?.answer === "undefined"
                ? false
                : answers
                    .find((item) => item.questionId === questionId)
                    ?.answer.some((a) => a === item?.choice)
            }
            onChange={(e) => {
              setAnswer((prevAnswers) => {
                if (prevAnswers.length) {
                  console.log("Inside SingleChoice if");
                  const idx = prevAnswers.findIndex(
                    (i) => i?.questionId === questionId
                  );
                  console.log("Inside MultiChoice if", idx, typeof idx);
                  if (idx != -1) {
                    prevAnswers[idx] = {
                      questionId,
                      questionType: QuestionType.SingleChoice.toString(),
                      answer: [e.target.value],
                    };

                    return [...prevAnswers];
                  }
                }

                return [
                  ...prevAnswers,
                  {
                    questionId,
                    questionType: QuestionType.SingleChoice.toString(),
                    answer: [e.target.value],
                  },
                ];
              });
            }}
          />
          <label
            htmlFor={item?.id}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {item?.choice}
          </label>
        </div>
      ))}
    </>
  );

  const FreeFormRender = ({ answers, setAnswer, questionId }) => (
    <div className="form-control mb-5">
      <label className="label">
        <span className="label-text text-slate-700 font-medium">
          Enter answer
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
          value={
            answers.find((item: any) => item?.questionId === questionId)?.answer
          }
          autoFocus
          onChange={(e) =>
            setAnswer((prevAnswers: any) => {
              if (prevAnswers.length) {
                const idx = prevAnswers.findIndex(
                  (idx) => idx.questionId === questionId
                );

                console.log("Inside MultiChoice if", idx, typeof idx);
                if (idx != -1) {
                  prevAnswers[idx] = {
                    questionId,
                    questionType: "free-form",
                    answer: e.target.value,
                  };

                  return [...prevAnswers];
                }
              }

              return [
                ...prevAnswers,
                {
                  questionId,
                  questionType: "free-form",
                  answer: e.target.value,
                },
              ];
            })
          }
        />
        {/* <span>USD</span> */}
      </label>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full flex-grow items-center justify-start">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <progress
            className="progress bg-blue-300 w-full mb-2"
            value={(currentQuestion / questions.length) * 100}
            max="100"
          ></progress>
          <span className="text-xs font-medium text-gray-500 mb-4">
            Questions {currentQuestion} of {questions.length}
          </span>
          {questions.map((item: any, idx: number) => (
            <>
              {currentQuestion === idx + 1 && (
                <>
                  <span className="text-md font-medium text-gray-800 mb-5">
                    {item.question}
                  </span>
                  {item?.questionType === QuestionType.FreeForm && (
                    <FreeFormRender
                      answers={answers}
                      setAnswer={setAnswer}
                      questionId={item.id}
                    />
                  )}
                  {item?.questionType === QuestionType.SingleChoice && (
                    <SingleChoiceRender
                      answers={answers}
                      setAnswer={setAnswer}
                      data={item.options}
                      questionId={item.id}
                    />
                  )}
                  {item?.questionType === QuestionType.MultiChoice && (
                    <MultiChoiceRender
                      answers={answers}
                      setAnswer={setAnswer}
                      data={item.options}
                      questionId={item.id}
                    />
                  )}
                </>
              )}
            </>
          ))}
        </OnboardCard>
      </div>
      <div className="flex items-center justify-center w-full space-x-4 bg-white mobile:p-3">
        {currentQuestion === 1 && currentQuestion < questions.length && (
          <ButtonPrimary
            type="normal"
            text="Next"
            icon={undefined}
            iconPosition={undefined}
            block={true}
            onClick={(e) => {
              console.log(e, "Next survey");
              setCurrentQuestion((current) => current + 1);
            }}
            disabled={false}
            isLoading={false}
          />
        )}
        {currentQuestion === questions.length && (
          <ButtonPrimary
            type="normal"
            text="Submit"
            icon={undefined}
            iconPosition={undefined}
            block={true}
            onClick={async (e) => {
              console.log(e, "Submit survey answer");
              //TODO: Submit survey answers then call finish stage
              if (address) {
                const result = await pushAnswersToIPFSForConnected(
                  answers,
                  surveyID
                );
                if (result)
                  toast.success({ text: "Answer submitted successfully!" });
                else
                  toast.error({
                    text: "There was an issue with submitting your answer, please try again",
                  });

                setStage(AnswerStage.Finish);
              } else {
                await pushAnswersToIPFSForInbuilt(answers, surveyID);
                setStage(AnswerStage.Finish);
              }

              console.log(answers, "The full answers");
            }}
            disabled={false}
            isLoading={false}
          />
        )}
        {currentQuestion > 1 && (
          <>
            <ButtonGhost
              type="normal"
              text="Previous"
              icon={undefined}
              iconPosition={undefined}
              block={true}
              onClick={(e) => {
                console.log(e, "Previous survey");
                if (currentQuestion >= 1) {
                  setCurrentQuestion((current) => current - 1);
                }
              }}
              disabled={false}
              isLoading={false}
            />
            <ButtonPrimary
              type="normal"
              text={currentQuestion >= questions.length ? "Submit" : "Next"}
              icon={undefined}
              iconPosition={undefined}
              block={true}
              onClick={async (e) => {
                console.log(e, "Next survey");
                if (currentQuestion < questions.length) {
                  setCurrentQuestion((current) => current + 1);
                } else {
                  //TODO: Submit survey answers then call finish stage
                  if (address) {
                    const result = await pushAnswersToIPFSForConnected(
                      answers,
                      surveyID
                    );
                    if (result)
                      toast.success({ text: "Answer submitted successfully!" });
                    else
                      toast.error({
                        text: "There was an issue with submitting your answer, please try again",
                      });

                    setStage(AnswerStage.Finish);
                  } else {
                    await pushAnswersToIPFSForInbuilt(answers, surveyID);
                    setStage(AnswerStage.Finish);
                  }

                  console.log(answers, "The full answers");
                }
              }}
              disabled={false}
              isLoading={isPushingData}
            />
          </>
        )}
      </div>
      <ToastRender />
    </div>
  );
};
