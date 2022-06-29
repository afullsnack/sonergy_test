import { AiOutlineLink } from "react-icons/ai";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Buy() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'DEX clicked')}>
            {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
              <FaCheck size={18} />
            </div> */}
            <div className="flex items-center justify-between space-x-2">
              <div>
                <div className="text-[16px] font-semibold text-gray-700">DEX</div>
                <p className="text-sm text-gray-600 font-normal">Swap sonergy token on decentralized exchanges.</p>
              </div>
              {/* <AiOutlineRight color="black" /> */}
            </div>
          </div>
          <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'CEX clicked')}>
            {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
              <FaCheck size={18} />
            </div> */}
            <div className="flex items-center justify-between space-x-2">
              <div>
                <div className="text-[16px] font-semibold text-gray-700">CEX</div>
                <p className="text-sm text-gray-600 font-normal">Buy, trade sonergy token on centralized exchanges.</p>
              </div>
              {/* <AiOutlineRight color="black" /> */}
            </div>
          </div>
          <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'P2P clicked')}>
            {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
              <FaCheck size={18} />
            </div> */}
            <div className="flex items-center justify-between space-x-2">
              <div>
                <div className="text-[16px] font-semibold text-gray-700">P2P</div>
                <p className="text-sm text-gray-600 font-normal">Buy, trade sonergy token with verified merchants on sonergy.io</p>
              </div>
              {/* <AiOutlineRight color="black" /> */}
            </div>
          </div>
          <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'Card clicked')}>
            {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
              <FaCheck size={18} />
            </div> */}
            <div className="flex items-center justify-between space-x-2">
              <div>
                <div className="text-[16px] font-semibold text-gray-700">Card</div>
                <p className="text-sm text-gray-600 font-normal">Buy Sonergy tokens directly from your debit or credit cards</p>
              </div>
              {/* <AiOutlineRight color="black" /> */}
            </div>
          </div>
        </OnboardCard>
      </div>
    </div>
  );
}

const CEXList = () => (
  <OnboardCard>
    <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'DEX clicked')}>
      {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
        <FaCheck size={18} />
      </div> */}
      <div className="flex items-center justify-between space-x-2">
        <div className="border-[#E2EDF6] border-[0.5px] px-4 py-2 rounded-md">
          <img src="/cex/binance.png" width={50} alt="Binance CEX" />
          {/* <p className="text-sm text-gray-600 font-normal">Swap sonergy token on decentralized exchanges.</p> */}
        </div>
          <div className="text-[16px] font-semibold text-gray-700">Binance</div>
        <AiOutlineLink color="blue" />
      </div>
    </div>
    <div className="w-full p-3 mx-auto bg-white rounded-lg flex items-center space-x-4 border-[#E2EDF6] border-[0.5px] mb-3" onClick={e => console.log(e, 'DEX clicked')}>
      {/* <div className="shrink-0 rounded-2xl border-solid border-primary border-[.9px] p-3">
        <FaCheck size={18} />
      </div> */}
      <div className="flex items-center justify-between space-x-2">
        <div className="border-[#E2EDF6] border-[0.5px] px-4 py-2 rounded-md">
          <img src="/cex/coinbase.png" width={50} alt="Coinbase CEX" />
          {/* <p className="text-sm text-gray-600 font-normal">Swap sonergy token on decentralized exchanges.</p> */}
        </div>
          <div className="text-[16px] font-semibold text-gray-700">Coinbase</div>
        <AiOutlineLink color="blue" />
      </div>
    </div>
  </OnboardCard>
)


export default withLayout(Buy);