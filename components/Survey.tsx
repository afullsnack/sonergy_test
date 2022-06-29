import { useRouter } from "next/router";
import { AiFillClockCircle, AiFillDollarCircle, AiOutlineArrowRight, AiOutlineRight, AiOutlineSchedule } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { ButtonGhost } from "./Button";
import OnboardCard from "./OnboardCard";


export const MySurveyList = ({ title, count, onClick }) => {

  return (
    <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={onClick}>
      <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
        <FaCheck size={18} />
      </div>
      <div className="flex items-center justify-between space-x-16">
        <div>
          <div className="text-sm font-light text-gray-600">{title}</div>
          <p className="text-[16px] text-gray-700 font-medium">{count}</p>
        </div>
        <AiOutlineRight color="black" />
      </div>
    </div>
  );
}

export const AvailableSurveyCarousel = () => {
  const router = useRouter();

  return (
    <div className="w-full carousel max-w-sm space-x-4 bg-transparent">
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">Blockchain development and utilisation in sub-saharan Africa.</span>
            <p className="flex items-center justify-center"> <AiFillDollarCircle size={14} /> <b className="text-gray-700 text-xs mr-1 ml-1">200</b><span className="text-xs">SNEGY</span> </p>
            <p className="flex items-center justify-center"> <AiFillClockCircle size={14} /><span className="text-xs text-gray-500 ml-1">Expires in 2 days 11 hours</span> </p>
          </div>
          <ButtonGhost text="Take survey" type="normal" icon={<AiOutlineArrowRight />} iconPosition="right" block={true} onClick={e => {
            console.log('Take survey clicked', e);
            router.push('/home/take-survey');
          }} />
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">Blockchain development and utilisation in sub-saharan Africa.</span>
            <p className="flex items-center justify-center"> <AiFillDollarCircle size={14} /> <b className="text-gray-700 text-xs mr-1 ml-1">200</b><span className="text-xs">SNEGY</span> </p>
            <p className="flex items-center justify-center"> <AiFillClockCircle size={14} /><span className="text-xs text-gray-500 ml-1">Expires in 2 days 11 hours</span> </p>
          </div>
          <ButtonGhost text="Take survey" type="normal" icon={<AiOutlineArrowRight />} iconPosition="right" block={true} onClick={e => console.log('Take survey clicked', e)} />
        </OnboardCard>
      </div>
      <div className="carousel-item max-w-xs">
        <OnboardCard>
          <div className="flex flex-col items-start justify-between mb-3">
            <span className="text-gray-700 text-sm font-normal text-left mb-2">Blockchain development and utilisation in sub-saharan Africa.</span>
            <p className="flex items-center justify-center"> <AiFillDollarCircle size={14} /> <b className="text-gray-700 text-xs mr-1 ml-1">200</b><span className="text-xs">SNEGY</span> </p>
            <p className="flex items-center justify-center"> <AiFillClockCircle size={14} /><span className="text-xs text-gray-500 ml-1">Expires in 2 days 11 hours</span> </p>
          </div>
          <ButtonGhost text="Take survey" type="normal" icon={<AiOutlineArrowRight />} iconPosition="right" block={true} onClick={e => console.log('Take survey clicked', e)} />
        </OnboardCard>
      </div>
      
    </div>
  );
}

export const EmptySurveyList = () => {
  return (
    <OnboardCard>
      <div className="w-full flex flex-col items-center justify-around">
        <div className="p-4 rounded-full bg-slate-100 mb-2">
          <AiOutlineSchedule size={36} />
        </div>
        <h2 className="text-gray-700 text-sm desktop:text-md font-semibold mb-1">No surveys at this time</h2>
        <span className="text-gray-500 text-xs text-center">There are currently no surveys, we’ll notify you when a new survey is available.</span>
      </div>
    </OnboardCard>
  );
}