import { Accordion, Badge, Footer, Table, Timeline } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonGhost, ButtonPrimary } from "../components/Button";
import Logo from "../components/Logo";

export default function LandingPage() {
  const router = useRouter();
  const { pathname, asPath } = router;

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
            <div className="w-[100%] hidden desktop:visible max-w-2xl h-20 desktop:flex py-4 items-stretch justify-center rounded-sm bg-transparent">
              <div className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer">
                <Link href={"/#about"}>
                  <a>
                    <span
                      className={`text-md font-medium ml-2 ${
                        asPath.includes("about")
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      About
                    </span>
                  </a>
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer">
                <Link href={"/#solution"}>
                  <a>
                    <span
                      className={`text-md font-medium  ml-2 ${
                        asPath.includes("solution")
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      Solution
                    </span>
                  </a>
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer">
                <Link href={"/#how_it_works"}>
                  <a>
                    <span
                      className={`text-md font-medium  ml-2 ${
                        asPath.includes("how_it_works")
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      How it works
                    </span>
                  </a>
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer">
                <Link href={"/#roadmap"}>
                  <a>
                    <span
                      className={`text-md font-medium  ml-2 ${
                        asPath.includes("roadmap")
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      Roadmap
                    </span>
                  </a>
                </Link>
              </div>
              <div className="w-[1px] h-full bg-slate-700"></div>
              <div className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer space-x-2">
                <Link href={"/#market"}>
                  <a>
                    <span
                      className={`text-md font-medium  ml-2 ${
                        asPath.includes("market")
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      Marketplace
                    </span>
                  </a>
                </Link>
                <Badge color="info">NFT</Badge>
              </div>
            </div>
          }
          <div className="rounded-md w-auto h-8 flex items-center justify-center space-x-4">
            <ButtonGhost
              text={`Login`}
              onClick={(e) => {
                console.log(e, "Redirect to login");
                router.push("/onboarding/login");
              }}
            />
            <ButtonPrimary
              text={"Launch app"}
              onClick={(e) => {
                console.log(e, "Launch application");
                router.push("/onboarding/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="landing_container desktop:px-2 flex flex-col">
        <div className="flex items-center justify-center space-x-6 py-24">
          <div className="flex flex-col items-start justify-center space-y-6">
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
              <ButtonPrimary
                text="Get started"
                onClick={() => {
                  console.log("Get started button");
                  router.push("/onboarding/");
                }}
              />
              <ButtonGhost
                text="Build on sonergy"
                onClick={() => {
                  console.log("Build on sonergy btn");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <img
              src="/hero_img.png"
              // width={900}
              alt="Hero image"
              className="text-right mx-auto desktop:w-[900px] mobile:w-full"
            />
          </div>
        </div>
        <div
          className="flex items-center justify-center space-x-6 py-20"
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
        <div className="landing_container desktop:py-32 flex space-x-2">
          <div className="flex flex-col space-y-8">
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
              <ButtonGhost
                text="Get started"
                color="white"
                onClick={() => {
                  console.log("Get started button");
                  router.push("/onboarding/");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end justify-center">
            <img
              src="/solution_hero_img.svg"
              // width={1800}
              alt="Hero image"
              className="mx-auto desktop:w-[2200px] mobile:w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-16" id="how_it_works">
        <div className="rounded-box bg-[#F7FCFF]">
          <div className="landing_container desktop:py-32 flex flex-col space-y-16">
            <div className="flex flex-col space-y-8">
              <div className="flex items-center justify-start w-full space-x-4">
                <h1 className="text-gray-900 text-left font-bold text-5xl">
                  Sonergy Ecosystem
                </h1>
                <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
              </div>
              <span className="text-gray-600 text-[16px] font-light w-2/3">
                Research commissioners have access to a large pool of skilled
                and competent sources, covering diverse sectors and countries
                across the globe, allowing them access to any information needed
                to address business questions All system players, such as
                companies, individuals, analysts, students, researchers,
                scientists and instituions can initiate and create research
                queries using the Sonergy token to make payment. All the
                respondents can provide data and respond to research queries and
                validate data to earn Sonergy tokens.
              </span>
            </div>
            <div className="flex space-x-16">
              <img
                src="/ecosystem_hero_img.svg"
                alt="Sonergy ecosystem"
                className="w-[1200]"
              />
              <div className="bg-white p-6 flex flex-col rounded-lg space-y-8">
                <div className="bg-ecoVar1 flex flex-col items-start justify-center p-4 border-b border-[#57CAEB]">
                  <h3 className="text-black text-lg font-medium">
                    Research Commissioners
                  </h3>
                  <span className="text-gray-600 font-normal text-[16px]">
                    Research commissioners are companies or individuals wishing
                    to commission or create surveys to answer any business or
                    research questions.
                  </span>
                </div>
                <div className="bg-ecoVar2 flex flex-col items-start justify-center p-4 border-b border-[#EE1D23]">
                  <h3 className="text-black text-lg font-medium">
                    Respondents
                  </h3>
                  <span className="text-gray-600 font-normal text-[16px]">
                    Respondents are data collectors and will answer survey
                    research questions
                  </span>
                </div>
                <div className="bg-ecoVar3 flex flex-col items-start justify-center p-4 border-b border-[#9747FF]">
                  <h3 className="text-black text-lg font-medium">Validators</h3>
                  <span className="text-gray-600 font-normal text-[16px]">
                    Validators play a vital role in Sonergy ecosystem in helping
                    to evaluate, validate and rate information submitted by
                    survey and responders. In order to ensure quality
                    compliance, validators will be constantly evaluated.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="landing_container desktop:px-2 desktop:py-32 flex flex-col"
        id="roadmap"
      >
        <div className="flex flex-col items-center justify-center space-y-8 mb-8">
          <div className="flex flex-col items-center justify-center w-full space-y-6">
            <h1 className="text-gray-900 text-left font-bold text-5xl">
              Roadmap
            </h1>
            <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
          </div>
          <span className="text-gray-600 text-[16px] text-center font-light w-2/3">
            With help from our team, contributors and investors these are the
            milestones we look to achieving. We target 20% increase in new
            contracts every month, capitalizing on opportunities with existing
            business relationships.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 mt-8 mb-8">
          <Timeline>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content className="bg-gray-200 p-6 rounded-2xl ">
                <Timeline.Title>Q1 - Q2 2021</Timeline.Title>
                {/* <Timeline.Body> */}
                <div>
                  <ul className="list-disc list-item ml-6">
                    <li>Sonergytoken development</li>
                    <li>Project MVP Testnet Launch</li>
                    <li>Smart contract audit, release (A&D) forensics</li>
                    <li>Strategic partnerships announcements</li>
                    <li>Project cross promotional partnerships</li>
                  </ul>
                </div>
                {/* </Timeline.Body> */}
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content className="bg-gray-200 p-6 rounded-2xl ">
                <Timeline.Title>Q3 2021</Timeline.Title>
                {/* <Timeline.Body> */}
                <div>
                  <ul className="list-disc list-item ml-6">
                    <li>
                      $SNEGY token Proof of Credit Mining (POCM) - Liquidity
                      staking program launch
                    </li>
                    <li>Partnership announcement</li>
                    <li>
                      Interoperable Cross-chain features integration aid -
                      $SNEGY token multi-chain swap
                    </li>
                  </ul>
                </div>
                {/* </Timeline.Body> */}
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content className="bg-gray-200 p-6 rounded-2xl ">
                <Timeline.Title>Q4 2021</Timeline.Title>
                {/* <Timeline.Body> */}
                <div>
                  <ul className="list-disc list-item ml-6">
                    <li>Sonergy protocol MVP development improvements</li>
                    <li>Smart contract audit</li>
                    <li>Media promotions</li>
                  </ul>
                </div>
                {/* </Timeline.Body> */}
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content className="bg-gray-200 p-6 rounded-2xl ">
                <Timeline.Title>Q1 - Q2 2022</Timeline.Title>
                {/* <Timeline.Body> */}
                <div>
                  <ul className="list-disc list-item ml-6">
                    <li>Airdrop, Private / Pre-sale</li>
                    <li>
                      Sonergy Mainnet / Clients ecosystem deployment and
                      onboarding
                    </li>
                    <li>DEX listing</li>
                    <li>
                      Sonergy protocol decentralized data NFT Marketplace
                      deployment
                    </li>
                    <li>Media Promotions</li>
                    <li>Sonergy mobile app development</li>
                    <li>Partnership announcement</li>
                  </ul>
                </div>
                {/* </Timeline.Body> */}
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content className="bg-gray-200 p-6 rounded-2xl ">
                <Timeline.Title>Q3 - Q4 2022</Timeline.Title>
                {/* <Timeline.Body> */}
                <div>
                  <ul className="list-disc list-item ml-6">
                    <li>Integration of AI and Machine Learning features</li>
                    <li>CEX listing</li>
                    <li>Improve liquidity staking program</li>
                    <li>Promotion and partnerships</li>
                    <li>Marketing / Promotional partnerships</li>
                    <li>Advisory board expansion</li>
                    <li>Partnership announcement</li>
                    <li>
                      Integration of other core technical features for Sonergy
                    </li>
                  </ul>
                </div>
                {/* </Timeline.Body> */}
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 mb-8 mt-24">
          <div className="flex flex-col items-center justify-center w-full space-y-6">
            <h1 className="text-gray-900 text-left font-bold text-5xl">
              Sonergy Tokenomics
            </h1>
            <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
          </div>
          <span className="text-gray-600 text-[16px] text-center font-light w-2/3">
            The Sonergy platform is also fueled by its native token, Sonergy
            (SNEGY); which is used to reward and incentivize respondents and
            validators for completing research queries and performing other
            tasks launched by research commissioners. Sonergy also offers
            profitable income opportunities for Sonergy token holders who
            participate in the SNEGY Staking liquidity program to earn up to 40%
            annual percentage yield (APY) of Sonergy tokens and other
            prospective project partner tokens.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 mt-8 mb-8 w-full">
          <Table>
            <Table.Head>
              <Table.HeadCell>Total token supply</Table.HeadCell>
              <Table.HeadCell>21,000,000</Table.HeadCell>
              <Table.HeadCell>100%</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-800 mr-2 rounded-md"></div>
                  Sales Allocation
                </Table.Cell>
                <Table.Cell>6,300,000</Table.Cell>
                <Table.Cell>30%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-700 mr-2 rounded-md"></div>
                  Ecosystem development, Operations, Liquidity and Airdrop
                </Table.Cell>
                <Table.Cell>5,250,000</Table.Cell>
                <Table.Cell>25%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-600 mr-2 rounded-md"></div>
                  Token Reserve Locked for 3 years
                </Table.Cell>
                <Table.Cell>2,520,000</Table.Cell>
                <Table.Cell>12%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-500 mr-2 rounded-md"></div>
                  Marketing
                </Table.Cell>
                <Table.Cell>2,100,000</Table.Cell>
                <Table.Cell>10%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-400 mr-2 rounded-md"></div>
                  Staking/Farming (POCM/SCO 5%)
                </Table.Cell>
                <Table.Cell>2,100,000</Table.Cell>
                <Table.Cell>10%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-300 mr-2 rounded-md"></div>
                  Team
                </Table.Cell>
                <Table.Cell>2,100,000</Table.Cell>
                <Table.Cell>10%</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center justify-start">
                  <div className="flex w-6 h-6 bg-blue-200 mr-2 rounded-md"></div>
                  Legal/Compliance/Audit
                </Table.Cell>
                <Table.Cell>630,000</Table.Cell>
                <Table.Cell>3%</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="w-full bg-[#F7FAFC80] p-16">
        <div className="landing_container desktop:px-2 desktop:py-32 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8 mb-20">
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <h1 className="text-gray-900 text-left font-bold text-5xl">
                FAQs
              </h1>
              <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
            </div>
          </div>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>What is Sonergy ?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How can I commission a survey?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How can I earn on sonergy?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How can I provide data?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How can I validate data?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                How can I mint data to NFT on the marketplace?
              </Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>How can I sell my data?</Accordion.Title>
              <Accordion.Content>
                <div className="border-l-4 border-[#01AAF0] pl-4 py-4">
                  <p className="text-left text-lg text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ullamcorper ultrices faucibus libero purus ut. In senectus
                    lectus in nunc mattis risus, pulvinar semper. Nisi quis
                    ultricies felis faucibus etiam.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
      <div className="w-full bg-[#FFF] p-16">
        <div className="landing_container desktop:px-2 desktop:py-32 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center space-y-8 mb-20">
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <h1 className="text-gray-900 text-left font-bold text-5xl">
                Partners
              </h1>
              <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
            </div>
            <div className="w-full flex items-center justify-evenly">
              <img
                src="/partners/partner_1.svg"
                alt="Partner 1"
                className="w-32 h-32"
              />
              <img
                src="/partners/partner_2.svg"
                alt="Partner 2"
                className="w-32 h-32"
              />
              <img
                src="/partners/partner_3.svg"
                alt="Partner 3"
                className="w-32 h-32"
              />
              <img
                src="/partners/partner_4.svg"
                alt="Partner 4"
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#F7FCFF] p-16">
        <div className="landing_container desktop:px-2 desktop:py-32 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center space-y-8 mb-20">
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <h1 className="text-gray-900 text-left font-bold text-5xl">
                Meet our dedicated team
              </h1>
              <div className="w-32 h-2 rounded-sm bg-[#01AAF0]"></div>
            </div>
            <div className="w-full flex items-center justify-evenly">
              <div className="w-64 h-64 relative">
                <img
                  src="/team/ceo.png"
                  alt="Partner 1"
                  className="w-64 h-64 absolute top-0 bottom-0 right-0 left-0"
                />
                <div className="w-64 h-64 rounded-xl absolute z-10 bg-black opacity-30 top-0 bottom-0 right-0 left-0"></div>
                <div className="absolute bottom-2 flex flex-col p-4 z-20 text-white">
                  <span className="font-bold">Jane Doe</span>
                  <span>CEO</span>
                </div>
              </div>
              <div className="w-64 h-64 relative">
                <img
                  src="/team/cto.png"
                  alt="Partner 1"
                  className="w-64 h-64 absolute top-0 bottom-0 right-0 left-0"
                />
                <div className="w-64 h-64 rounded-xl absolute z-10 bg-black opacity-30 top-0 bottom-0 right-0 left-0"></div>
                <div className="absolute bottom-2 flex flex-col p-4 z-20 text-white">
                  <span className="font-bold">John Doe</span>
                  <span>CTO</span>
                </div>
              </div>
              <div className="w-64 h-64 relative">
                <img
                  src="/team/dev.png"
                  alt="Partner 1"
                  className="w-64 h-64 absolute top-0 bottom-0 right-0 left-0"
                />
                <div className="w-64 h-64 rounded-xl absolute z-10 bg-black opacity-30 top-0 bottom-0 right-0 left-0"></div>
                <div className="absolute bottom-2 flex flex-col p-4 z-20 text-white">
                  <span className="font-bold">Jessica Doe</span>
                  <span>Developer</span>
                </div>
              </div>
              <div className="w-64 h-64 relative">
                <img
                  src="/team/cfo.png"
                  alt="Partner 1"
                  className="w-64 h-64 absolute top-0 bottom-0 right-0 left-0"
                />
                <div className="w-64 h-64 rounded-xl absolute z-10 bg-black opacity-30 top-0 bottom-0 right-0 left-0"></div>
                <div className="absolute bottom-2 flex flex-col p-4 z-20 text-white">
                  <span className="font-bold">Jonathan Smith</span>
                  <span>CFO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#051B30] p-16">
        <div className="w-full landing_container desktop:px-2 desktop:py-32 flex flex-col items-center justify-center">
          <div className="flex w-full items-start justify-between">
            <div>
              <Footer.Brand
                href="/"
                src="/footer_socials/footer_logo.svg"
                alt="Sonergy Logo"
              />
              <span>copyright © 2022 - sonergy.io</span>
            </div>
            <div className="w-full flex items-start justify-evenly">
              <div>
                <Footer.Title title="Quick links" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">Marketplace</Footer.Link>
                  <Footer.Link href="#">Whitepaper</Footer.Link>
                  <Footer.Link href="#">Terms of use</Footer.Link>
                  <Footer.Link href="#">Privacy policy</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Contact" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="mailto:support@sonergy.io">
                    support@sonergy.io
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="flex flex-col desktop:max-w-md">
                <Footer.Title title="Newsletter" color="#01AAF0" />
                <span>
                  Stay informed on latest updates about Sonergy, enter your
                  email to receive our newsletter.
                </span>
                <div className="form-control mb-2 mt-3">
                  {/* <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Password
              </span>
            </label> */}
                  <label className="input-group border-[#01AAF0] border rounded-md">
                    {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaLock color="#B8C4CE" />
              </span> */}
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="input input-bordered bg-transparent text-white outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                      onChange={(e) => {
                        console.info("Password", e.target.value);
                      }}
                    />
                    <span className="flex items-center justify-center px-4 bg-[#01AAF0] text-white">
                      Subscribe
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full mobile:flex mobile:items-center mobile:justify-between">
            {/* <Footer.Copyright href="#" by="Sonergy™" year={2022} /> */}
            <span className="flex items-center justify-start">
              Smart contract audited by{" "}
              <img
                src="/footer_socials/a&d_logo.svg"
                alt="A and D forensics"
                className="h-6 w-auto mx-1"
              />{" "}
              <a href="#" className="text-blue-500">
                View audit
              </a>
            </span>
            <div className="mt-4 flex space-x-6 sm:mt-0 mobile:justify-center">
              <img
                src="/footer_socials/medium.svg"
                className="w-6 h-6"
                alt="Social icons"
              />
              <img
                src="/footer_socials/linkdin.svg"
                className="w-6 h-6"
                alt="Social icons"
              />
              <img
                src="/footer_socials/telegram.svg"
                className="w-6 h-6"
                alt="Social icons"
              />
              <img
                src="/footer_socials/twitter.svg"
                className="w-6 h-6"
                alt="Social icons"
              />
              <img
                src="/footer_socials/github.svg"
                className="w-6 h-6"
                alt="Social icons"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
