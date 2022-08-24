import Link from "next/link";
import Logo from "../components/Logo";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="sticky top-0 z-30 w-full bg-white">
        <div className="landing_container w-[100%] mobile:bg-white desktop:bg-white flex items-center justify-between desktop:px-2 pr-4 mb-2">
          <Link href="/" passHref>
            <a>
              <Logo />
            </a>
          </Link>
          {
            <div className="w-[100%] hidden desktop:visible max-w-2xl h-20 desktop:flex py-4 items-stretch justify-center rounded-sm bg-transparent"></div>
          }
          <div className="rounded-md w-auto h-8 flex items-center justify-center space-x-4">
            <h1 className="text=lg text-base font-semibold text-black">
              COMING SOON
            </h1>
          </div>
        </div>
      </div>
      <div className="landing_container desktop:px-2 flex flex-col">
        <div className="flex flex-col desktop:flex-row items-center justify-center  space-y-6 desktop:space-x-6 py-24">
          <div className="flex flex-col items-center desktop:items-start justify-center space-y-6 px-6 w-full">
            <h1 className="text-black text-left font-bold text-5xl">
              Get verifiable, reliable and decentralized research data.
            </h1>
            <span className="text-gray-600 text-lg font-normal">
              Sonergy helps researchers collect validated data through survey
              respondents to better inform their business strategies.
            </span>
            <ul className="w-full rounded-lg mt-6 mb-3 text-gray-600">
              <li className="flex items-center mb-2">
                <img
                  src="/list-check-square-icon.svg"
                  alt="Check square"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">
                  Commission research surveys.
                </span>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/list-check-square-icon.svg"
                  alt="Check square"
                  className="flex-none w-6 h-6"
                />
                <span className="ml-2 truncate">
                  Provide data for research surveys and get rewarded.
                </span>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/list-check-square-icon.svg"
                  alt="Check square"
                  className="flex-none w-6 h-6"
                />
                <span className="ml-2 truncate">
                  Validate & verify research surveys data and get rewarded.
                </span>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/list-check-square-icon.svg"
                  alt="Check square"
                  className="flex-none w-6 h-6"
                />
                <span className="ml-2 truncate">
                  Mint and trade validated research data as NFTs on the
                  marketplace.
                </span>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/list-check-square-icon.svg"
                  alt="Check square"
                  className="flex-none w-6 h-6"
                />
                <span className="ml-2 truncate">
                  Stake Sonergy (SNEGY) tokens and earn up to 40% APY interest.*
                </span>
              </li>
            </ul>
            <div className="flex items-center justify-start space-x-4 w-full">
              <h1 className="text-lg font-semibold text-black">COMING SOON</h1>
            </div>
          </div>
          <div className="flex flex-col items-end p-6 desktop:p-0">
            <img
              src="/hero_img.png"
              // width={900}
              alt="Hero image"
              className="text-right mx-auto desktop:w-[900px] mobile:w-full"
            />
          </div>
        </div>
        <div
          className="flex mobile:flex-col desktop:flex-row items-center justify-center space-x-6 mobile:space-y-6 py-20 w-full mobile:px-6"
          id="about"
        >
          <div className="w-auto">
            <img
              src="/hero_img_2.png"
              width={"100%"}
              alt="Stat image"
              // className="w-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center space-y-4">
            <div className="flex items-center justify-start w-full space-x-4">
              <h1 className="text-black text-left font-bold text-5xl">
                Why Sonergy?
              </h1>
              <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
            </div>
            <span className="text-gray-600 text-[16px] font-normal">
              Many organizations across the globe are currently struggling to
              get accurate and quality data insights that they need to remain
              competitive. As a result, cutting edge technologies such as
              blockchain are necessary for use; to ensure that data is designed
              to benefit all sides of the research continuum. Consequently,
              Sonergy deployed a data integrity protocol as a solution to
              collect and analyze the right data to inform actionable insights.
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#0F4079]" id="solution">
        <div className="landing_container desktop:py-32 flex mobile:flex-col desktop:flex-row mobile:space-y-2 space-x-2">
          <div className="flex flex-col space-y-8 mobile:w-full mobile:p-12">
            <div className="flex items-center justify-start w-full space-x-4">
              <h1 className="text-white text-left font-bold text-5xl">
                The solution
              </h1>
              <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
            </div>
            <span className="text-white text-[16px] font-light w-2/3">
              Sonergy is the first known global blockchain-based data integrity
              protocol to be actively disrupting the research industry with
              blockchain technology. Sonergy is designed to assist and connect
              businesses to markets and researchers to gather quality, useful
              and factual insights to inform their business strategies.
            </span>
            <ul className="w-full rounded-lg mt-6 mb-3 text-white">
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">Data Integrity</span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">Data privacy and security</span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">
                  Data collection and aggregation onchain
                </span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">
                  Streamlined and affordable data
                </span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">Decentralized data</span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">
                  Validated, quality and verifiable data
                </span>
              </li>
              <li className="flex items-center mb-3">
                <img
                  src="/solution-check-circle-icon.svg"
                  alt="Check circle"
                  className="flex-none w-6 h-6"
                />{" "}
                <span className="ml-2 truncate">
                  Data generation and incentives by/for humans and not bots
                </span>
              </li>
            </ul>
            <div>
              <h1 className="text-lg text-left font-semibold">COMING SOON</h1>
            </div>
          </div>
          <div className="flex flex-col desktop:items-end mobile:items-center justify-center mobile:w-full mobile:p-12">
            <img
              src="/solution_hero_img.svg"
              // width={1800}
              alt="Hero image"
              className="mx-auto desktop:w-[2200px] mobile:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
