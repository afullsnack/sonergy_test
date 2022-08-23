import { BigNumber, utils } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillClockCircle } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { useQueries, useQueryClient } from "react-query";
import { useToast } from "../../components/Alerts";
import {
  ButtonGhost,
  ButtonIcon,
  ButtonPrimary,
} from "../../components/Button";
import withLayout from "../../components/Layout";
import Loader from "../../components/Loader";
import { MostPopularSlider } from "../../components/Marketplace/carousel";
import { useModal } from "../../components/Modal";
import OnboardCard from "../../components/OnboardCard";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";
import {
  getCreatedNFTSurveys,
  getMyNFTSurveys,
  getNFTSurveys,
} from "../../lib/queries";
import { ConfirmMintModalContent } from "../home/my-surveys";

function Market() {
  const router = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { dSort } = router.query; //Default sort value from query param
  const queryClient = useQueryClient();

  // Conext
  const {
    address,
    inBuiltAddress,
    sonergyBalance: { symbol },
  } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();

  const [sort, setSort] = useState<string>(
    typeof dSort === "string" ? dSort : "marketplace"
  );
  const [mintModal, MintModal] = useModal();

  const [listModal, ListModal] = useModal();

  // States
  const [market, setMarket] = useState<Array<any> | undefined>();
  const [myCollection, setMyCollection] = useState<Array<any> | undefined>();
  const [completed, setCompleted] = useState<Array<any> | undefined>();

  // useQueries fetch to get nfts and collection and completed surveys
  const [
    { isLoading: isMarketLoading },
    { isLoading: isCollectionLoading },
    { isLoading: isCompletedLoading },
  ] = useQueries([
    {
      queryKey: ["getNFTSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getNFTSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ data, success, message }) {
        console.log(data, success, message, "Get NFT data");
        if (success && data.length) {
          const decodedMap = data
            .filter((f) => f.surveyTokenUrl !== "s7ujshjsjkaklauajaj")
            .map(async (item: any) => {
              console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyTokenUrl);
              console.log("Gotten json", json);
              return {
                ...json,
                price: utils.formatUnits(BigNumber.from(item?.price), 18),
                fromSurveyId: BigNumber.from(item?.fromSurveyId),
                surveyId: BigNumber.from(item?.surveyId),
                surveyTokenID: BigNumber.from(item?.surveyTokenID),
                nftContract: item?.nftContract,
                surveyTokenUrl: item?.surveyTokenUrl,
                owner: item?.owner,
                seller: item?.seller,
                status: item?.status,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);
          setMarket(awaitedDecode);
        }
      },
      onError(err) {
        console.error(err, "Error on get NFT");
      },
    },
    {
      queryKey: ["getMyNFTSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getMyNFTSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ data, success, message }) {
        console.log(data, success, message, "Get My NFT data");
        if (success && data?.length) {
          const decodedMap = data
            .filter((f) => f.surveyTokenUrl !== "s7ujshjsjkaklauajaj")
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyTokenUrl);
              // console.log("Gotten json", json);
              return {
                ...json,
                price: utils.formatUnits(BigNumber.from(item?.price), 18),
                fromSurveyId: BigNumber.from(item?.fromSurveyId),
                surveyId: BigNumber.from(item?.surveyId),
                surveyTokenID: BigNumber.from(item?.surveyTokenID),
                nftContract: item?.nftContract,
                surveyTokenUrl: item?.surveyTokenUrl,
                owner: item?.owner,
                seller: item?.seller,
                status: item?.status,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);
          setMyCollection(awaitedDecode);
        }
      },
      onError(err) {
        console.error(err, "Error on get NFT");
      },
    },
    {
      queryKey: ["getCreatedNFTSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getCreatedNFTSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ data, success, message }) {
        console.log(data, success, message, "Get Created NFT data");
        if (success && data?.length) {
          const decodedMap = data
            .filter((f) => f.surveyTokenUrl !== "s7ujshjsjkaklauajaj")
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyTokenUrl);
              // console.log("Gotten json", json);
              return {
                ...json,
                price: utils.formatUnits(BigNumber.from(item?.price), 18),
                fromSurveyId: BigNumber.from(item?.fromSurveyId),
                surveyId: BigNumber.from(item?.surveyId),
                surveyTokenID: BigNumber.from(item?.surveyTokenID),
                nftContract: item?.nftContract,
                surveyTokenUrl: item?.surveyTokenUrl,
                owner: item?.owner,
                seller: item?.seller,
                status: item?.status,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);
          setCompleted(awaitedDecode);
        }
      },
      onError(err) {
        console.error(err, "Error on get NFT");
      },
    },
  ]);

  const [toast, ToastRender] = useToast();

  useEffect(() => {
    console.log("useQueries result");
    queryClient.invalidateQueries("getNFTSurveys");
    queryClient.invalidateQueries("getMyNFTSurveys");
    queryClient.invalidateQueries("getCreatedNFTSurveys");
  }, [address, inBuiltAddress]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-white dark:bg-slate-900 p-3 mb-2">
        {/* Search action */}
        <form className="form-control mb-4 w-full">
          {/* <label
              htmlFor="search"
              className="mb-4 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Your Email
            </label> */}
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Search ${
                sort === "marketplace"
                  ? "marketplace"
                  : sort === "collections"
                  ? "my collections"
                  : "completed surveys"
              }...`}
              required
            />
            {/* <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button> */}
          </div>
        </form>
        {/* Sort actions */}
        {/* <div className="flex flex-col items-start justify-start w-full bg-white mb-10"> */}
        <div className="flex items-center justify-center w-full mb-2">
          <button
            className={`flex-1 mr-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "marketplace"
                ? "border-primary bg-[#B9D0E3] opacity-50 text-gray-800"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={(e) => setSort("marketplace")}
          >
            Marketplace
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "collections"
                ? "border-primary bg-[#B9D0E3] opacity-50 text-gray-800"
                : "border-slate-200"
            }  mobile:text-xs`}
            onClick={(e) => setSort("collections")}
          >
            My collections
          </button>
          <button
            className={`flex-1 ml-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "completed"
                ? "border-primary bg-[#B9D0E3] opacity-50 text-gray-800"
                : "border-slate-200"
            }  mobile:text-xs`}
            onClick={(e) => setSort("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Loading component */}
      {(sort === "marketplace" ||
        sort === "collections" ||
        sort === "completed") &&
        (isMarketLoading ||
          isCollectionLoading ||
          isCompletedLoading ||
          isPullingData) &&
        !market && <Loader />}

      {/* List of surveys */}
      {sort === "marketplace" && !isMarketLoading && !isPullingData && market && (
        <>
          <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3">
            <div className="w-full flex items-center justify-between">
              <span className="text-[16px] desktop:text-lg font-medium text-slate-800 dark:text-gray-300 mb-2">
                New Listings
              </span>
              <span
                className="text-sm desktop:text-lg font-medium text-blue-600 mb-2 hover:cursor-pointer"
                onClick={(e) => {
                  console.log("See all clicked", e);
                }}
              >
                See all
              </span>
            </div>
            <MostPopularSlider>
              {market?.map((item, idx) => (
                <div
                  className="carousel-item mobile:min-w-full"
                  key={idx.toString()}
                >
                  <OnboardCard>
                    <div
                      className="w-full flex flex-col items-start justify-between mb-2"
                      onClick={(e) => {
                        console.log(e, "Clicked on te survey");
                        router.push(
                          `/market/s/${item?.surveyTokenID}?action=bid`
                        );
                      }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 text-xs text-ellipses font-light flex items-center justify-center mb-2">
                        <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                        {`${item?.seller}` || "Username"}{" "}
                        <GoVerified color="#0059AC" className="ml-2" />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-normal text-left">
                        {item?.surveyTitle ||
                          " Blockchain development and utilization in sub-saharanAfrica."}
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <div className="flex flex-col flex-[3] items-start justify-center">
                        <p className="flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium text-[16px] mb-1">
                          {item?.price} {symbol || "SNEGY"}
                        </p>
                        {item?.expirationDate && (
                          <p className="flex items-center justify-center">
                            {" "}
                            <AiFillClockCircle size={14} />
                            <span className="text-xs text-gray-500 ml-1">
                              {new Date(
                                item?.expirationDate
                              ).toLocaleString() || "2 days 11 hours"}
                            </span>{" "}
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        <ButtonPrimary
                          text="Buy now"
                          type="normal"
                          icon={null}
                          iconPosition={null}
                          block={true}
                          onClick={(e) => {
                            console.log("Buy now clicked", e);
                            router.push(
                              `/market/s/${item?.surveyTokenID}?action=buy`
                            );
                          }}
                          disabled={false}
                          isLoading={false}
                        />
                      </div>
                    </div>
                  </OnboardCard>
                </div>
              ))}
            </MostPopularSlider>
          </div>
          {/* <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3">
            <div className="w-full flex items-center justify-between">
              <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-2">
                New
              </span>
              <span
                className="text-sm desktop:text-lg font-medium text-blue-600 mb-2 hover:cursor-pointer"
                onClick={(e) => {
                  console.log("See all clicked", e);
                }}
              >
                See all
              </span>
            </div>
            <MostPopularSlider />
          </div> */}
        </>
      )}

      {sort === "collections" && !isCollectionLoading && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3 space-y-4">
          {myCollection?.map((item, idx) => (
            <OnboardCard key={idx.toString()}>
              <div className="flex flex-col items-start justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 text-xs text-ellipsis font-light flex items-center justify-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                  {item?.owner || "Username"}{" "}
                  <GoVerified color="#0059AC" className="ml-2" />
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-normal text-left">
                  {item?.description ||
                    "Blockchain development and utilization in sub-saharan Africa."}
                </span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-[3]">
                  <ButtonPrimary
                    text="Sell"
                    type="normal"
                    icon={null}
                    iconPosition={null}
                    block={true}
                    onClick={(e) => {
                      console.log("Sell survey clicked", e);
                      listModal.show({
                        title: "List item for sale",
                        content: <ListItemModalContent />,
                      });
                    }}
                    disabled={false}
                    isLoading={false}
                  />
                </div>
                <div className="flex-1">
                  <ButtonIcon
                    type="normal"
                    icon={<FaFileDownload size={18} />}
                    block={true}
                    onClick={(e) => console.log("Download", e)}
                  />
                </div>
              </div>
            </OnboardCard>
          ))}
        </div>
      )}

      {/* {sort === "collections" && isCollectionLoading && <Loader />} */}

      {sort === "completed" && !isCompletedLoading && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3 space-y-4">
          {completed.map((item, idx) => (
            <OnboardCard key={idx.toString()}>
              <div className="flex flex-col items-start justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 text-xs text-ellipsis font-light flex items-center justify-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                  {item?.owner || "Username"}{" "}
                  <GoVerified color="#0059AC" className="ml-2" />
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-normal text-left">
                  {item?.description ||
                    "Blockchain development and utilization in sub-saharan Africa."}
                </span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-[3]">
                  <ButtonPrimary
                    text="Convert to NFT"
                    type="normal"
                    icon={null}
                    iconPosition={null}
                    block={true}
                    onClick={(e) => {
                      console.log("Sell survey clicked", e);
                      mintModal.show({
                        title: "Mint NFT",
                        content: (
                          <ConfirmMintModalContent
                            inBuiltAddress={inBuiltAddress}
                            surveyId={item?.surveyId}
                            surveyUrl={item?.uri}
                            cancel={() => mintModal.hide()}
                            onSuccessFeedback={(message) =>
                              toast.success({ text: message })
                            }
                            onFailedFeedback={(message) =>
                              toast.error({ text: message })
                            }
                          />
                        ),
                      });
                    }}
                    disabled={false}
                    isLoading={false}
                  />
                </div>
                <div className="flex-1">
                  <ButtonIcon
                    type="normal"
                    icon={<FaFileDownload size={18} />}
                    block={true}
                    onClick={(e) => console.log("Download", e)}
                  />
                </div>
              </div>
            </OnboardCard>
          ))}
        </div>
      )}

      {/* {sort === "completed" && isCompletedLoading && <Loader />} */}
      <MintModal />
      <ListModal />
      <ToastRender />
    </div>
  );
}

const MintModalContent = () => (
  <div className="w-full flex flex-col space-y-2">
    <span className="text-sm text-gray-600 font-normal mb-3">
      Converting your completed surveys to NFT will make them available for
      trade on the maketplace when you list them. Are you sure about this?
    </span>
    <ButtonPrimary
      text="Confirm & mint"
      type="normal"
      icon={null}
      iconPosition={null}
      block={true}
      onClick={(e) => console.log("confirm and mint clicked", e)}
      disabled={false}
      isLoading={false}
    />
    <ButtonGhost
      text="Cancel"
      type="normal"
      icon={null}
      iconPosition={null}
      block={true}
      onClick={(e) => console.log("cancel mint clicked", e)}
      disabled={false}
      isLoading={false}
    />
  </div>
);

const ListItemModalContent = () => {
  const [saleType, setSaleType] = useState("fixed");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex items-center justify-center w-full mb-2">
        <button
          className={`flex-1 mr-1 p-2 rounded-md border-solid border-[1px] ${
            saleType === "fixed"
              ? "border-primary bg-[#B9D0E3] opacity-50 text-gray-800"
              : "border-slate-200"
          } mobile:text-xs`}
          onClick={(e) => setSaleType("fixed")}
        >
          Fixed
        </button>
        <button
          className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
            saleType === "auction"
              ? "border-primary bg-[#B9D0E3] opacity-50 text-gray-800"
              : "border-slate-200"
          }  mobile:text-xs`}
          onClick={(e) => setSaleType("auction")}
        >
          Auction
        </button>
      </div>
      {saleType === "fixed" && (
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-slate-700 font-medium">Price</span>
          </label>
          <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
            <span className="flex items-center justify-center text-gray-700 px-4 bg-slate-100">
              SNEGY
            </span>
            <input
              type="number"
              placeholder="0.00"
              className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* <span className="flex items-center justify-center px-4 text-primary bg-transparent">
                MAX
              </span> */}
          </label>
          <label className="label">
            <span className="label-text-alt text-xs text-gray-500 mb-1">
              = $2.400.40
            </span>
            {/* <span className="label-text-alt text-xs text-gray-500 mb-1">
                <b>Available:</b> 0.0000 <b>SNEGY</b>
              </span> */}
          </label>
        </div>
      )}
      {saleType === "auction" && (
        <>
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  Start date
                </span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  value={startDate}
                  onChange={(e) => {
                    console.log("start date", e.target.value);
                    setStartDate(e.target.value);
                  }}
                />
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  Expiration date
                </span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  value={endDate}
                  onChange={(e) => {
                    console.log("End date", e.target.value);
                    setEndDate(e.target.value);
                  }}
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Minimum bid
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              <span className="flex items-center justify-center text-gray-700 px-4 bg-slate-100">
                SNEGY
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 w-[100%]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {/* <span className="flex items-center justify-center px-4 text-primary bg-transparent">
                MAX
              </span> */}
            </label>
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500 mb-1">
                = $2.400.40
              </span>
              {/* <span className="label-text-alt text-xs text-gray-500 mb-1">
                <b>Available:</b> 0.0000 <b>SNEGY</b>
              </span> */}
            </label>
          </div>
        </>
      )}
      <ButtonPrimary
        text="Confirm listing"
        type="normal"
        icon={null}
        iconPosition={null}
        block={true}
        onClick={(e) => console.log("confirm and mint clicked", e)}
        isLoading={false}
        disabled={false}
      />
    </div>
  );
};

export default withLayout(Market);
