import { FaCopy } from "react-icons/fa";
import { ButtonGhost } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Deposit() {


  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <span className="text-lg text-center text-slate-800 font-light mb-2">Deposit SNEGY</span>
          <div className="flex items-center justify-center mb-4">
            <img src="/qr_code_img.svg" alt="Deposit QR code" width={200} />
          </div>
          {/* <div className="badge bg-green-600 text-white font-light border-none mt-0 mb-5 mx-auto">Completed</div> */}
          <div className="w-full flex flex-col p-4">
            <span className="text-[16px] text-gray-600 mb-1">Network</span>
            <span className="text-[16px] font-medium text-gray-800 mb-3">Ethereum (ERC20)</span>
            <span className="text-sm text-gray-600 mb-1">Sonergy Address</span>
            <span className="text-[16px] font-medium text-gray-800 mb-3 flex items-center justify-between"><span className="truncate">0x078395eec8b3b15888b70cf64db2fadc12b6d860</span> <FaCopy color="#8895A7" /></span>
            <span className="text-xs text-gray-500 mb-1">Should arrive after 15 network confirmations</span>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-transparent w-full mobile:p-3">
        <ButtonGhost type="normal" text="Save as image" icon={undefined} iconPosition={undefined} block={true} onClick={e => console.log(e, "save qr code info as image")} />
      </div>
    </div>
  );
}

export default withLayout(Deposit);