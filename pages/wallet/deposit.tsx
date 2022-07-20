import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { FaCopy } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useQuery, useQueryClient } from "react-query";
import { ButtonGhost } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { getUserWalletAddresses } from "../../lib/queries";

function Deposit() {
  /**
   * @Page => Deposit page
   * @States => cookies, qrCode
   * @Event => Call getUserProfile() query function to get user data and render appropriately
   */

  const queryClient = useQueryClient();
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  // DONE: Setup query and render data from returned data
  const { token } = cookies;
  console.log(token, "Token");
  const { data, isLoading, error } = useQuery(
    ["getUserWalletAddresses", token],
    () => getUserWalletAddresses(token),
    {
      onSuccess({ success, message, data }) {
        console.info(data, "Data returned from fetching users wallet address");
      },
      onError(err) {
        console.error(err, "Error occurred while getting user wallet address");
      },
    }
  );
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-10">
        <OnboardCard>
          <span className="text-lg text-center text-slate-800 font-light mb-2">
            Deposit SNEGY
          </span>
          <div className="flex items-center justify-center mb-4">
            {/* <img src="/qr_code_img.svg" alt="Deposit QR code" width={200} /> */}
            <QRCode
              value={
                typeof data !== "undefined"
                  ? data?.data?.filter(
                      (val: { walletType: string }) => (val.walletType = "BSC")
                    )[1].address
                  : "Test address"
              }
              width={200}
            />
          </div>
          {/* <div className="badge bg-green-600 text-white font-light border-none mt-0 mb-5 mx-auto">Completed</div> */}
          <div className="w-full flex flex-col p-4">
            <span className="text-[16px] text-gray-600 mb-1">Network</span>
            <span className="text-[16px] font-medium text-gray-800 mb-3">
              Ethereum (
              {data
                ? data?.data?.filter(
                    (val: { walletType: string }) => (val.walletType = "BSC")
                  )[1].walletType
                : "ERC20"}
              )
            </span>
            <span className="text-sm text-gray-600 mb-1">Sonergy Address</span>
            <span className="text-[16px] font-medium text-gray-800 mb-3 flex items-center justify-between">
              <span className="truncate">
                {data
                  ? data?.data?.filter(
                      (val: { walletType: string }) => (val.walletType = "BSC")
                    )[1].address
                  : "0x078395eec8b3b15888b70cf64db2fadc12b6d860"}
              </span>{" "}
              <FaCopy color="#8895A7" />
            </span>
            <span className="text-xs text-gray-500 mb-1">
              Should arrive after 15 network confirmations
            </span>
          </div>
        </OnboardCard>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-transparent w-full mobile:p-3">
        <ButtonGhost
          type="normal"
          text="Save as image"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "save qr code info as image")}
          isLoading={false}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default withLayout(Deposit);
