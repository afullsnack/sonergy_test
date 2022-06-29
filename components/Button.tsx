import { MouseEventHandler, ReactNode } from "react";

type BtnSize = "normal" | "small";
type Icon = ReactNode | undefined | null;
type IconPosition = "right" | "left";
interface CustomButton {
  text: string,
  type: BtnSize,
  icon: Icon,
  iconPosition: IconPosition | undefined,
  block: boolean,
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}


export const ButtonPrimary = ({ text = "Default Text", type = 'normal', icon, iconPosition = "left", block, onClick}: CustomButton) => {
  return (
    <button
      className={`bg-primary ${block? 'w-full' : null} rounded-lg flex items-center justify-center ${type === 'normal'? 'mt-4 mb-4 py-[14px]' : 'mt-2 mb-2 py-2'} px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center ${iconPosition === "left"? null : 'flex-row-reverse'}`}>
        {typeof icon !== 'undefined'? icon : null}
        <span className={`text-white font-medium text-sm ${typeof icon !== 'undefined'? iconPosition === "left"? 'ml-2' : 'ml-2' : null}`}>{text}</span>
      </div>
    </button>
  );
};

export const ButtonGhost = ({ text, type = 'normal', icon, iconPosition, block, onClick}: CustomButton) => {
  return (
    <button
      className={`bg-transparent ${block? 'w-full' : null} rounded-lg flex items-center justify-center ${type === 'normal'? 'mt-2 mb-2 py-[14px]' : 'mt-1 mb-1 py-2'} border-solid border-primary border-[1px] text-primary px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center ${typeof iconPosition !== 'undefined' && iconPosition === "left"? null : 'flex-row-reverse'}`}>
        {typeof icon !== 'undefined'? icon : null}
        {typeof text !== 'undefined'? <span className={`text-primary font-medium text-sm ${typeof icon !== 'undefined'? iconPosition === "left"? 'ml-2' : 'mr-2' : null}`}>{text}</span> : null}
      </div>
    </button>
  );
};

export const ButtonIcon = ({ icon, block, type, onClick }) => {
  return (
    <button
      className={`bg-transparent ${block? 'w-full' : null} rounded-lg flex items-center justify-center ${type === 'normal'? 'mt-2 mb-2 py-[14px]' : 'mt-1 mb-1 py-2'} border-solid border-primary border-[1px] text-primary px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
    >
      {typeof icon !== 'undefined'? icon : null}
    </button>
  )
}
