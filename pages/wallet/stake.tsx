import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";

function Withdraw() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <span className="text-lg text-left text-slate-700 dark:text-gray-300 font-semibold mb-2">
            Stake SNEGY
          </span>
          <span className="text-sm text-left text-gray-600 dark:text-gray-300 mb-1">
            Lock up your SNEGY to earn some interest
          </span>
          <div className="w-full flex flex-col mb-2">
            <label className="label">
              <span className="label-text text-slate-700 dark:text-gray-300 font-medium">
                Duration
              </span>
            </label>
            <div className="flex item-center justify-center space-x-2">
              <span className="p-2 flex-1 text-center text-sm border-solid border-[1px] border-[#E1E7EC] rounded-lg">
                15 Days
              </span>
              <span className="p-2 flex-1 text-center text-sm text-primary border-solid border-[1px] border-primary rounded-lg">
                30 Days
              </span>
              <span className="p-2 flex-1 text-center text-sm border-solid border-[1px] border-[#E1E7EC] rounded-lg">
                60 Days
              </span>
              <span className="p-2 flex-1 text-center text-sm border-solid border-[1px] border-[#E1E7EC] rounded-lg">
                90 Days
              </span>
            </div>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 dark:text-gray-300 font-medium">
                Locked amount
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center text-gray-700 dark:text-gray-300 px-4 bg-gray-100 dark:bg-slate-900">
                SNEGY
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered bg-transparent text-black dark:text-gray-300 outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
              />
              <span className="flex items-center justify-center px-4 text-primary bg-transparent">
                MAX
              </span>
            </label>
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500 dark:text-gray-300 mb-1">
                Available: 25,000.0000 <b>SNEGY</b>
              </span>
            </label>
          </div>
          <span className="label-text text-slate-700 dark:text-gray-300 font-medium mb-2">
            Locked Amount Limits
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300 mb-1">
            Minimum: 10,000 SNEGY
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            Maximum: 100,000 SNEGY
          </span>
          <span className="label-text text-slate-700 dark:text-gray-300 font-medium mb-2">
            Summary
          </span>
          <div className="flex flex-col items-start justify-center bg-gray-100 dark:bg-slate-900 p-4 rounded-lg border border-gray-400">
            <span className="text-xs text-gray-500 dark:text-gray-300 mb-1 w-full flex items-center justify-between">
              Estimated APY: <b>40.00%</b>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300 mb-1 w-full flex items-center justify-between">
              Estimated Interest: <b className="text-green-600">0.0000 SNEGY</b>
            </span>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-white dark:bg-slate-900 w-full mobile:p-4">
        <ButtonPrimary
          type="normal"
          text="Confirm staking"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Confirm Staking")}
          isLoading={false}
          disabled={false}
        />
      </div>
    </div>
  );
}

const ConfirmStake = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
      <OnboardCard>
        <span className="text-[16px] text-slate-700 font-medium mb-2">
          Summary
        </span>
        <div className="flex flex-col items-start justify-center bg-gray-100 p-4 rounded-lg mb-3">
          <span className="text-xs text-gray-500 mb-1 w-full flex items-center justify-between">
            Locked Amount: <b>10,000 SNEGY</b>
          </span>
          <span className="text-xs text-gray-500 mb-1 w-full flex items-center justify-between">
            Duration: <b>30 Days</b>
          </span>
          <span className="text-xs text-gray-500 mb-1 w-full flex items-center justify-between">
            Redemption Date: <b>July 24, 2022</b>
          </span>
          <span className="text-xs text-gray-500 mb-1 w-full flex items-center justify-between">
            Estimated APY: <b>40.00%</b>
          </span>
          <span className="text-xs text-gray-500 mb-1 w-full flex items-center justify-between">
            Estimated Interest: <b className="text-green-600">12.0000 SNEGY</b>
          </span>
        </div>
        <ButtonPrimary
          type="normal"
          text="Redeem"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Redeem Staking")}
          isLoading={false}
          disabled={false}
        />
      </OnboardCard>
    </div>
  );
};

export default withLayout(Withdraw);
