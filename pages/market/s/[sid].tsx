import { BigNumber, utils } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillClockCircle, AiFillLeftCircle } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "../../../components/Alerts";
import { ButtonPrimary } from "../../../components/Button";
import withLayout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import { useModal } from "../../../components/Modal";
import OnboardCard from "../../../components/OnboardCard";
import { useIPFSContext } from "../../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../../lib/contexts/walletContext";
import { buySurveyNFT } from "../../../lib/mutations";
import { getNFTSurveys } from "../../../lib/queries";

function SingleSurvey() {
  const router = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { sid, action } = router.query;
  console.log(sid, action, "Query params");
  const queryClient = useQueryClient();

  const [bidModal, BidModal] = useModal();
  const [toast, ToastRender] = useToast();
  const [data, setData] = useState<any>();

  const {
    address,
    inBuiltAddress,
    sonergyBalance: { symbol },
  } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();

  // Query and get the

  const { isLoading } = useQuery(
    ["getNFTSurveys", token, address || inBuiltAddress],
    () => getNFTSurveys({ token, address: address || inBuiltAddress }),
    {
      async onSuccess({ data, success, message }) {
        console.log(data, success, message, "Get NFT data");
        if (success && data.length) {
          data?.forEach(async (item, idx) => {
            console.log("Item", item.surveyTokenUrl, item?.surveyTokenID);
            if (
              BigNumber.from(item?.surveyTokenID).toString() === (sid as string)
            ) {
              const json = await pullData(item?.surveyTokenUrl);
              console.log("Gotten json", json);
              setData((_prev) => ({
                ...json,
                price: utils.formatUnits(BigNumber.from(item?.price), 18),
                fromSurveyId: BigNumber.from(item?.fromSurveyId),
                surveyId: BigNumber.from(item?.surveyId),
                surveyTokenID: BigNumber.from(item?.surveyTokenID).toString(),
                nftContract: item?.nftContract,
                surveyTokenUrl: item?.surveyTokenUrl,
                owner: item?.owner,
                seller: item?.seller,
                status: item?.status,
              }));
            }
          });
        }
      },
      onError(err) {
        console.error(err, "An error occurred");
      },
    }
  );

  useEffect(() => {
    if (sid) queryClient.invalidateQueries("getNFTSurveys");
    console.log(data, "Data after fetch");
  }, [sid]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-center w-full bg-white p-3 mb-3">
        <div
          className="flex items-center justify-start space-x-2 hover:cursor-pointer"
          onClick={(e) => router.back()}
        >
          <AiFillLeftCircle />
          <span className="text-sm font-medium text-gray-800">Marketplace</span>
        </div>
      </div>
      {action === "bid" && !isPullingData && !isLoading && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-2">
          <OnboardCard>
            <div className="w-full flex flex-col items-center justify-center">
              <span className="w-full flex items-center justify-start text-xs font-light mb-5">
                <AiFillClockCircle size={14} /> Sale ends May 24, 2022 at 6:30am
                GMT+1
              </span>
              <span className="w-full flex items-center justify-between text-xs font-light mb-5">
                <span>
                  Current owner:{" "}
                  <b className="text-primary">{data?.owner || "Username"}</b>
                </span>
                {/* <span className="flex items-center justify-center">
                  <FaEye size={14} className="mr-2 text-gray-500" /> 450 views
                </span> */}
              </span>
              <span className="w-full flex items-center justify-start text-sm text-gray-400 font-light mb-5">
                Top bid:{" "}
                <b className="font-medium text-lg text-gray-700 mx-2">
                  {data?.price || "650"} {symbol || "SNEGY"}
                </b>{" "}
                {/* ($2,145.60) */}
              </span>
            </div>
            <div className="flex flex-col items-start justify-between mb-2">
              <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                {data?.seller.substring(0, 8) || "Username"}{" "}
                <GoVerified color="#0059AC" className="ml-2" />
              </span>
              <span className="text-gray-700 text-sm font-normal text-left">
                {data?.description ||
                  "Blockchain development and utilization in sub-saharan Africa."}
              </span>
            </div>
            <ButtonPrimary
              text="Place bid"
              type="normal"
              icon={<FaWallet color="white" />}
              iconPosition={"left"}
              block={true}
              onClick={(e) => {
                console.log("Place bid on survey clicked", e);
                bidModal.show({
                  title: "Place bid",
                  content: (
                    <PlaceBidModalContent
                      surveyTokenId={data?.surveyTokenID}
                      token={token}
                      toast={toast}
                    />
                  ),
                });
              }}
              disabled={false}
              isLoading={false}
            />
          </OnboardCard>
        </div>
      )}
      {action === "buy" && !isPullingData && !isLoading && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-2">
          <OnboardCard>
            <div className="w-full flex flex-col items-center justify-center">
              {/* <span className="w-full flex items-center justify-start text-xs font-light mb-5">
                <AiFillClockCircle size={14} /> Sale ends May 24, 2022 at 6:30am
                GMT+1
              </span> */}
              <span className="w-full flex items-center justify-between text-xs font-light mb-5">
                <span>
                  Current owner:{" "}
                  <b className="text-primary">{data?.owner || "Username"}</b>
                </span>
                {/* <span className="flex items-center justify-center">
                  <FaEye size={14} className="mr-2 text-gray-500" /> 50 views
                </span> */}
              </span>
              <span className="w-full flex items-center justify-start text-sm text-gray-400 font-light mb-5">
                Top bid:{" "}
                <b className="font-medium text-lg text-gray-700 mx-2">
                  {data?.price || "650"} {symbol || "SNEGY"}
                </b>{" "}
                {/* ($2,145.60) */}
              </span>
            </div>
            <div className="flex flex-col items-start justify-between mb-2">
              <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                {data?.seller.substring(0, 8) || "Username"}{" "}
                <GoVerified color="#0059AC" className="ml-2" />
              </span>
              <span className="text-gray-700 text-sm font-normal text-left">
                {data?.description ||
                  "Blockchain development and utilization in sub-saharan Africa."}
              </span>
            </div>
            <ButtonPrimary
              text="Confirm & buy"
              type="normal"
              icon={<FaWallet color="white" />}
              iconPosition={"left"}
              block={true}
              onClick={(e) => {
                console.log("confirm buy on survey clicked", e);
                bidModal.show({
                  title: "Place bid",
                  content: (
                    <PlaceBidModalContent
                      surveyTokenId={data?.surveyTokenID}
                      token={token}
                      toast={toast}
                    />
                  ),
                });
              }}
              disabled={false}
              isLoading={false}
            />
          </OnboardCard>
        </div>
      )}
      {action === "bid" ||
        (action === "buy" && (isPullingData || isLoading) && <Loader />)}
      <BidModal />
      <ToastRender />
    </div>
  );
}

