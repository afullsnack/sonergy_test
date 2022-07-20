import { utils } from "ethers";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineRight } from "react-icons/ai";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaEye,
  FaEyeSlash,
  FaPercentage,
  FaTag,
} from "react-icons/fa";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import withLayout from "../../components/Layout";
import Loader from "../../components/Loader";
import OnboardCard from "../../components/OnboardCard";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { getTransactionHistory } from "../../lib/queries";

function Wallet() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const { token } = cookies;

  // Wallet context
  const { address } = useWalletContext();

  // Wallet transaction history query : { data, success, message }
  const {
    data,
    isLoading,
    error,
  }: {
    data:
      | { data: Array<any | undefined>; success: boolean; message: string }
      | undefined;
    isLoading: boolean;
    error: object | undefined;
  } = useQuery(
    ["getTransactionHistory", token, address],
    () => getTransactionHistory({ token, address: address }),
    {
      onSuccess({ success, message, data }) {
        console.info(
          data,
          success,
          message,
          "Data returned from the getTransactionHistory"
        );
      },
      onError(err) {
        console.error(err, "Error occurred while getTransactionHistory called");
      },
    }
  );

  useEffect(() => {
    console.log(address, "Connected address");
    // Invalidate all queries that depend on the connected address
    queryClient.invalidateQueries("getTransactionHistory");
  }, [address]);

  return (
    <div className="w-full">
      {/* Available balance */}
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-8">
        <WalletBalance />
        <div className="w-full flex flex-row items-center justify-center space-x-8 px-6">
          <div
            className="flex flex-col items-center justify-evenly hover:cursor-pointer"
            onClick={(e) => router.push("/wallet/deposit")}
          >
            <div className="shrink-0 rounded-xl border-solid border-green-200 border-[.9px] p-3 mb-2">
              <FaArrowCircleUp size={18} color="#27C079" />
            </div>
            <span className="text-xs text-slate-800 font-medium">Deposit</span>
          </div>
          <div
            className="flex flex-col items-center justify-evenly hover:cursor-pointer"
            onClick={(e) => router.push("/wallet/withdraw")}
          >
            <div className="shrink-0 rounded-xl border-solid border-red-200 border-[.9px] p-3 mb-2">
              <FaArrowCircleDown size={18} color="red" />
            </div>
            <span className="text-xs text-slate-800 font-medium">Withdraw</span>
          </div>
          <div
            className="flex flex-col items-center justify-evenly hover:cursor-pointer"
            onClick={(e) => router.push("/wallet/buy")}
          >
            <div className="shrink-0 rounded-xl border-solid border-orange-200 border-[.9px] p-3 mb-2">
              <FaTag size={18} color="orange" />
            </div>
            <span className="text-xs text-slate-800 font-medium">Buy</span>
          </div>
          <div
            className="flex flex-col items-center justify-evenly hover:cursor-pointer"
            onClick={(e) => router.push("/wallet/stake")}
          >
            <div className="shrink-0 rounded-xl border-solid border-blue-200 border-[.9px] p-3 mb-2">
              <FaPercentage size={18} color="#62B2FD" />
            </div>
            <span className="text-xs text-slate-800 font-medium">Stake</span>
          </div>
        </div>
      </div>

      {/* Transactions states */}
      <div className="flex flex-col items-center justify-center w-full bg-transparent mobile:p-3 mb-10">
        <div className="w-full flex items-center justify-between">
          <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-2">
            Wallet transactions
          </span>
          <span
            className="text-sm desktop:text-lg font-medium text-blue-600 mb-2 hover:cursor-pointer"
            onClick={(e) => router.push("/wallet/trx_list/7days")}
          >
            See all
          </span>
        </div>
        {isLoading && !error && !data && <Loader />}
        {!isLoading && !error && data && !!data?.data.length && (
          <TransactionsList router={router} data={data?.data} />
        )}
        {!isLoading && !error && data && !data?.data.length && (
          <NoTransaction />
        )}
      </div>
    </div>
  );
}

const NoTransaction = () => (
  <OnboardCard>
    <div className="w-full flex flex-col items-center justify-around">
      <div className="p-4 rounded-full bg-slate-100 mb-4">
        <img src="/empty_state_icon.svg" width={70} alt="No transaction" />
      </div>
      <h2 className="text-gray-700 text-md desktop:text-md font-semibold mb-1">
        You’ve not made any transactions
      </h2>
      <span className="text-gray-500 text-sm text-center">
        No transactions yet, your transactions will show up here once you’ve got
        any.
      </span>
    </div>
  </OnboardCard>
);

const TransactionsList = ({
  router,
  data,
}: {
  router: NextRouter;
  data: object[];
}) => {
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
    </OnboardCard>
  );
};

export const WalletBalance = () => {
  const queryClient = useQueryClient();

  // Wallet Context
  const { isFetchingBalance, address, sonergyBalance } = useWalletContext();

  // State
  const [hideBalance, setHideBalance] = useState<boolean>(false);

  useEffect(() => {
    console.log("Balance invalidated", address);
    queryClient.invalidateQueries("getSonergyBalance");
  }, [address]);

  return (
    <div className="w-full flex flex-col items-center justify-around bg-cyan-700 py-6 rounded-xl mb-5">
      {!isFetchingBalance && (
        <>
          <div className="flex items-center justify-center mb-3">
            <span className="text-xs font-light text-center text-white mr-2">
              Available balance
            </span>
            {hideBalance ? (
              <FaEye
                color="white"
                onClick={() => setHideBalance((hide) => !hide)}
              />
            ) : (
              <FaEyeSlash
                color="white"
                onClick={() => setHideBalance((hide) => !hide)}
              />
            )}
          </div>
          <p className="mb-2">
            {!hideBalance ? (
              <b className="text-lg text-white font-semibold">
                {
                  Number(utils.formatUnits(sonergyBalance.sonergy, 18))
                    .toFixed(2)
                    .split(".")[0]
                }
                <small className="text-xs font-medium">
                  .
                  {
                    Number(utils.formatUnits(sonergyBalance.sonergy, 18))
                      .toFixed(2)
                      .split(".")[1]
                  }
                </small>
              </b>
            ) : (
              <b className="text-lg text-white font-semibold">****</b>
            )}{" "}
            <span className="text-sm text-white font-light">
              {sonergyBalance.symbol}
            </span>
          </p>
          <span className="text-xs text-white font-light mb-2">
            ${sonergyBalance.USD}
          </span>
        </>
      )}
      {isFetchingBalance && <Loader />}
      {/* {!isLoading &&
        !error &&
        !data.data &&
        data.message.includes("invalid address") && (
          <span className="text-xs text-white font-medium mb-2">
            Invalid Address provided/Connect wallet
          </span>
        )} */}
    </div>
  );
};

export default withLayout(Wallet);
