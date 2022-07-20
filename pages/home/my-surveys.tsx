import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillClockCircle } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { useQueries, useQueryClient } from "react-query";
import {
  ButtonGhost,
  ButtonIcon,
  ButtonPrimary,
} from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { getCompletedSurveys, getMySurveys } from "../../lib/queries";

enum SurveySort {
  Commissioned = "commissioned",
  Completed = "completed",
  Validated = "validated",
}

function MySurveys() {
  const { query } = useRouter();
  const [{ token }] = useCookies(["token"]);

  const queryClient = useQueryClient();

  // Context
  const { address, sonergyBalance } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();

  const [sort, setSort] = useState(
    query.sort ? query.sort : SurveySort.Commissioned
  );
  const [commissioned, setCommissioned] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [validated, setValidated] = useState([]);

  // Setup use queries function
  const results = useQueries([
    // {
    //   queryKey: ["getValidatedSurveys", token],
    //   queryFn: () => getAllSurveys(token),
    //   async onSuccess({ data, message, success }) {
    //     console.log(data, success, message, "Data from getAllSurveys queries");
    //     if (success && data.length) {
    //       const decodedMap = data.map(async (item: any) => {
    //         console.log("Item", item.surveyURI);
    //         const json = await pullData(item?.surveyURI);
    //         console.log("Gotten json", json);
    //         return {
    //           ...json,
    //           uri: item.surveyURI,
    //           amount: item.amount,
    //           symbol: sonergyBalance.symbol,
    //           valCount: item?.numOfValidators,
    //           responseCount: item?.numOfcommisioners,
    //           surveyId: item?.surveyID,
    //         };
    //       });

    //       const awaitedDecode = await Promise.all(decodedMap);
    //       setValidated(awaitedDecode);
    //     }
    //   },
    //   onError(err) {
    //     console.error(err, "An error when fetching getAllSurveys");
    //   },
    // },
    {
      queryKey: ["getMySurveys", token, address],
      queryFn: () => getMySurveys({ token, address }),
      async onSuccess({ success, message, data }) {
        console.info(
          data,
          success,
          message,
          "Data returned from the getMySurveys"
        );

        if (success && data.length) {
          const decodedMap = data.map(async (item: any) => {
            console.log("Item", item.surveyURI);
            const json = await pullData(item?.surveyURI);
            console.log("Gotten json", json);
            return {
              ...json,
              uri: item.surveyURI,
              amount: item.amount,
              symbol: sonergyBalance.symbol,
              valCount: item?.numOfValidators,
              responseCount: item?.numOfcommisioners,
              surveyId: item?.surveyID,
            };
          });

          const awaitedDecode = await Promise.all(decodedMap);
          setCommissioned(awaitedDecode);
          console.log(awaitedDecode, "My survey: Commissioned");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    },
    {
      queryKey: ["getCompletedSurveys", token, address],
      queryFn: () => getCompletedSurveys({ token, address }),
      async onSuccess({ success, message, data }) {
        console.info(
          data,
          success,
          message,
          "Data returned from the getCompletedSurvey"
        );

        if (success && data.length) {
          const decodedMap = data.map(async (item: any) => {
            console.log("Item", item.surveyURI);
            const json = await pullData(item?.surveyURI);
            console.log("Gotten json", json);
            return {
              ...json,
              uri: item.surveyURI,
              amount: item.amount,
              symbol: sonergyBalance.symbol,
              valCount: item?.numOfValidators,
              responseCount: item?.numOfcommisioners,
              surveyId: item?.surveyID,
            };
          });

          const awaitedDecode = await Promise.all(decodedMap);

          setCompleted(awaitedDecode);
          console.log(awaitedDecode, "Completed Surveys: Completed survey");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    },
  ]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        token,
        address,
        "User token set after login redirect and context wallet",
        completed,
        ".....",
        commissioned,
        "....",
        "Decoded surveys",
        results,
        "Result queries"
      );
    }
    queryClient.invalidateQueries("getMySurveys");
    queryClient.invalidateQueries("getValidatedSurveys");
    queryClient.invalidateQueries("getCompletedSurveys");
  }, [address, sort]);

  return (
    <div className="w-full">
      {/* Sort actions */}
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-10">
        <div className="flex items-center justify-center w-[100%] mb-2">
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "commissioned"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort(SurveySort.Commissioned)}
          >
            Commissioned
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "completed"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort(SurveySort.Completed)}
          >
            Completed
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "validated"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort(SurveySort.Validated)}
          >
            Validated
          </button>
        </div>
        <select className="select select-bordered w-full bg-gray-200 text-slate-700">
          <option disabled selected>
            Filter
          </option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* My surveys list */}
      {sort === SurveySort.Commissioned.toString() && !!commissioned.length && (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-orange-200 text-orange-700 text-xs border-none mb-3">
                  Pending completion
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-[3]">
                  <ButtonGhost
                    text="Convert to NFT"
                    type="normal"
                    icon={null}
                    iconPosition={null}
                    block={true}
                    onClick={(e) => console.log("Convert to NFT", e)}
                    isLoading={false}
                  />
                </div>
                <div className="flex-1">
                  <ButtonIcon
                    type="normal"
                    icon={<FaFileDownload size={18} />}
                    block={true}
                    onClick={(e) => console.log("Download", e)}
                  />
                </div>
              </div>
            </div>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                  Completed
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              {/* <div className="flex items-center justify-between space-x-4">
              <div className="flex-[3]">
                <ButtonGhost text="Convert to NFT" type="normal" icon={null} iconPosition={null} block={true} onClick={e => console.log('Convert to NFT', e)} />
              </div>
              <div className="flex-1">
                <ButtonIcon type="normal" icon={<FaFileDownload size={18} />} block={true} onClick={e => console.log('Download', e)} />
              </div>
            </div> */}
            </div>
          </OnboardCard>
          {/* Analyze action buttn */}
          <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3 mt-6">
            <ButtonPrimary
              type="normal"
              text="Analyze survey"
              icon={undefined}
              iconPosition={undefined}
              block={true}
              onClick={(e) => console.log(e, "Analyze survey")}
              isLoading={false}
            />
          </div>
        </div>
      )}
      {/* {sort === SurveySort.Commissioned && !!commissioned.length && (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <span className="text-slate-800 text-2xl font-normal">
              You have no commissioned any surveys yet surveys
            </span>
          </OnboardCard>
        </div>
      )} */}
      {/* COMPLETED list */}
      {sort === SurveySort.Completed.toString() && !!commissioned.length ? (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-orange-200 text-orange-700 text-xs border-none mb-3">
                  Pending completion
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-[3]">
                  <ButtonGhost
                    text="Convert to NFT"
                    type="normal"
                    icon={null}
                    iconPosition={null}
                    block={true}
                    onClick={(e) => console.log("Convert to NFT", e)}
                    isLoading={false}
                  />
                </div>
                <div className="flex-1">
                  <ButtonIcon
                    type="normal"
                    icon={<FaFileDownload size={18} />}
                    block={true}
                    onClick={(e) => console.log("Download", e)}
                  />
                </div>
              </div>
            </div>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                  Completed
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              {/* <div className="flex items-center justify-between space-x-4">
            <div className="flex-[3]">
              <ButtonGhost text="Convert to NFT" type="normal" icon={null} iconPosition={null} block={true} onClick={e => console.log('Convert to NFT', e)} />
            </div>
            <div className="flex-1">
              <ButtonIcon type="normal" icon={<FaFileDownload size={18} />} block={true} onClick={e => console.log('Download', e)} />
            </div>
          </div> */}
            </div>
          </OnboardCard>
          {/* Analyze action buttn */}
          <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3 mt-6">
            <ButtonPrimary
              type="normal"
              text="Analyze survey"
              icon={undefined}
              iconPosition={undefined}
              block={true}
              onClick={(e) => console.log(e, "Analyze survey")}
              isLoading={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <span className="text-slate-800 text-2xl font-normal">
              You have not completed any surveys yet surveys
            </span>
          </OnboardCard>
        </div>
      )}
      {/* My surveys list */}
      {sort === SurveySort.Validated.toString() && !!commissioned.length ? (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-orange-200 text-orange-700 text-xs border-none mb-3">
                  Pending completion
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-[3]">
                  <ButtonGhost
                    text="Convert to NFT"
                    type="normal"
                    icon={null}
                    iconPosition={null}
                    block={true}
                    onClick={(e) => console.log("Convert to NFT", e)}
                    isLoading={false}
                  />
                </div>
                <div className="flex-1">
                  <ButtonIcon
                    type="normal"
                    icon={<FaFileDownload size={18} />}
                    block={true}
                    onClick={(e) => console.log("Download", e)}
                  />
                </div>
              </div>
            </div>
            <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
              <div className="flex flex-col items-start justify-between mb-3">
                <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                  Completed
                </div>
                <span className="text-gray-700 text-sm font-normal text-left mb-2">
                  Blockchain development and utilisation in sub-saharan Africa.
                </span>
                <p className="flex items-center justify-center">
                  <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
                </p>
                <p className="flex items-center justify-center">
                  {" "}
                  <AiFillClockCircle size={14} />
                  <span className="text-xs text-gray-500 ml-1">
                    Expires in 2 days 11 hours
                  </span>{" "}
                </p>
              </div>
              {/* <div className="flex items-center justify-between space-x-4">
            <div className="flex-[3]">
              <ButtonGhost text="Convert to NFT" type="normal" icon={null} iconPosition={null} block={true} onClick={e => console.log('Convert to NFT', e)} />
            </div>
            <div className="flex-1">
              <ButtonIcon type="normal" icon={<FaFileDownload size={18} />} block={true} onClick={e => console.log('Download', e)} />
            </div>
          </div> */}
            </div>
          </OnboardCard>
          {/* Analyze action buttn */}
          <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3 mt-6">
            <ButtonPrimary
              type="normal"
              text="Analyze survey"
              icon={undefined}
              iconPosition={undefined}
              block={true}
              onClick={(e) => console.log(e, "Analyze survey")}
              isLoading={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
          <OnboardCard>
            <span className="text-slate-800 text-2xl font-normal">
              You have nOT validated any surveys yet surveys
            </span>
          </OnboardCard>
        </div>
      )}
    </div>
  );
}

export default withLayout(MySurveys);
