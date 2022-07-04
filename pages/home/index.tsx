import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { ButtonGhost, ButtonPrimary } from "../../components/Button";
import { BalanceCarousel } from "../../components/Carousel";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { AvailableSurveyCarousel, MySurveyList } from "../../components/Survey";

function Home() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <BalanceCarousel data={[]} />
      </div>
      {/* Available surveys section */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-3">
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-3">
          Available surveys
        </span>
        <AvailableSurveyCarousel />
      </div>

      {/* My Surveys section */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-3">
          My surveys
        </span>
        <OnboardCard>
          <MySurveyList
            title={"Commissioned Surveys"}
            count={"3"}
            onClick={(e) => {
              console.log("Commissioned Surveys Survey clicked", e);
              router.push("/home/my-surveys");
            }}
          />
          <MySurveyList
            title={"Completed Surveys"}
            count={"12"}
            onClick={(e) => console.log("Completed Surveys Survey clicked", e)}
          />
          <MySurveyList
            title={"Validated Surveys"}
            count={"5"}
            onClick={(e) => console.log("Validated Surveys Survey clicked", e)}
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
