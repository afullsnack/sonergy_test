import { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import {
  ButtonGhost,
  ButtonIcon,
  ButtonPrimary,
} from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";

function MySurveys() {
  const [sort, setSort] = useState("commissioned");
  return (
    <div className="w-full">
      {/* Sort actions */}
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-10">
        <div className="flex items-center justify-center w-[100%] mb-2">
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "commissioned"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort("commissioned")}
          >
            Commissioned
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "completed"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort("completed")}
          >
            Completed
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "validated"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort("validated")}
          >
            Validated
          </button>
        </div>
        <select className="select select-bordered w-full bg-gray-200 text-slate-700">
          <option disabled selected>
            Filter
          </option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* My surveys list */}
      <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
        <OnboardCard>
          <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
            <div className="flex flex-col items-start justify-between mb-3">
              <div className="badge bg-orange-200 text-orange-700 text-xs border-none mb-3">
                Pending completion
              </div>
              <span className="text-gray-700 text-sm font-normal text-left mb-2">
                Blockchain development and utilisation in sub-saharan Africa.
              </span>
              <p className="flex items-center justify-center">
                <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  Expires in 2 days 11 hours
                </span>{" "}
              </p>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-[3]">
                <ButtonGhost
                  text="Convert to NFT"
                  type="normal"
                  icon={null}
                  iconPosition={null}
                  block={true}
                  onClick={(e) => console.log("Convert to NFT", e)}
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
          </div>
          <div className="border-solid border-[1px] border-slate-200 rounded-lg p-4 mb-3">
            <div className="flex flex-col items-start justify-between mb-3">
              <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                Completed
              </div>
              <span className="text-gray-700 text-sm font-normal text-left mb-2">
                Blockchain development and utilisation in sub-saharan Africa.
              </span>
              <p className="flex items-center justify-center">
                <b className="text-gray-700 text-mf font-medium">200 SNEGY</b>{" "}
              </p>
              <p className="flex items-center justify-center">
                {" "}
                <AiFillClockCircle size={14} />
                <span className="text-xs text-gray-500 ml-1">
                  Expires in 2 days 11 hours
                </span>{" "}
              </p>
            </div>
            {/* <div className="flex items-center justify-between space-x-4">
              <div className="flex-[3]">
                <ButtonGhost text="Convert to NFT" type="normal" icon={null} iconPosition={null} block={true} onClick={e => console.log('Convert to NFT', e)} />
              </div>
              <div className="flex-1">
                <ButtonIcon type="normal" icon={<FaFileDownload size={18} />} block={true} onClick={e => console.log('Download', e)} />
              </div>
            </div> */}
          </div>
        </OnboardCard>
      </div>

      {/* Analyze action buttn */}
      <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3">
        <ButtonPrimary
          type="normal"
          text="Analyze survey"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => console.log(e, "Analyze survey")}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default withLayout(MySurveys);
