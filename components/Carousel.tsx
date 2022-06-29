import { FaEye } from "react-icons/fa"


export const BalanceCarousel = ({ data }) => {

  return (
    <div className="w-full carousel rounded-xl">
      <div id="item1" className="carousel-item w-full flex flex-col items-center justify-around bg-gray-800 py-6 relative">
        <div className="flex items-center justify-center mb-3">
          <span className="text-xs font-light text-center text-white mr-2">Total Earnings</span>
          <FaEye color="white" /> 
        </div>
        <p className="mb-2"><b className="text-lg text-white font-semibold">25,000.<small className="text-xs font-medium">00</small></b> <span className="text-sm text-white font-light">SNEGY</span></p>
        <span className="text-xs text-white font-light mb-2">$42,356.40</span>
        <div className="flex absolute bottom-2 right-0 left-0 z-10 justify-center w-full py-2 gap-2">
          <a href="#item1" className="w-1 h-1 rounded-full bg-gray-100"></a> 
          <a href="#item2" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item3" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item4" className="w-1 h-1 rounded-full bg-gray-400"></a>
        </div>
      </div>
      <div id="item2" className="carousel-item w-full flex flex-col items-center justify-around bg-gray-800 py-6 relative">
        <div className="flex items-center justify-center mb-3">
          <span className="text-xs font-light text-center text-white mr-2">Survey Rewards</span>
          <FaEye color="white" /> 
        </div>
        <p className="mb-2"><b className="text-lg text-white font-semibold">25,000.<small className="text-xs font-medium">00</small></b> <span className="text-sm text-white font-light">SNEGY</span></p>
        <span className="text-xs text-white font-light mb-2">$42,356.40</span>
        <div className="flex absolute bottom-2 right-0 left-0 z-10 justify-center w-full py-2 gap-2">
          <a href="#item1" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item2" className="w-1 h-1 rounded-full bg-gray-100"></a> 
          <a href="#item3" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item4" className="w-1 h-1 rounded-full bg-gray-400"></a>
        </div>
      </div>
      <div id="item3" className="carousel-item w-full flex flex-col items-center justify-around bg-gray-800 py-6 relative">
        <div className="flex items-center justify-center mb-3">
          <span className="text-xs font-light text-center text-white mr-2">Validation Rewards</span>
          <FaEye color="white" /> 
        </div>
        <p className="mb-2"><b className="text-lg text-white font-semibold">25,000.<small className="text-xs font-medium">00</small></b> <span className="text-sm text-white font-light">SNEGY</span></p>
        <span className="text-xs text-white font-light mb-2">$42,356.40</span>
        <div className="flex absolute bottom-2 right-0 left-0 z-10 justify-center w-full py-2 gap-2">
          <a href="#item1" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item2" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item3" className="w-1 h-1 rounded-full bg-gray-100"></a> 
          <a href="#item4" className="w-1 h-1 rounded-full bg-gray-400"></a>
        </div>
      </div>
      <div id="item4" className="carousel-item w-full flex flex-col items-center justify-around bg-gray-800 py-6 relative">
        <div className="flex items-center justify-center mb-3">
          <span className="text-xs font-light text-center text-white mr-2">Commissions</span>
          <FaEye color="white" /> 
        </div>
        <p className="mb-2"><b className="text-lg text-white font-semibold">25,000.<small className="text-xs font-medium">00</small></b> <span className="text-sm text-white font-light">SNEGY</span></p>
        <span className="text-xs text-white font-light mb-2">$42,356.40</span>
        <div className="flex absolute bottom-2 right-0 left-0 z-10 justify-center w-full py-2 gap-2">
          <a href="#item1" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item2" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item3" className="w-1 h-1 rounded-full bg-gray-400"></a> 
          <a href="#item4" className="w-1 h-1 rounded-full bg-gray-100"></a>
        </div>
      </div>
    </div>
  )
}