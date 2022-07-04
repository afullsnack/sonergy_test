import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { ButtonGhost } from "../../../components/Button";
import withLayout from "../../../components/Layout";
import OnboardCard from "../../../components/OnboardCard";

function TransactionMoreList() {
  const router = useRouter();
  const {
    query: { sort },
  } = router;
  console.info(sort, "Transaction List sort");

  return (
    <div className="w-full">
      {/* Sort actions */}
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-2">
        <select className="select select-bordered w-full bg-gray-200 text-slate-700">
          <option disabled selected>
            <FaSort /> All transactions
          </option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* List */}
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-4">
        <TransactionsList router={router} data={[]} />
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-transparent w-full mobile:p-3">
        <ButtonGhost
          type="normal"
          text="Load more"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Lord more transactions")}
          isLoading={false}
        />
      </div>
    </div>
  );
}

const TransactionsList = ({ router, data }) => {
  const TransactionIn = ({ title, subText, amount, onClick }) => (
    <div
      className="w-full mx-auto bg-white rounded-lg flex items-center space-x-4 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 rounded-xl border-solid bg-green-50 p-3">
        <IoArrowDown
          size={18}
          className="rotate-45"
          color="rgba(0, 190, 112, 1)"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-sm font-medium text-gray-700">{title}</div>
          <p className="text-xs text-gray-400 font-light">{subText}</p>
        </div>
        <span className="text-[14px] text-gray-700 font-medium mr-2">
          {" "}
          +{amount}{" "}
        </span>
        <AiOutlineRight size={16} color="black" />
      </div>
    </div>
  );

  const TransactionOut = ({ title, subText, amount, onClick }) => (
    <div
      className="w-full mx-auto bg-white rounded-lg flex items-center space-x-4 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 rounded-xl bg-red-50 p-3">
        <IoArrowUp
          size={18}
          className="rotate-45"
          color="rgba(238, 29, 35, 1)"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-sm font-medium text-gray-700">{title}</div>
          <p className="text-xs text-gray-400 font-light">{subText}</p>
        </div>
        <span className="text-[14px] text-gray-700 font-medium mr-2">
          {" "}
          -{amount}{" "}
        </span>
        <AiOutlineRight size={16} color="black" />
      </div>
    </div>
  );

  return (
    <OnboardCard>
      <TransactionIn
        title="Survey rewards"
        subText="July 24, 2022 11:35 AM"
        amount="488.00"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-121343");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionOut
        title="Withdraw"
        subText="July 24, 2022 11:35 AM"
        amount="67.49"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-123142");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionIn
        title="Staking redeemed"
        subText="July 24, 2022 11:35 AM"
        amount="488.00"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-121343");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionIn
        title="NFT sale"
        subText="July 24, 2022 11:35 AM"
        amount="488.00"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-121343");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionOut
        title="Survey fees"
        subText="July 24, 2022 11:35 AM"
        amount="67.49"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-123142");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionIn
        title="Deposit"
        subText="July 24, 2022 11:35 AM"
        amount="488.00"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-121343");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionOut
        title="NFT purchase"
        subText="July 24, 2022 11:35 AM"
        amount="67.49"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-123142");
        }}
      />
      <div className="divider my-2"></div>
      <TransactionOut
        title="Staked token"
        subText="July 24, 2022 11:35 AM"
        amount="67.49"
        onClick={(e) => {
          console.log(e, "More trnx details");
          router.push("/wallet/trx_detail/trx-123142");
        }}
      />
    </OnboardCard>
  );
};

export default withLayout(TransactionMoreList);
