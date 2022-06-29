import { useRouter } from "next/router";
import { AiFillLeftCircle } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import withLayout from "../../../components/Layout";
import OnboardCard from "../../../components/OnboardCard";


function TrxDetail() {
  const router = useRouter();
  const { query: { trx_id } } = router;
  console.info(trx_id, "Transaction ID");

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <div className="flex items-center justify-start space-x-1 mb-3" onClick={e => router.back()}>
          <AiFillLeftCircle />
          <span className="text-sm font-medium text-gray-800">Transaction details</span>
        </div>
        <OnboardCard>
          <span className="text-xs text-center text-slate-800 font-light mb-2">Amount</span>
          <p className="flex items-center justify-center mb-2"><b className="text-md text-slate-800 font-medium">200.<small className="text-xs">00 <span className="text-2xs font-light ml-1">SNEGY</span></small></b></p>
          <div className="badge bg-green-600 text-white font-light border-none mt-0 mb-5 mx-auto">Completed</div>
          <div className="w-full flex flex-col border-dashed border-slate-400 border-[1px] bg-slate-100 rounded-lg p-4">
            <span className="text-xs text-gray-500 mb-1">Transaction type</span>
            <span className="text-xs font-medium text-gray-800 mb-3">Survey rewards</span>
            <span className="text-xs text-gray-500 mb-1">Received from</span>
            <span className="text-xs font-medium text-gray-800 mb-3">0x783a...6bd28a45254650</span>
            <span className="text-xs text-gray-500 mb-1">Transaction ID</span>
            <span className="text-xs font-medium text-gray-800 mb-3 flex items-center justify-between">783a...6bd28a45bd28a4254650 <FaCopy color="#8895A7" /> </span>
            <span className="text-xs text-gray-500 mb-1">Date</span>
            <span className="text-xs font-medium text-gray-800 mb-3">July 24, 2022 11:35 AM</span>
            <span className="text-xs text-gray-500 mb-1">Fee</span>
            <span className="text-xs font-light text-gray-800 mb-3"><b className="font-semibold">0.10</b> (SNEGY) </span>
          </div>
        </OnboardCard>
      </div>
    </div>
  );
}

export default withLayout(TrxDetail);