import { MouseEventHandler } from "react";

type BtnSize = "normal" | "small";
interface CustomButton {
  text: string,
  type: BtnSize
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}


export default ({ text = "Default Text", type = 'normal', onClick}: CustomButton) => {
  return (
    <button
      className={type === 'normal'? "bg-primary rounded-lg flex items-center justify-center mt-4 mb-4 py-[14px] px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all" : "bg-primary rounded-md flex items-center justify-center mt-2 mb-2 py-2 px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all"}
      onClick={onClick}
    >
      <span className="text-white font-medium text-sm">{text}</span>
    </button>
  );
};
