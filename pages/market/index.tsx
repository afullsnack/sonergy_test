import { useRouter } from "next/router";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import {
  ButtonGhost,
  ButtonIcon,
  ButtonPrimary,
} from "../../components/Button";
import withLayout from "../../components/Layout";
import { MostPopularSlider } from "../../components/Marketplace/carousel";
import { useModal } from "../../components/Modal";
import OnboardCard from "../../components/OnboardCard";

function Market() {
  const router = useRouter();
  const { dSort } = router.query; //Default sort value from query param
  const [sort, setSort] = useState<string>(
    typeof dSort === "string" ? dSort : "marketplace"
  );
  const [mintModal, MintModal] = useModal({
    title: "Mint NFT",
    content: <MintModalContent />,
  });

  const [listModal, ListModal] = useModal({
    title: "List item for sale",
    content: <ListItemModalContent />,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-white p-3 mb-2">
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
      {/* List of surveys */}
      {sort === "marketplace" && (
        <>
          <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3">
            <div className="w-full flex items-center justify-between">
              <span className="text-[16px] desktop:text-lg font-medium text-slate-800 mb-2">
                Most popular
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
          </div>
          <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3">
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
          </div>
        </>
      )}

      {sort === "collections" && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3 space-y-4">
          {new Array(3).fill("muches").map((item, idx) => (
            <OnboardCard key={idx.toString()}>
              <div className="flex flex-col items-start justify-between mb-2">
                <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                  Username <GoVerified color="#0059AC" className="ml-2" />
                </span>
                <span className="text-gray-700 text-sm font-normal text-left">
                  Blockchain development and utilization in sub-saharan Africa.
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
                      listModal.show();
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

      {sort === "completed" && (
        <div className="flex flex-col items-start justify-start w-full bg-transparent p-3 mb-3 space-y-4">
          {new Array(3).fill("muches").map((item, idx) => (
            <OnboardCard key={idx.toString()}>
              <div className="flex flex-col items-start justify-between mb-2">
                <span className="text-gray-700 text-xs font-light flex items-center justify-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>{" "}
                  Username <GoVerified color="#0059AC" className="ml-2" />
                </span>
                <span className="text-gray-700 text-sm font-normal text-left">
                  Blockchain development and utilization in sub-saharan Africa.
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
                      mintModal.show();
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
      <MintModal />
      <ListModal />
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
