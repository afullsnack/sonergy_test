import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import {
  FaBell,
  FaMoon,
  FaShoppingBag,
  FaSun,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
// import resolveConfig from "tailwindcss/resolveConfig";
import { useWalletContext } from "../lib/contexts/walletContext";
// import tailwindConfig from "../tailwind.config"; // Fix the path
import Logo from "./Logo";

// const fullConfig = resolveConfig(tailwindConfig);

// export const getBreakpointValue = (value: string): number =>
//   +fullConfig.theme.screens[value].slice(
//     0,
//     fullConfig.theme.screens[value].indexOf("px")
//   );

// export const getCurrentBreakpoint = (): string | undefined => {
//   let currentBreakpoint: string | undefined;
//   let biggestBreakpointValue = 0;
//   for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
//     const breakpointValue = getBreakpointValue(breakpoint);
//     if (
//       breakpointValue > biggestBreakpointValue &&
//       window.innerWidth >= breakpointValue
//     ) {
//       biggestBreakpointValue = breakpointValue;
//       currentBreakpoint = breakpoint;
//     }
//   }
//   return currentBreakpoint;
// };

export default function withLayout(BaseComp: React.ElementType) {
  const Page: React.FunctionComponent = (props) => {
    const router = useRouter();
    const { pathname } = router;

    // wallet context
    const { address, setAddress, setProvider, setSigner } = useWalletContext();

    // const [isMobile, setIsMobile] = useState(false);
    const [shouldConnect, setShouldConnect] = useState(false);
    const [mode, setMode] = useState<"light" | "dark" | undefined>();

    // Toggle theme function
    const toggleSwitch = () => {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        return;
      }

      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    };

    useEffect(() => {
      const userTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      // Initial theme check
      const themeCheck = () => {
        if (userTheme === "dark" || (!userTheme && systemTheme)) {
          document.documentElement.classList.add("dark");
          return "dark";
        } else {
          return "light";
        }
      };

      setMode(themeCheck());
    }, [mode]);
    // const [address, setAddress] = useState<string | undefined | null>();
    // useEffect(() => {
    //   console.log(getCurrentBreakpoint(), "Break point value");
    //   setIsMobile(getCurrentBreakpoint() === "mobile");

    //   function handleResize() {
    //     setIsMobile(getCurrentBreakpoint() === "mobile");
    //   }
    //   // Add event listener
    //   window.addEventListener("resize", handleResize);
    //   // Call handler right away so state gets updated with initial window size
    //   handleResize();
    //   // Remove event listener on cleanup
    //   return () => window.removeEventListener("resize", handleResize);
    // }, []); //Call once

    const connectWallet = async () => {
      const provider = new ethers.providers.Web3Provider(
        // @ts-ignore
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(signer.provider, "This private key hehe");

      if (address) {
        // If address set address and invalidate balance query
        console.log(address, "Wallet signer address");
        setAddress(address);
        setSigner(signer);
        setProvider(provider);
      }
      return address;
    };

    useEffect(() => {
      if (shouldConnect) {
        connectWallet();
      }
    }, [shouldConnect]);

    return (
      <div className="w-screen min-h-screen dark:bg-slate-800">
        <div className="w-[100%] mobile:bg-white desktop:bg-white dark:bg-slate-900 flex items-center justify-between desktop:pr-6 desktop:pl-3 pr-4 mb-2">
          <Logo />
          {
            <div className="w-[100%] hidden desktop:visible max-w-xl h-20 desktop:flex py-1 items-stretch justify-center rounded-sm bg-transparent">
              <div
                className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer"
                onClick={(e) => router.push("/home/")}
              >
                <AiFillAppstore
                  size={20}
                  color={pathname.includes("home") ? "#0059AC" : "#8895A7"}
                />
                <span
                  className={`text-md font-medium ml-2 ${
                    pathname.includes("home")
                      ? "text-primary"
                      : "text-slate-600 dark:text-gray-300"
                  }`}
                >
                  Home
                </span>
              </div>
              <div
                className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer"
                onClick={(e) => router.push("/wallet/")}
              >
                <FaWallet
                  size={20}
                  color={pathname.includes("wallet") ? "#0059AC" : "#8895A7"}
                />
                <span
                  className={`text-md font-medium  ml-2 ${
                    pathname.includes("wallet")
                      ? "text-primary"
                      : "text-slate-600 dark:text-gray-300"
                  }`}
                >
                  Wallet
                </span>
              </div>
              <div
                className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer"
                onClick={(e) => router.push("/market/")}
              >
                <FaShoppingBag
                  size={20}
                  color={pathname.includes("market") ? "#0059AC" : "#8895A7"}
                />
                <span
                  className={`text-md font-medium  ml-2 ${
                    pathname.includes("market")
                      ? "text-primary"
                      : "text-slate-600 dark:text-gray-300"
                  }`}
                >
                  Market
                </span>
              </div>
              <div
                className="flex-1 flex items-center justify-center px-2 hover:cursor-pointer"
                onClick={(e) => router.push("/account/")}
              >
                <FaUserAlt
                  size={20}
                  color={pathname.includes("account") ? "#0059AC" : "#8895A7"}
                />
                <span
                  className={`text-md font-medium  ml-2 ${
                    pathname.includes("account")
                      ? "text-primary"
                      : "text-slate-600 dark:text-gray-300"
                  }`}
                >
                  Account
                </span>
              </div>
            </div>
          }
          <div className="rounded-md w-auto h-8 flex items-center justify-center">
            <div className="flex items-center justify-center py-2 px-2 rounded-md border-solid border-[#E2EDF6] border-[1px] bg-transparent mr-2">
              <div className="indicator">
                <span className="indicator-item badge badge-error badge-xs"></span>
                <FaBell color="#8895A7" size={"14px"} />
              </div>
            </div>
            {
              <div
                className="desktop:flex items-center justify-center hidden desktop:visible py-2 px-2 rounded-md border-solid border-[#E2EDF6] border-[1px] bg-transparent dark:bg-slate-800 mr-2 hover:cursor-pointer"
                onClick={() => {
                  setMode((_prev) => (_prev === "light" ? "dark" : "light"));
                  toggleSwitch();
                }}
              >
                {mode === "dark" && <FaSun size={"14px"} />}
                {mode === "light" && <FaMoon size={"14px"} />}
              </div>
            }
            {/* {address ? (
              <ButtonGhost
                text={`${address.substring(0, 6)}...${address.substring(
                  address.length - 4,
                  address.length
                )}`}
                type="small"
                onClick={(e) => {
                  console.log(e, "Disconnect wallet clicked");
                }}
                icon={null}
                iconPosition={null}
                block={false}
                disabled={false}
                isLoading={false}
              />
            ) : (
              <ButtonPrimary
                text={"Connect wallet"}
                type="small"
                onClick={(e) => {
                  console.log(e, "Connect wallet clicked");
                  setShouldConnect(!shouldConnect);
                }}
                icon={null}
                iconPosition={null}
                block={false}
                disabled={false}
                isLoading={false}
              />
            )} */}
          </div>
        </div>
        <div className="container">
          <div className="w-full mobile:pb-[112px] p-0 h-auto flex flex-col items-start justify-center my-0 mx-auto scroll-smooth">
            <BaseComp {...props} />
          </div>
          {
            <div className="w-[100%] bg-white dark:bg-slate-900 desktop:hidden flex items-center mobile:justify-between justify-center py-4 px-2 fixed bottom-0 left-0 right-0">
              <div className="w-[100%] h-20 flex py-1 items-stretch justify-center rounded-sm bg-transparent">
                <div
                  className="flex-1 flex flex-col items-center justify-between py-2 hover:cursor-pointer"
                  onClick={(e) => router.push("/home/")}
                >
                  <AiFillAppstore
                    size={24}
                    color={pathname.includes("home") ? "#0059AC" : "#8895A7"}
                  />
                  <span
                    className={`text-md ${
                      pathname.includes("home")
                        ? "text-primary"
                        : "text-slate-600 dark:text-gray-300"
                    }`}
                  >
                    Home
                  </span>
                </div>
                <div
                  className="flex-1 flex flex-col items-center justify-between py-2 hover:cursor-pointer"
                  onClick={(e) => router.push("/wallet/")}
                >
                  <FaWallet
                    size={24}
                    color={pathname.includes("wallet") ? "#0059AC" : "#8895A7"}
                  />
                  <span
                    className={`text-md ${
                      pathname.includes("wallet")
                        ? "text-primary"
                        : "text-slate-600 dark:text-gray-300"
                    }`}
                  >
                    Wallet
                  </span>
                </div>
                <div
                  className="flex-1 flex flex-col items-center justify-between py-2 hover:cursor-pointer"
                  onClick={(e) => router.push("/market/")}
                >
                  <FaShoppingBag
                    size={24}
                    color={pathname.includes("market") ? "#0059AC" : "#8895A7"}
                  />
                  <span
                    className={`"text-md" ${
                      pathname.includes("market")
                        ? "text-primary"
                        : "text-slate-600 dark:text-gray-300"
                    }`}
                  >
                    Market
                  </span>
                </div>
                <div
                  className="flex-1 flex flex-col items-center justify-between py-2 hover:cursor-pointer"
                  onClick={(e) => router.push("/account/")}
                >
                  <FaUserAlt
                    size={24}
                    color={pathname.includes("account") ? "#0059AC" : "#8895A7"}
                  />
                  <span
                    className={`text-md ${
                      pathname.includes("account")
                        ? "text-primary"
                        : "text-slate-600 dark:text-gray-300"
                    }`}
                  >
                    Account
                  </span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };

  return Page;
}
