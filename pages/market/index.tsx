import { useState } from "react";
import withLayout from "../../components/Layout";

function Market() {
  const [sort, setSort] = useState<string>("marketplace");

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-white p-3 mb-8">
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
    </div>
  );
}

export default withLayout(Market);
