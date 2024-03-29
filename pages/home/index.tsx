import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaPlus } from "react-icons/fa";
import { useQueries, useQueryClient } from "react-query";
import { useToast } from "../../components/Alerts";
import { ButtonGhost, ButtonPrimary } from "../../components/Button";
// import { BalanceCarousel } from "../../components/Carousel";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import {
  AvailableSurveyCarousel,
  EmptySurveyList,
  MySurveyList,
} from "../../components/Survey";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";
import {
  getAllSurveys,
  getCompletedSurveys,
  getMySurveys,
} from "../../lib/queries";
import { WalletBalance } from "../wallet";

function Home() {
  const router = useRouter();
  const [{ token }] = useCookies(["token"]);

  const queryClient = useQueryClient();

  // Context
  const { address, inBuiltAddress, sonergyBalance } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();
  const [availableSurveyData, setAvailableSurveyData] = useState([]);
  const [mySurveyCount, setMySurveyCount] = useState(0);
  const [completedSurveyCount, setCompletedSurveyCount] = useState(0);
  const [validatedSurveyCount, setValidatedSurveyCount] = useState(0);

  // Setup use queries function
  const results = useQueries([
    {
      queryKey: ["getAllSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getAllSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ data, message, success }) {
        console.log(data, success, message, "Data from getAllSurveys queries");
        if (success && data.length) {
          const decodedMap = data
            .filter(
              (item) =>
                item.surveyURI !==
                "Qmd1KdBqjgke6FqpARZvWcoeWuWoAYpU3aNT5PgBVYFhDK"
            )
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyURI);
              // console.log("Gotten json", json);
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
          setAvailableSurveyData(awaitedDecode);
        }
      },
      onError(err) {
        console.error(err, "An error when fetching getAllSurveys");
      },
    },
    {
      queryKey: ["getMySurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getMySurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getMySurveys"
        // );

        if (success && data.length) {
          setMySurveyCount(data.length);
          console.log(data.length, "My survey Count");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    },
    {
      queryKey: ["getCompletedSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getCompletedSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getCompletedSurvey"
        // );

        if (success && data.length) {
          setCompletedSurveyCount(data?.length);
          console.log(data.length, "Completed Surveys Count");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    },
  ]);

  const [toast, ToastRender] = useToast();

  useEffect(() => {
    console.log(
      token,
      address,
      "User token set after login redirect and context wallet",
      mySurveyCount,
      "Decoded surveys"
    );
    queryClient.invalidateQueries("getMySurveys");
    queryClient.invalidateQueries("getAllSurveys");
    queryClient.invalidateQueries("getCompletedSurveys");
  }, [address, inBuiltAddress]);

  // Callback actions
  const mySurveyClicked = (sort: string) => {
    console.log(`My survey list clicked on, sort: ${sort}`);
    router.push(`/home/my-surveys?sort=${sort}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <WalletBalance />
      </div>
      {/* Available surveys section */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-3">
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 dark:text-gray-300 mb-3">
          Available surveys
        </span>
        {!!availableSurveyData.length ? (
          <AvailableSurveyCarousel data={availableSurveyData} />
        ) : (
          <EmptySurveyList />
        )}
      </div>

      {/* My Surveys section */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 dark:text-gray-300 mb-3">
          My surveys
        </span>
        <OnboardCard>
          <MySurveyList
            title={"Commissioned Surveys"}
            count={mySurveyCount}
            onClick={(e) => mySurveyClicked("commissioned")}
            icon={"/home/task-square.svg"}
          />
          <MySurveyList
            title={"Completed Surveys"}
            count={completedSurveyCount}
            onClick={(e) => mySurveyClicked("completed")}
            icon={"/home/tick-square.svg"}
          />
          <MySurveyList
            title={"Validated Surveys"}
            count={validatedSurveyCount}
            onClick={(e) => mySurveyClicked("validated")}
            icon={"/home/verify.svg"}
          />
        </OnboardCard>
      </div>

      {/* Survey actions */}
      <div className="w-full flex flex-col mobile:p-3 bg-white dark:bg-slate-900">
        <ButtonPrimary
          text="Create a survey"
          icon={<FaPlus color="white" size={12} />}
          iconPosition="left"
          type="normal"
          onClick={(e) => {
            console.log("Create survey clicked");
            router.push("/home/create-survey");
          }}
          block={true}
          disabled={false}
          isLoading={false}
        />
        <ButtonGhost
          text="Become a validator"
          icon={null}
          iconPosition={null}
          type="normal"
          onClick={(e) => {
            console.log("Become a validator clicked");
            toast.error({
              text: "Test",
            });
          }}
          block={true}
          isLoading={false}
          disabled={false}
        />
      </div>
      <ToastRender />
    </div>
  );
}

export default withLayout(Home);