const PlaceBidModalContent = ({ surveyTokenId, token, toast }) => {
  const { sonergyBalance } = useWalletContext();
  const { mutate, isLoading } = useMutation(buySurveyNFT, {
    async onSuccess({ data, message, success }) {},
    onError(err) {
      console.log(err, "Error occurred while buying NFT");
    },
  });

  const [price, setPrice] = useState<string>();

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text text-slate-700 font-medium">Price</span>
        </label>
        <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
          <span className="flex items-center justify-center text-gray-700 px-4 bg-slate-100">
            {sonergyBalance.symbol || "SNEGY"}
          </span>
          <input
            type="number"
            placeholder="0.00"
            className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
            value={price}
            onChange={(e) => setPrice((_prev) => e.target.value)}
          />
          {/* <span className="flex items-center justify-center px-4 text-primary bg-transparent">
                MAX
              </span> */}
        </label>
        <label className="label">
          <span className="label-text-alt text-xs text-gray-500 mb-1">
            = ${sonergyBalance.USD || "2.400.40"}
          </span>
          <span className="label-text-alt text-xs text-gray-500 mb-1">
            <b>Available:</b>{" "}
            {utils.formatUnits(sonergyBalance.sonergy, 18) || "0.0000"}{" "}
            <b>{sonergyBalance.symbol || "SNEGY"}</b>
          </span>
        </label>
      </div>
      <ButtonPrimary
        text="Confirm bid"
        type="normal"
        icon={null}
        iconPosition={null}
        block={true}
        onClick={async (e) => {
          console.log(
            "confirm bid clicked",
            e,
            price,
            utils.parseUnits(price, 18).toString(),
            surveyTokenId
          );
          if (price)
            mutate({
              token,
              surveyTokenId,
              price: utils.parseUnits(price, 18).toString(),
            });
        }}
        isLoading={isLoading}
        disabled={false}
      />
    </div>
  );
};

export default withLayout(SingleSurvey);
