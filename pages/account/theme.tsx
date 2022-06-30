import { useRouter } from "next/router";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Theme() {

  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
        <OnboardCard>
          <MenuItem title="Light mode" subText="Set theme to light mode" extra={null} icon={<img src="/settings/light_mode_icon.svg" alt="Light mode icon" />} onClick={(e) => {
            console.log(e, 'Set light mode icon clicked');
          }} />
          <div className="divider my-2"></div> 
          <MenuItem title="Dark mode" subText="Set theme to dark mode" extra={null} icon={<img src="/settings/dark_mode_icon.svg" alt="Dark mode icon" />} onClick={e => {
            console.log(e, 'verification status clicked');
          }} />
          <div className="divider my-2"></div> 
          <MenuItem title="Sunset / Sunrise" subText="Auto switch by time of the day" extra={null} icon={<img src="/settings/theme_icon.svg" alt="Auto switch" />} onClick={e => console.log(e, 'Auto switch clicked')} />
        </OnboardCard>
      </div>
    </div>
  );
}


const MenuItem = ({ onClick, title, subText, icon, extra }) => {

  return (
    <div className="w-full mx-auto bg-white rounded-lg flex items-center space-x-4 hover:cursor-pointer" onClick={onClick}>
      <div className="shrink-0 rounded-xl border-solid bg-gray-100 p-3">
        {icon}
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-[16px] font-medium text-gray-700 mb-2">{title}</div>
          <p className="text-sm text-gray-600 font-[400]">{subText}</p>
        </div>
        {extra}
        {/* <AiOutlineRight size={16} color="black" /> */}
        <input type="radio" name="theme" className="radio checked:bg-primary" />
        {/* <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <span className="label-text text-slate-800">Multiple choice</span> 
          </label>
        </div> */}
      </div>
    </div>
  );
}

export default withLayout(Theme);