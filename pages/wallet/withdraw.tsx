import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaQrcode } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { sendSonergy } from "../../lib/mutations";

function Withdraw() {
  /**
   * @Page => Withdraw page
   * @States => email, password, isHidden
   * @Event => Call loginUser() mutation function and store the user token in localStorage/cookie
   */
  const queryClient = useQueryClient();
  const router = useRouter();
  const [{ token }] = useCookies(["token"]);

  // Wallet context
  const { address, sonergyBalance } = useWalletContext();

  /* States */
  const [recipient, setRecipient] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [amount, setAmount] = useState<number>();

  // DONE: setup useMutation
  const { mutate, isLoading, data } = useMutation(sendSonergy, {
    onSuccess: (data) => {
      console.log(data, "Returned login data");
    },
    onError: () => console.error("There was an error trying to login"),
    onSettled: () => {
      queryClient.invalidateQueries("getSonergyBalance");
      queryClient.invalidateQueries("getTransactionHistory");
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <span className="text-lg text-left text-slate-700 font-semibold mb-2">
            Withdraw SNEGY
          </span>
          <span className="text-sm text-left text-gray-600 mb-1">
            Send SNEGY to an external address
          </span>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Address
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                placeholder="Long press to paste"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
                value={recipient}
                onChange={(e) => {
                  console.log(e, "Recipient address");
                  setRecipient(e.target.value);
                }}
              />
              <span className="flex items-center justify-center pl-1 pr-4 bg-transparent">
                <FaQrcode />
              </span>
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Network
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                disabled
                placeholder="Ethereum (ERC20)"
                className="input input-bordered disabled:bg-gray-200 bg-transparent disabled:placeholder:text-black text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
              />
              {/* <span className="flex items-center justify-center pl-1 pr-4 bg-transparent">
                <FaQrcode />
              </span> */}
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Amount
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center text-gray-700 px-4 bg-gray-100">
                SNEGY
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
                value={amount}
                onChange={(e) => {
                  console.log(e, "Amount to be sent");
                  setAmount(Number(e.target.value));
                }}
              />
              <span className="flex items-center justify-center px-4 text-primary bg-transparent">
                MAX
              </span>
            </label>
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500 mb-1">
                <b>Available:</b> {sonergyBalance.sonergy}{" "}
                <b>{sonergyBalance.symbol}</b>
              </span>
            </label>
          </div>
          <span className="text-xs text-gray-500 mb-1">
            Should arrive after 15 network confirmations
          </span>
          <span className="text-xs text-gray-500 mb-1">
            Minimum withdrawal 10 SNEGY
          </span>
        </OnboardCard>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-white w-full mobile:p-4">
        <div className="flex flex-col items-start justify-between w-[65%]">
          <span className="text-xs text-gray-500 mb-1">Receive amount</span>
          <span className="text-[16px] font-medium text-gray-700 mb-1">
            0.00 SNEGY
          </span>
          <span className="text-xs font-thin text-gray-500 mb-1">
            Fee: 0.10 SNEGY
          </span>
        </div>
        <ButtonPrimary
          type="normal"
          text="Confirm withdrawal"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => {
            console.log(e, "Confirm withdrawal");
            // TODO: Check sonergy  balance and call alert insufficient alert if less than minimum
          }}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default withLayout(Withdraw);
