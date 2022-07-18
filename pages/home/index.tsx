import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaPlus } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { ButtonGhost, ButtonPrimary } from "../../components/Button";
// import { BalanceCarousel } from "../../components/Carousel";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { EmptySurveyList, MySurveyList } from "../../components/Survey";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { getMySurveys } from "../../lib/queries";
import { WalletBalance } from "../wallet";

function Home() {
  const router = useRouter();
  const [{ token }] = useCookies(["token"]);

  const queryClient = useQueryClient();

  // Context
  const { address, sonergyBalance } = useWalletContext();
  const [mySurveyData, setMySurveyData] = useState([]);
  const [availableSurveyData, setAvailableSurveyData] = useState([]);

  const { data, isLoading, error } = useQuery(
    ["getMySurveys", token, address],
    () => getMySurveys({ token, address }),
    {
      onSuccess({ success, message, data }) {
        console.info(
          data,
          success,
          message,
          "Data returned from the getMySurveys"
        );

        if (success) setMySurveyData(data);
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    }
  );

  useEffect(() => {
    console.log(
      token,
      address,
      "User token set after login redirect and context wallet"
    );
    queryClient.invalidateQueries("getMySurveys");
  }, [address]);

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
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-3">
          Available surveys
        </span>
        <EmptySurveyList />
      </div>

      {/* My Surveys section */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-3">
          My surveys
        </span>
        <OnboardCard>
          <MySurveyList
            title={"Commissioned Surveys"}
            count={!mySurveyData.length ? "0" : "3"}
            onClick={(e) => mySurveyClicked("commissioned")}
            icon={"/home/task-square.svg"}
          />
          <MySurveyList
            title={"Completed Surveys"}
            count={!mySurveyData.length ? "0" : "12"}
            onClick={(e) => mySurveyClicked("completed")}
            icon={"/home/tick-square.svg"}
          />
          <MySurveyList
            title={"Validated Surveys"}
            count={!mySurveyData.length ? "0" : "5"}
            onClick={(e) => mySurveyClicked("validated")}
            icon={"/home/verify.svg"}
          />
        </OnboardCard>
      </div>

      {/* Survey actions */}
      <div className="w-full flex flex-col mobile:p-3 bg-white">
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
          isLoading={false}
        />
        <ButtonGhost
          text="Become a validator"
          icon={null}
          iconPosition={null}
          type="normal"
          onClick={(e) => console.log("Become a validator clicked")}
          block={true}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default withLayout(Home);
