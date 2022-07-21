import { useRouter } from "next/router";

export const MostPopularSlider = ({ children }) => {
  const router = useRouter();

  return (
    <div className="w-full carousel max-w-screen desktop:max-w-screen-desktop space-x-6 px-10 mobile:px-8 bg-transparent">
      {children}
    </div>
  );
};
