import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";

function Theme() {
  const router = useRouter();
  const [mode, setMode] = useState<"light" | "dark" | undefined>();

  // Toggle theme function
  const toggleSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setMode("light");
      return;
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setMode("dark");
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

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
        <OnboardCard>
          <MenuItem
            title="Light mode"
            subText="Set theme to light mode"
            extra={null}
            icon={
              <img src="/settings/light_mode_icon.svg" alt="Light mode icon" />
            }
            onClick={(e) => {
              console.log(e, "Set light mode icon clicked");
              toggleSwitch();
            }}
            checked={mode === "light"}
          />
          <div className="divider my-2"></div>
          <MenuItem
            title="Dark mode"
            subText="Set theme to dark mode"
            extra={null}
            icon={
              <img src="/settings/dark_mode_icon.svg" alt="Dark mode icon" />
            }
            onClick={(e) => {
              console.log(e, "verification status clicked");
              toggleSwitch();
            }}
            checked={mode === "dark"}
          />
          <div className="divider my-2"></div>
          <MenuItem
            title="Sunset / Sunrise"
            subText="Auto switch by time of the day"
            extra={null}
            icon={<img src="/settings/theme_icon.svg" alt="Auto switch" />}
            onClick={(e) => console.log(e, "Auto switch clicked")}
          />
        </OnboardCard>
      </div>
    </div>
  );
}

const MenuItem = ({
  onClick,
  title,
  subText,
  icon,
  extra,
  checked = false,
}) => {
  return (
    <div
      className="w-full mx-auto bg-white dark:bg-slate-900 rounded-lg flex items-center space-x-4 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 rounded-xl border-solid bg-gray-100 dark:bg-slate-700 p-3">
        {icon}
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-[16px] font-medium text-gray-700 dark:text-gray-300 mb-2">
            {title}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-[400]">
            {subText}
          </p>
        </div>
        {extra}
        {/* <AiOutlineRight size={16} color="black" /> */}
        <input
          type="radio"
          name="theme"
          className="radio checked:bg-primary"
          checked={checked}
        />
        {/* <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <span className="label-text text-slate-800">Multiple choice</span> 
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default withLayout(Theme);
