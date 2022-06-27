import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { FaBell, FaMoon, FaShoppingBag, FaUserAlt, FaWallet } from "react-icons/fa";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config'; // Fix the path
import Button from "./Button";
import Logo from "./Logo";

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value: string): number =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px')
  );

export const getCurrentBreakpoint = (): string | undefined => {
  let currentBreakpoint: string | undefined;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};


export default function withLayout(BaseComp: React.ElementType) {

  
  const Page:React.FunctionComponent = (props) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      console.log(getCurrentBreakpoint(), "Break point value");
      setIsMobile(getCurrentBreakpoint() === 'mobile');

      function handleResize() {
        setIsMobile(getCurrentBreakpoint() === 'mobile');
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); //Call once

    return (
      <div className="container">
        <div className="w-[100%] mobile:bg-white desktop:bg-white flex items-center justify-between desktop:pr-6 desktop:pl-3 pr-4 mb-2">
          <Logo />
          {
            !isMobile && (
              <div className="w-[100%] max-w-xl h-20 flex py-1 items-stretch justify-center rounded-sm bg-transparent">
                <div className="flex-1 flex items-center justify-center px-2">
                  <AiFillAppstore size={20} color="#0059AC" />
                  <span className="text-primary text-md font-medium ml-2">Home</span>
                </div>
                <div className="flex-1 flex items-center justify-center px-2">
                  <FaWallet size={20} />
                  <span className="text-slate-600 text-md font-medium  ml-2">Wallet</span>
                </div>
                <div className="flex-1 flex items-center justify-center px-2">
                  <FaShoppingBag size={20} />
                  <span className="text-slate-600 text-md font-medium  ml-2">Market</span>
                </div>
                <div className="flex-1 flex items-center justify-center px-2">
                  <FaUserAlt size={20} />
                  <span className="text-slate-600 text-md font-medium  ml-2">Account</span>
                </div>
              </div>
            )
          }
          <div className="rounded-md w-auto h-8 flex items-center justify-center">
            <div className="flex items-center justify-center py-2 px-2 rounded-md border-solid border-[#E2EDF6] border-[1px] bg-transparent mr-2">
              <div className="indicator">
                <span className="indicator-item badge badge-error badge-xs"></span> 
                <FaBell color="#8895A7" size={'14px'} />
              </div>
            </div>
            {!isMobile && (
              <div className="flex items-center justify-center py-2 px-2 rounded-md border-solid border-[#E2EDF6] border-[1px] bg-transparent mr-2">
                <FaMoon color="#8895A7" size={'14px'} />
              </div>
            )}
            <Button text="Connect wallet" type="small" onClick={e => console.log(e, "Connect wallet clicked")} />
          </div>
        </div>
        <div className="w-[100%] mobile:p-3 h-auto flex flex-col items-start justify-center my-0 mx-auto scroll-smooth">
          <BaseComp {...props} />
        </div>
        {
          isMobile && (
            <div className="w-[100%] bg-white desktop:hidden flex items-center mobile:justify-between justify-center py-4 px-2 absolute bottom-0 left-0 right-0">
              <div className="w-[100%] h-20 flex py-1 items-stretch justify-center rounded-sm bg-transparent">
                <div className="flex-1 flex flex-col items-center justify-between py-2">
                  <AiFillAppstore size={24} color="#0059AC" />
                  <span className="text-primary text-md font-medium">Home</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-between py-2">
                  <FaWallet size={24} />
                  <span className="text-slate-600 text-md">Wallet</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-between py-2">
                  <FaShoppingBag size={24} />
                  <span className="text-slate-600 text-md">Market</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-between py-2">
                  <FaUserAlt size={24} />
                  <span className="text-slate-600 text-md">Account</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }

  return Page;
}