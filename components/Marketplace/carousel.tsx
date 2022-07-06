import { useRouter } from "next/router";
import { AiFillClockCircle } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { ButtonPrimary } from "../Button";
import OnboardCard from "../OnboardCard";

export const MostPopularSlider = () => {
  const router = useRouter();

  return (
    <div className="w-full carousel max-w-sm desktop:max-w-screen-desktop space-x-4 bg-transparent">
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div
            className="w-full flex flex-col items-start justify-between mb-2"
            onClick={(e) => {
              console.log(e, "Clicked on te survey");
              router.push("/market/s/123?action=bid");
            }}
          >
            <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
              Username <GoVerified color="#0059AC" className="ml-2" />
            </span>
            <span className="text-gray-700 text-sm font-normal text-left">
              Blockchain development and utilization in sub-saharan Africa.
            </span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col flex-[3] items-start justify-center">
              <p className="flex items-center justify-center text-gray-700 font-medium text-[16px] mb-1">
                500 SNEGY
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  2 days 11 hours
                </span>{" "}
              </p>
            </div>
            <div className="flex">
              <ButtonPrimary
                text="Buy now"
                type="normal"
                icon={null}
                iconPosition={null}
                block={true}
                onClick={(e) => {
                  console.log("Buy now clicked", e);
                  router.push("/market/s/123?action=buy");
                }}
                isLoading={false}
              />
            </div>
          </div>
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-2">
            <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
              Username <GoVerified color="#0059AC" className="ml-2" />
            </span>
            <span className="text-gray-700 text-sm font-normal text-left">
              Blockchain development and utilization in sub-saharan Africa.
            </span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col flex-[3] items-start justify-center">
              <p className="flex items-center justify-center text-gray-700 font-medium text-[16px] mb-1">
                500 SNEGY
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  2 days 11 hours
                </span>{" "}
              </p>
            </div>
            <div className="flex">
              <ButtonPrimary
                text="Buy now"
                type="normal"
                icon={null}
                iconPosition={null}
                block={true}
                onClick={(e) => {
                  console.log("Buy now clicked", e);
                  // router.push("/home/take-survey");
                }}
                isLoading={false}
              />
            </div>
          </div>
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-2">
            <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
              Username <GoVerified color="#0059AC" className="ml-2" />
            </span>
            <span className="text-gray-700 text-sm font-normal text-left">
              Blockchain development and utilization in sub-saharan Africa.
            </span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col flex-[3] items-start justify-center">
              <p className="flex items-center justify-center text-gray-700 font-medium text-[16px] mb-1">
                500 SNEGY
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  2 days 11 hours
                </span>{" "}
              </p>
            </div>
            <div className="flex">
              <ButtonPrimary
                text="Buy now"
                type="normal"
                icon={null}
                iconPosition={null}
                block={true}
                onClick={(e) => {
                  console.log("Buy now clicked", e);
                  // router.push("/home/take-survey");
                }}
                isLoading={false}
              />
            </div>
          </div>
        </OnboardCard>
      </div>
    </div>
  );
};
