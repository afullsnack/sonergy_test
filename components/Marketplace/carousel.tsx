import { useRouter } from "next/router";
import {
  AiFillClockCircle,
  AiFillDollarCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { ButtonGhost } from "../Button";
import OnboardCard from "../OnboardCard";

export const MostPopularSlider = () => {
  const router = useRouter();

  return (
    <div className="w-full carousel max-w-sm desktop:max-w-screen-desktop space-x-4 bg-transparent">
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">
              Blockchain development and utilisation in sub-saharan Africa.
            </span>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillDollarCircle size={14} />{" "}
              <b className="text-gray-700 text-xs mr-1 ml-1">200</b>
              <span className="text-xs">SNEGY</span>{" "}
            </p>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillClockCircle size={14} />
              <span className="text-xs text-gray-500 ml-1">
                Expires in 2 days 11 hours
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
              router.push("/home/take-survey");
            }}
            isLoading={false}
          />
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">
              Blockchain development and utilization in sub-saharan Africa.
            </span>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillDollarCircle size={14} />{" "}
              <b className="text-gray-700 text-xs mr-1 ml-1">200</b>
              <span className="text-xs">SNEGY</span>{" "}
            </p>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillClockCircle size={14} />
              <span className="text-xs text-gray-500 ml-1">
                Expires in 2 days 11 hours
              </span>{" "}
            </p>
          </div>
          <ButtonGhost
            text="Take survey"
            type="normal"
            icon={<AiOutlineArrowRight />}
            iconPosition="right"
            block={true}
            onClick={(e) => console.log("Take survey clicked", e)}
            isLoading={false}
          />
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">
              Blockchain development and utilisation in sub-saharan Africa.
            </span>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillDollarCircle size={14} />{" "}
              <b className="text-gray-700 text-xs mr-1 ml-1">200</b>
              <span className="text-xs">SNEGY</span>{" "}
            </p>
            <p className="flex items-center justify-center">
              {" "}
              <AiFillClockCircle size={14} />
              <span className="text-xs text-gray-500 ml-1">
                Expires in 2 days 11 hours
              </span>{" "}
            </p>
          </div>
          <ButtonGhost
            text="Take survey"
            type="normal"
            icon={<AiOutlineArrowRight />}
            iconPosition="right"
            block={true}
            onClick={(e) => console.log("Take survey clicked", e)}
            isLoading={false}
          />
        </OnboardCard>
      </div>
    </div>
  );
};
